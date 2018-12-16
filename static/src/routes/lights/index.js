import React from "react";

import {
    Button
} from 'antd-mobile';
import 'antd-mobile/lib/button/style/css';
// import NetcatClient  from 'netcat/client';

class Lights extends React.Component {
    componentWillMount(){
        this.nc=new NetcatClient();
        this.nc.addr('172.16.9.213').port(1030).connect().
        on('connect',()=>{
            //连接成功
            console.log('====================================')
            console.log(`连接成功`)
            console.log('====================================')
        }).on('close',()=>{
            //连接断开
            console.log('====================================')
            console.log(`连接断开`)
            console.log('====================================')
        }).on('data',(msg)=>{
            console.log('====================================')
            console.log(`收到数据${msg}`)
            console.log('====================================')
        }).on('waitTimeout', () => {
            console.log('====================================')
            console.log(`通讯超时`)
            console.log('====================================')
        }).on('error', () => {
            console.log('====================================')
            console.log(`发生错误`)
            console.log('====================================')
        })
    }
    render() {
          
        return ( <div>
            <Button type="primary" onClick={()=>{
                const buf = new Buffer([0x48, 0x3A, 0x01, 0x70, 0x01, 0x01, 0x00, 0x00, 0x45, 0x44 ]);
                this.nc.send(buf,()=>{

                });
                }}>开灯</Button>
             <Button type="warning">关灯</Button>
             </div>
        );
    }
}

export default Lights;
