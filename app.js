const Koa = require("koa");

const { PORT = 3000 } = process.env;
const apiKeyConfig = require("./config").apiKey;

const app = new Koa();
app.listen(PORT);

app.use((ctx) => {
  const apiKeyFromUrl = ctx.request.query.apiKey;

  if (apiKeyFromUrl !== apiKeyConfig) {
    ctx.body = "Error";
    return;
  }

  ctx.body = "Hello";
});
