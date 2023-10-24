// Traverse the bookmark tree, and print the folder and nodes.
function dumpBookmarks() {
  chrome.bookmarks.getSubTree("14", function (bookmarkTreeNodes) {
    if (bookmarkTreeNodes[0].title !== "manga") return;

    console.log(bookmarkTreeNodes[0].children);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  dumpBookmarks();
});

// // Search the bookmarks when entering the search keyword.
// $("#search").change(function () {
//   $("#bookmarks").empty();
//   dumpBookmarks($("#search").val());
// });

// function dumpTreeNodes(bookmarkNodes, query) {
//   const list = $("<ul>");
//   for (let i = 0; i < bookmarkNodes.length; i++) {
//     list.append(dumpNode(bookmarkNodes[i], query));
//   }

//   return list;
// }
