exports.mysql = {
  // 单数据库信息配置
  client: {
    // host
    host: "172.21.0.2",
    // 端口号
    port: "3306",
    // 用户名
    user: "root",
    // 密码
    password: "P@ssw0rd",
    // 数据库名
    database: "siyuearea"
  },
  // 是否加载到 app 上，默认开启
  app: true,
  // 是否加载到 agent 上，默认关闭
  agent: false
};
