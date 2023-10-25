# Comic URL Updater - Chrome Extension

## Overview

The Comic URL Updater is a Chrome extension designed to help you keep your comic bookmarks up to date when comic URLs change on the comics website. It automates the process of updating your comic bookmarks, making it a more convenient experience for comic readers.

## Features

- Automatically updates comic URLs for bookmarks from the AsuraScans website.
- Streamlines the process of maintaining your comic reading list.

## Installation

1. Clone this repository.
2. [Intall the extension](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked).
3. Install nodejs@18.

## Usage

1. Create a bookmark folder with the name "manga" in your bookmarks. This is the folder that the extension will read to find your comic bookmarks.
2. Inside the "Manga" folder, create bookmarks with titles that match the names of the comics on the AsuraScans website. The extension will use these titles to identify and update the corresponding URLs.
3. Click on the Comic URL Updater extension icon in your Chrome toolbar.
4. Run scraper server in your terminal.

```
node scraper/index.js
```
6. Click update button.
7. The extension will automatically detect and update any outdated comic URLs in your "manga" bookmark folder.

Please note that the extension only works with bookmarks inside the "manga" folder, and the bookmark titles must match the names of the comics on the website for successful updates.

## Limitations

- This extension is specifically designed for updating comic URLs from the AsuraScans website. It won't work for other comic platforms.
- It relies on the availability and structure of AsuraScans' website, so any changes to their site's structure may affect its functionality.

---

Happy comic reading with the Comic URL Updater Chrome extension!
