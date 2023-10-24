// Traverse the bookmark tree
function dumpBookmarks() {
  chrome.bookmarks.getSubTree("14", function (bookmarkTreeNodes) {
    if (bookmarkTreeNodes[0].title !== "manga") return;

    const mangaChildren = bookmarkTreeNodes[0].children;
    dumpTreeNodes(mangaChildren);
  });
}

function dumpTreeNodes(bookmarkNodes) {
  for (let i = 0; i < bookmarkNodes.length; i++) {
    const isAsura = bookmarkNodes[i].url.includes("asuratoon");
    if (!isAsura) continue;
  }
}

async function fetchComics(title) {
  // check curly single quote and get the index position
  const check = title.indexOf("\u2019");

  // check idx position > title.length / 2, so title don't to short
  // e.g. I'm the best -> I
  if (check !== -1 && check > Math.floor(title.length / 2)) {
    title = title.slice(0, check);
  }

  const url = "http://localhost:3000/asura?s=" + encodeURIComponent(title);

  try {
    const raw = await fetch(url);
    const json = await raw.json();
    return json.data;
  } catch (e) {
    console.error(e);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  dumpBookmarks();
});
