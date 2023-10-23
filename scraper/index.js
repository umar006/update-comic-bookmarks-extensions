import express from "express";
import { launch } from "puppeteer";

const app = express();
const port = 3000;

app.get("/asura", async (req, res) => {
  const { s } = req.query;
  const mangas = await getMangas(s);

  res.json({ data: mangas });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

async function getMangas(query) {
  const browser = await launch({
    headless: "new",
    defaultViewport: null,
  });

  const page = await browser.newPage();

  await page.goto(`https://asuratoon.com/?s=${query}`, {
    waitUntil: "domcontentloaded",
  });

  await browser.close();

  return mangas;
}
