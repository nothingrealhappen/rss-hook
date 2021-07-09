const Koa = require("koa");

const { PORT = 3000 } = process.env;
const { apiKey, feedList, MAX_ITEMS_TO_SEARCH, hook } = require("./config");
const { parseFeed, generateIdForEachItem } = require("./rssParser");
const { getFeedData, setFeedData } = require("./storage");

const app = new Koa();
app.listen(PORT);

app.use(async (ctx) => {
  const apiKeyFromUrl = ctx.request.query.apiKey;

  if (apiKeyFromUrl !== apiKey) {
    ctx.body = "Error";
    return;
  }

  const allFeedsRequest = feedList.map((x) => parseFeed(x));
  const itemsShouldNotify = await Promise.all(allFeedsRequest).then(
    async (responses) => {
      return await Promise.all(
        responses.map(async (rssItems, index) => {
          const currentUrl = feedList[index];
          const rssItemsWithHash = generateIdForEachItem(rssItems);
          const previousFeedData = await getFeedData(currentUrl);

          const rssItemsShouldNotify = rssItemsWithHash
            .filter((_x, index) => index < MAX_ITEMS_TO_SEARCH)
            .filter((x) => !previousFeedData.includes(x.hash));

          return {
            url: currentUrl,
            notifyItems: rssItemsShouldNotify,
            previousFeedData,
          };
        })
      );
    }
  );

  await Promise.all(
    itemsShouldNotify.map(hook).map((hookRes, index) => {
      return hookRes.then(() => {
        const currentItem = itemsShouldNotify[index];
        const finalFeedDataToS3 = []
          .concat(currentItem.notifyItems.map((x) => x.hash))
          .concat(currentItem.previousFeedData);

        return setFeedData(currentItem.url, finalFeedDataToS3);
      });
    })
  );

  ctx.body = JSON.stringify(itemsShouldNotify);
});
