const md5 = require("md5");
const Parser = require("rss-parser");
const parser = new Parser();

const parseFeed = async (url) => {
  const feed = await parser.parseURL(url);
  return feed.items;
};

const generateIdForEachItem = (items) =>
  items.map((x) => ({ ...x, hash: md5(x.link) }));

module.exports = { parseFeed, generateIdForEachItem };
