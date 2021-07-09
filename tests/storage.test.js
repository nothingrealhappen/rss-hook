const { getFeedData, setFeedData } = require("../storage");

// getFeedData(
//   "https://acloudguru.com/blog/tag/aws/feed"
// ).then((data) => {
//   console.log("----");
//   console.log(data);
// });

setFeedData("https://acloudguru.com/blog/tag/aws/feed", Date.now()).then(
  async (d) => {
    const data = await getFeedData("https://acloudguru.com/blog/tag/aws/feed");
    console.log(data);
  }
);
