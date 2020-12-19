# Generate a printable list of books

This repo contains two Node.js scripts intended to make it easy to print out
a list of books.

`node get_nyt_bestsellers.js  <listname> <outfile.json> <API Key>`

This script grabs information on the given New York Times Bestseller list.
 * `listname` can be one of the available bestseller lists:
   * `combined-print-and-e-book-fiction`
   * `combined-print-and-e-book-nonfiction`
   * `hardcover-fiction`
   * `hardcover-nonfiction`
   * `trade-fiction-paperback`
   * `paperback-nonfiction`
   * `advice-how-to-and-miscellaneous`
   * `childrens-middle-grade-hardcover`
   * `picture-books`
   * `series-books`
   * `young-adult-hardcover`
   * `audio-fiction`
   * `audio-nonfiction`
   * `business-books`
   * `graphic-books-and-manga`
   * `mass-market-monthly`
   * `middle-grade-paperback-monthly`
   * `young-adult-paperback-monthly`
 * `outfile.json` is the name of the JSON file to output book details to. It
   can be read by the `generate_pdf_from_booklist.js` script.
 * `API Key` is the key for the [New York Times Books API](https://developer.nytimes.com/docs/books-product/1/overview).
   See [documentation](https://developer.nytimes.com/get-started) on getting an API key.

The output JSON file contains title, subtitle, description, author, and
thumbnail image link for each book in the bestseller list.

`node generate_pdf_from_booklist.js <books.json> <outfile.pdf>`

This script generates a printable PDF from the book list output by the previous
script.

 * `books.json` is the path to a JSON file listing books. It requires the
   following fields: `title`, `author`, `thumbnail`. `subtitle` and `description`
   are optional. It can be generated from the previous script.
 * `outfile.pdf` path to where the generated PDF file should be saved.

The PDF is generated using the included `template.html` file. It is intended to
be printed duplex. Edit it to change the styling. Edit the `#titlepage` element
to add a front cover, or delete it for no front cover.