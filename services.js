import { launch } from "puppeteer";
import levenshtein from "js-levenshtein";

async function mangasFromAsura(query) {
  const searchUrl = process.env.ASURA_SEARCH_URL;

  let mangas;
  let mostSimiliar = -1;
  let choosenManga = "";

  try {
    const browser = await launch({
      headless: "new",
      defaultViewport: null,
    });

    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);

    await page.goto(`${searchUrl}${query}`, {
      waitUntil: "domcontentloaded",
    });

    mangas = await page.evaluate(() => {
      const mangaList = document.querySelectorAll("a[href*=series]");

      return Array.from(mangaList).map((manga) => {
        const mangaUrl = manga.getAttribute("href");
        return { url: mangaUrl };
      });
    });

    // skip pagination url
    for (const manga of mangas) {
      if (manga.url.startsWith("/")) continue;
      const similiarities = levenshtein(query, manga.url);
      if (mostSimiliar === -1) {
        mostSimiliar = similiarities;
        choosenManga = manga.url;
      }
      // lower similiarities is better
      if (similiarities < mostSimiliar) {
        mostSimiliar = similiarities;
        choosenManga = manga.url;
      }
    }

    await browser.close();
  } catch (e) {
    console.error(e);
  }

  const BASE_URL = process.env.ASURA_BASE_URL;

  return {
    url: BASE_URL + choosenManga,
  };
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
