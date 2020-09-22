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
    database: "siyueareaV2"
  },
  // 是否加载到 app 上，默认开启
  app: true,
  // 是否加载到 agent 上，默认关闭
  agent: false
};
// exports.io = {
//   init: {}, // passed to engine.io
//   namespace: {
//      '/': {
//        connectionMiddleware: ['auth'],
//        packetMiddleware: [], // 针对消息的处理暂时不实现
//      },
//   },
//    // cluster 模式下，通过 redis 实现数据共享
//   //  redis: {
//   //    host: '127.0.0.1',
//   //    port: 6379,
//   //  },
// };