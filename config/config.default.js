exports.keys = "znkey";
exports.view = {
  defaultViewEngine: "nunjucks",
  mapping: {
    ".tpl": "nunjucks"
  }
};
 exports.bodyParser = {
   jsonLimit: '5mb',
   formLimit: '6mb',
 };
exports.security = {
  ignore: "/api/",
  domainWhiteList: [
    "http://127.0.0.1:8080",
    "http://10.180.144.212:8080",
    "http://localhost:8080",
    "http://3add50a0.ngrok.io",
    "http://www.bjlanyue.cn",
    "http://140.143.159.216",
  ],
  methodnoallow: { enable: false },
  csrf: {
    enable: false,
    ignoreJSON: true // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
  }
};
exports.notfound={
  pageUrl: '/',
}
exports.cors = {
  allowMethods: "GET,HEAD,PUT,OPTIONS,POST,DELETE,PATCH"
};
exports.multipart = {
  fileExtensions: [".xls", ".doc", ".ppt", ".docx", ".xlsx", ".pptx"]
};
exports.view = {
  defaultViewEngine: 'nunjucks',
  mapping: {
    '.tpl': 'nunjucks',
  },
};
exports.oAuth2Server = {
  grants: ["password"],
  expires: 60
};