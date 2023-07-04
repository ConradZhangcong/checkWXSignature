var express = require("express"); // 引入express模块
var app = express();

const encryption = require("./encryption");

const token = "conrad";

app.get("/", (req, res, next) => {
  // 获取微信服务器发送的数据
  const {
    signature = "",
    timestamp = "",
    nonce = "",
    echostr = "",
  } = req.query;

  let str = [token, timestamp, nonce].sort().join("");
  let sha1 = encryption.sha1(str);

  if (sha1 === signature) {
    console.log("通信来自微信服务器");
    res.send(echostr);
  } else {
    console.log("通信不是来自微信服务器");
    res.send("验证失败");
  }
});

// 监听端口
app.listen("3000");
