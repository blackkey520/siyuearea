import React from "react";
import styles from "./index.less";
import { request, config } from "../../../utils";
import { connect } from "dva";
import {List} from 'antd-mobile';
import moment from 'moment';
import QRCode from 'qrcode';
import {ostate} from '../../../utils/enum';
@connect(({ order }) => ({
  selectedmobileorder: order.selectedmobileorder,
 }))
class MyOrderCode extends React.Component {
constructor(props, context) {
    super(props, context);
    this.state = {
        url: ''
    }
}
  async componentWillMount(){
      var opts = {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        rendererOpts: {
            quality: 1
        }
        }

    const url=await QRCode.toDataURL(this.props.match.params.orderid, opts);
    this.setState({
        url
    });
  }
  render() {
    return (
      <div style={{height:'100%',width:'100%',textAlign:'center',flex:'column',overflow:'auto'}}> 
          <div style={{fontSize:17,paddingTop:20}}>我的预定码</div>
          <div style={{fontSize:25,paddingTop:10}}>{this.props.match.params.orderid}</div>
          <img src={this.state.url} style={{height:250,width:250,marginTop:30}}/>
          <div style={{marginTop:15}}>订单状态:{ostate[this.props.selectedmobileorder.ostate]}</div>
          {
              this.props.selectedmobileorder.ostate===1?<div><div>预定时间:{moment(this.props.selectedmobileorder.otime).format('YYYY-MM-DD HH:mm:ss')}</div><div>使用时间:{moment(this.props.selectedmobileorder.btime).format('YYYY-MM-DD HH:mm:ss')}</div></div>:
              this.props.selectedmobileorder.ostate===2?<div><div>预定时间:{moment(this.props.selectedmobileorder.otime).format('YYYY-MM-DD HH:mm:ss')}</div><div>使用时间:{moment(this.props.selectedmobileorder.btime).format('YYYY-MM-DD HH:mm:ss')}</div>
              <div>结束时间:{moment(this.props.selectedmobileorder.etime).format('YYYY-MM-DD HH:mm:ss')}</div>
                <div>使用时间:{Math.ceil(moment(this.props.selectedmobileorder.etime).diff(moment(this.props.selectedmobileorder.btime),'hours',true))}(小时)</div>
                <div>消费金额:{this.props.selectedmobileorder.money}(元)</div></div>:null
          }
      </div>
    );
  }
}

export default MyOrderCode;
