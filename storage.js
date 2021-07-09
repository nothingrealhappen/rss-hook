const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");
const md5 = require("md5");

const config = require("./config");

const client = new S3Client({ region: config.s3.region });

const createObject = async (fileHash) => {
  const command = new PutObjectCommand({
    Bucket: config.s3.bucket,
    Key: fileHash,
    Body: JSON.stringify({}),
  });
  return await client.send(command);
};

const getFeedData = async (url) => {
  const fileHash = md5(url);
  const command = new GetObjectCommand({
    Bucket: config.s3.bucket,
    Key: fileHash,
  });
  let result = null;

  try {
    const res = await client.send(command);
    const resAsString = await streamToString(res.Body);
    result = JSON.parse(resAsString);
  } catch (e) {
    if (/NoSuchKey/i.test(e.message)) {
      await createObject(fileHash);
      result = {};
    }
  }

  return result;
};

const setFeedData = async (url, content) => {
  const fileHash = md5(url);
  const command = new PutObjectCommand({
    Bucket: config.s3.bucket,
    Key: fileHash,
    Body: JSON.stringify(content),
  });
  return await client.send(command);
};

const streamToString = (stream) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });

module.exports = {
  getFeedData,
  setFeedData,
};
