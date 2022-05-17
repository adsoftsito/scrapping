const express = require('express')
const puppeteer = require("puppeteer");

const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hola mundo!'))

app.get("/scrapping", function (req, res) {
  //   res.send('Estamos listos para empezar');

  let scrape = async () => {
		const browser = await puppeteer.launch({ headless: false });
		const page = await browser.newPage();
		await page.setViewport({ width: 1920, height: 1080 });
		await page.goto("https://raid-codex.com/champions/#!?filter=e30%3D", [
      1000,
      { waitUntil: "domcontentloaded" }
    ]);


    let elementToClick = "body > main > champion-list > div > div:nth-child(3) > a > picture > img";


    await page.waitForSelector(elementToClick);
  
    await Promise.all([
      page.click(elementToClick),
      page.waitForNavigation({ waitUntil: 'networkidle2' }),
    ])

  }

  scrape()

})


app.listen(port, () => console.log(`App de ejemplo escuchando el puerto ${port}!`))
