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

document.addEventListener("DOMContentLoaded", function () {
  dumpBookmarks();
});
