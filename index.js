import express from "express";
import { launch } from "puppeteer";
import cors from "cors";
import "dotenv/config";

const app = express();
const port = 3000;

app.use(cors());

app.get("/asura", async (req, res) => {
  const { s } = req.query;
  const mangas = await mangasFromAsura(s);

  res.json({ data: mangas });
});

app.get("/luminous", async (req, res) => {
  const { s } = req.query;
  const mangas = await mangasFromLuminous(s);

  res.json({ data: mangas });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

async function mangasFromAsura(query) {
  const searchUrl = process.env.ASURA_SEARCH_URL;

  const browser = await launch({
    headless: "new",
    defaultViewport: null,
  });

  const page = await browser.newPage();

  await page.goto(`${searchUrl}${query}`, {
    waitUntil: "domcontentloaded",
  });

  const mangas = await page.evaluate(() => {
    const mangaList = document.querySelectorAll(".listupd > .bs");

    return Array.from(mangaList).map((manga) => {
      const title = manga.querySelector("a").title;
      const url = manga.querySelector("a").href;

      return { title, url };
    });
  });

  await browser.close();

  return mangas;
}

async function mangasFromLuminous(query) {
  const searchUrl = process.env.LUMINOUS_SEARCH_URL;

  const browser = await launch({
    headless: "new",
    defaultViewport: null,
  });

  const page = await browser.newPage();

  await page.goto(`${searchUrl}${query}`, {
    waitUntil: "domcontentloaded",
  });

  const mangas = await page.evaluate(() => {
    const mangaList = document.querySelectorAll(".listupd > .bs");

    return Array.from(mangaList).map((manga) => {
      const title = manga.querySelector("a").title;
      const url = manga.querySelector("a").href;

      return { title, url };
    });
  });

  await browser.close();

  return mangas;
}
