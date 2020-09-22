var net = require('net') //引入网络模块

module.exports = app => {
    var server = net.createServer();
    var HOST = '172.21.0.7'; //定义服务器地址(北京Win)
    // var HOST = '172.21.0.13'; //定义服务器地址（北京Linux）
    // var HOST = '127.0.0.1'; //定义服务器地址
    var PORT = 8001; //定义端口号

   


    app.connectObj={};



    //创建一个tcp客户端
    // let doorclient = new net.Socket();
    // doorclient.connect({
    //     host: '148.70.229.108',
    //     port: 60006
    // });

    //设置连接保持
    // doorclient.setKeepAlive(true, 3000);

    // app.connectObj['doorClient'] = doorclient;
    // debugger;
    //监听连接事件
    server.on('connection', function (socket) {
        var client = socket.remoteAddress + ':' + socket.remotePort;
      
         
        console.info('Connected to ' + client);
        
        //监听数据接收事件
        socket.on('data', function (data) {
            let heartj=data.toString();
            if (heartj.indexOf(';') !== -1 && heartj.indexOf('SYKJ_')!==-1)
            {
                const markhj = heartj.split(';')[0];
                app.connectObj[markhj] = socket;
                // if(app.connectObj[markhj])
                // {
                    
                // }
                // else{
                //     app.connectObj[markhj] = socket;
                // }
            }
            
            
        });
        // //监听连接断开事件
        // socket.on('end', function () {
        //      app.connectObj[sockc.sockname] = null;
        //     console.log('Client disconnected.');
        // });
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