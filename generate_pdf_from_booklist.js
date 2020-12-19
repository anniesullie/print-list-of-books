const fs = require('fs')
const path = require('path')
const puppeteer = require("puppeteer");

let args = process.argv.slice(2);
if (args.length != 2) {
  console.log('Usage: node generate_pdf_from_booklist.js <books.json> <outfile.pdf>');
  process.exit(0);
}

(async () => {
  const browser = await puppeteer.launch({
      headless: true
  });

  const data = JSON.parse(fs.readFileSync(args[0], 'utf8'));

  const page = await browser.newPage();
  await page.goto(
    `file:${path.join(__dirname, 'template.html')}`,
    {waitUntil: 'load'});
  await page.evaluate(data => {
    addBooks(data);
  }, data);
  // This screenshot seems superfluous, but the images in the PDFs don't seem
  // to all show up without it.
  await page.screenshot({
    path: './booklist.png',
    fullPage: true
  });
  await page.pdf({
    path: args[1],
    printBackground: true
  });
  browser.close();
})();