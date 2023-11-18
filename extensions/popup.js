// Traverse the bookmark tree
function dumpBookmarks() {
  chrome.bookmarks.getSubTree("14", function (bookmarkTreeNodes) {
    if (bookmarkTreeNodes[0].title !== "manga") return;

    const mangaChildren = bookmarkTreeNodes[0].children;
    dumpTreeNodes(mangaChildren);
  });
}

async function dumpTreeNodes(bookmarkNodes) {
  const list = $("<ul>");
  for (let i = 0; i < bookmarkNodes.length; i++) {
    const isAsura = bookmarkNodes[i].url.includes("asuratoon");
    const isLuminous = bookmarkNodes[i].url.includes("luminous");

    if (!isAsura && !isLuminous) continue;

    if (isAsura) await updateAsuraBookmarks(bookmarkNodes[i]);
    if (isLuminous) await updateLuminousBookmarks(bookmarkNodes[i]);

    list.append(dumpNode(bookmarkNodes[i]));
    $("#bookmarks").append(list);
  }

  $("#successupdate").append("<h1>Updated!</h1>").css("text-align", "center");
}

async function updateAsuraBookmarks(bookmarkNode) {
  const url = "http://localhost:3000/asura?s=";

  const mangas = await fetchComics(bookmarkNode.title, url);
  for (let i = 0; i < mangas.length; i++) {
    if (mangas[i].title === bookmarkNode.title) {
      const updatedUrl = mangas[i].url;
      chrome.bookmarks.update(bookmarkNode.id, { url: updatedUrl });
      break;
    }
  }
}

async function updateLuminousBookmarks(bookmarkNode) {
  const url = "http://localhost:3000/luminous?s=";

  const mangas = await fetchComics(bookmarkNode.title, url);
  for (let i = 0; i < mangas.length; i++) {
    if (mangas[i].title === bookmarkNode.title) {
      const updatedUrl = mangas[i].url;
      chrome.bookmarks.update(bookmarkNode.id, { url: updatedUrl });
      break;
    }
  }
}

async function fetchComics(title, scraperUrl) {
  // check curly single quote and get the index position
  const check = title.indexOf("\u2019");

  // check idx position > title.length / 2, so title don't to short
  // e.g. I'm the best -> I
  if (check !== -1 && check > Math.floor(title.length / 2)) {
    title = title.slice(0, check);
  }

  const url = scraperUrl + encodeURIComponent(title);

  try {
    const raw = await fetch(url);
    const json = await raw.json();
    return json.data;
  } catch (e) {
    $("#updateerror")
      .append("<h1>" + e.message + "</h1>")
      .append("<h2>Internal Server Error</h2>")
      .css("text-align", "center");
  }
}

function dumpNode(bookmarkNode) {
  const anchor = $("<a>");
  anchor.attr("href", bookmarkNode.url);
  anchor.text(bookmarkNode.title);

  /*
   * When clicking on a bookmark in the extension, a new tab is fired with
   * the bookmark url.
   */
  anchor.click(function () {
    chrome.tabs.create({ url: bookmarkNode.url });
  });

  const span = $("<span>").append(anchor);

  const li = $("<li>").append(span);

  if (bookmarkNode.children && bookmarkNode.children.length > 0) {
    li.append(dumpTreeNodes(bookmarkNode.children));
  }

  return li;
}

const btnUpdate = document.getElementById("btnupdate");
btnUpdate.addEventListener("click", function () {
  btnUpdate.style.display = "none";
  dumpBookmarks();
});
