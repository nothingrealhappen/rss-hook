const Parser = require("rss-parser");
const parser = new Parser();

const parseFeed = async (url) => {
  const feed = await parser.parseURL(url);
  return feed;
};
