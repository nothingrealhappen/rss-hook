const axios = require("axios");
const formatDate = require("date-fns/format");

const feishuHookUrl = "yourFeishuHookUrl";

const feedList = ["https://acloudguru.com/blog/tag/aws/feed"];
const hook = (item) => {
  return Promise.all(
    item.notifyItems.map((x) =>
      axios.post(feishuHookUrl, generateFeishuContent(x))
    )
  );
};
const MAX_ITEMS_TO_SEARCH = 5;

const s3 = {
  region: "ap-south-1",
  bucket: "rss-hook",
  credentials: {
    // use to retreive s3 object
    // some how AWS LAMBDA execute role not working in sdk
    accessKeyId: "",
    secretAccessKey: "",
  },
};

const generateFeishuContent = (content) => "YOUR HOOK BODY TEMPLATE";

module.exports = {
  feedList,
  hook,
  apiKey: "SIMPLE API KEY FOR THIS APP",
  s3,
  MAX_ITEMS_TO_SEARCH,
};
