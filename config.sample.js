const feedList = ["https://acloudguru.com/blog/tag/aws/feed"];
const hook = (updatedNews) => {
  // do what you want
  // axios.post(hookURL, updatedNews) etc
};

module.exports = {
  feedList,
  hook,
  apiKey: "change to your api key",
};
