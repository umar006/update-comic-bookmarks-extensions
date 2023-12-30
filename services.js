import { launch } from "puppeteer";

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

export { mangasFromAsura, mangasFromLuminous };
