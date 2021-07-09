const Koa = require("koa");

const { PORT = 3000 } = process.env;
const { apiKey, feedList } = require("./config");
const { parseFeed } = require("./rssParser");

const app = new Koa();
app.listen(PORT);

app.use(async (ctx) => {
  const apiKeyFromUrl = ctx.request.query.apiKey;
  console.log(apiKeyFromUrl, apiKey);

  if (apiKeyFromUrl !== apiKey) {
    ctx.body = "Error";
    return;
  }

  const allFeedsRequest = feedList.map((x) => parseFeed(x));
  await Promise.all(allFeedsRequest).then((data, index) => {
    const currentUrl = feedList[index];
  });

  ctx.body = "Hello";
});
