const fs = require('fs')
const bent = require('bent')
const getJSON = bent('json')

let args = process.argv.slice(2);
if (args.length != 3) {
  console.log('Usage: node get_nyt_bestsellers.js <listname> <outfile.json> <API Key>');
  process.exit(0);
}

(async () => {
  const url = 'https://api.nytimes.com' + '/svc/books/v3/lists/current/' + args[0] + '.json?api-key=' + args[2];
  let data = await getJSON(url);
  let books = [];
  for (let book of data.results.books) {
    // Pull more detail from Google Books API
    let isbn = book.primary_isbn10;
    if (!isbn || isbn == "None") {
      isbn = book.primary_isbn13;
    }
    if (!isbn || isbn == "None") {
      console.log('Skipping ' + book.title + ' with no ISBN');
      continue;
    }
    const bookUrl = 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn;
    let details = await getJSON(bookUrl);
    if (details.totalItems == 0) {
      console.log('Skipping ' + book.title + ' with no Google Books API results');
      continue;
    }
    books.push({
      'title': details.items[0].volumeInfo.title,
      'subtitle': details.items[0].volumeInfo.subtitle,
      'author': details.items[0].volumeInfo.authors[0],
      'description': details.items[0].volumeInfo.description,
      'thumbnail': details.items[0].volumeInfo.imageLinks.thumbnail,
      'isbn': isbn
    });
  }
  fs.writeFileSync(args[1], JSON.stringify(books));
})();