const Koa = require("koa");
const Router = require("koa-router");

const encryption = require("./encryption");

const app = new Koa();
const router = new Router();

// logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get("X-Response-Time");
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", `${ms}ms`);
});

router.get("/", (ctx, next) => {
  //
  ctx.body = "service version: SERVICE_VERISON=0.0.1";
});

router.get("/wx/check", (ctx) => {
  const {
    signature = "",
    timestamp = "",
    nonce = "",
    echostr = "",
  } = ctx.query;

  const token = "conrad";

  const str = [token, timestamp, nonce].sort().join();
  const result = encryption.sha1(str);
  let res;

  if (result === signature) {
    console.log("通信来自微信服务器");
    res = echostr;
  } else {
    console.log("通信不是来自微信服务器");
    res = { code: -1, msg: "fail" };
  }

  ctx.body = res;
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(30000);
