var net = require('net') //引入网络模块

module.exports = app => {
    const sockconfig = [{
        sockname: 'sock1',
        ipaddress: '172.16.9.12'
    }]
    var server = net.createServer();
    var HOST = '192.168.31.73'; //定义服务器地址
    // var HOST = '192.168.1.15'; //定义服务器地址
    var PORT = 3000; //定义端口号
    app.connectObj={};
    //监听连接事件
    server.on('connection', function (socket) {
        var client = socket.remoteAddress + ':' + socket.remotePort;
        const sockc = sockconfig.find((item)=>{
            return item.ipaddress=socket.remoteAddress;
        });
        console.info('Connected to ' + client);
        app.connectObj[sockc.sockname]=socket;
        //监听数据接收事件
        socket.on('data', function (data) {
            console.log(data.toString());
            socket.write('Hello Client!');
        });

        //监听连接断开事件
        socket.on('end', function () {
             app.connectObj[sockc.sockname] = null;
            console.log('Client disconnected.');
        });
    });
    server.listen(PORT, HOST);
    app.tcpsocket=server;
    // app.addSingleton('tcpsocket', createTcpSocket);
    
}

function createTcpSocket(config, app) {
    // websocket
    var server = net.createServer();
    var HOST = '127.0.0.1'; //定义服务器地址
    var PORT = 3000; //定义端口号
    //监听连接事件
    server.on('connection', function (socket) {
        var client = socket.remoteAddress + ':' + socket.remotePort;
        console.info('Connected to ' + client);

        //监听数据接收事件
        socket.on('data', function (data) {
            console.log(data.toString());
            socket.write('Hello Client!');
        });

        //监听连接断开事件
        socket.on('end', function () {
            console.log('Client disconnected.');
        });
    });
    server.listen(PORT, HOST);
    return server;

}