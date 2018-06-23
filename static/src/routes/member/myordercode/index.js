import React from "react";
import styles from "./index.less";
import { request, config } from "../../../utils";
import { connect } from "dva";
import {
    List,
    Steps
} from 'antd-mobile';
import moment from 'moment';
import QRCode from 'qrcode';
import {ostate} from '../../../utils/enum';
import 'antd-mobile/lib/steps/style/css';
const Item = List.Item;
const Step = Steps.Step;
const Brief = Item.Brief;
@connect(({ order }) => ({
  selectedmobileorder: order.selectedmobileorder,
  mobilemember: order.mobilemember
 }))
class MyOrderCode extends React.Component {
constructor(props, context) {
    super(props, context);
    this.state = {
        url: '',
        show:0,
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
        <Steps style={{marginTop:10,width:'100%'}} current={this.props.selectedmobileorder.ostate} direction="horizontal" size="small">
            <Step onClick={()=>{this.setState({show:0})}} style={{marginLeft:0}} title="预定"  description='' />
            <Step onClick={()=>{if(this.props.selectedmobileorder.ostate>0){
                this.setState({show:1})
                }}} title="到店"  description=''  />
            <Step onClick={()=>{if(this.props.selectedmobileorder.ostate>0){
                this.setState({show:1})
                }}} title="完成" description=''  />
        </Steps>
          {
               this.state.show===0?<div style={{marginTop:10}}><div style={{fontSize:17,paddingTop:20}}>我的预定码</div>
          <div style={{fontSize:25,paddingTop:10}}>{this.props.match.params.orderid}</div>
          <img src={this.state.url} style={{height:250,width:250,marginTop:30}}/></div>:
           <div style={{marginTop:10}}>
               <List renderHeader={() => '使用信息'} className="my-list">
                   <Item>消费方式<Brief>{this.props.selectedmobileorder===0?'充值消费':'会员卡消费'}</Brief></Item>
                    <Item>预定时间<Brief>{moment(this.props.selectedmobileorder.otime).format('YYYY-MM-DD HH:mm:ss')}</Brief></Item>
                    <Item>使用时间<Brief>{moment(this.props.selectedmobileorder.btime).format('YYYY-MM-DD HH:mm:ss')}</Brief></Item>
                    <Item>结束时间<Brief>{moment(this.props.selectedmobileorder.etime).format('YYYY-MM-DD HH:mm:ss')}</Brief></Item>
                    <Item>使用时间<Brief>{Math.ceil(moment(this.props.selectedmobileorder.etime).diff(moment(this.props.selectedmobileorder.btime),'hours',true))}</Brief></Item>
                    {this.props.selectedmobileorder===0?<Item>消费金额<Brief>{this.props.selectedmobileorder.money}</Brief></Item>:null}
                </List> 
            </div>
          }
      </div>
    );
  }
}

export default MyOrderCode;
const customIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42" className="am-icon am-icon-md">
    <g fillRule="evenodd" stroke="transparent" strokeWidth="4">
      <path d="M21 0C9.402 0 0 9.402 0 21c0 11.6 9.402 21 21 21s21-9.4 21-21C42 9.402 32.598 0 21 0z" />
      <path fill="#FFF" d="M29 18.73c0-.55-.447-1-1-1H23.36l4.428-5.05c.407-.46.407-1.208 0-1.668-.407-.46-1.068-.46-1.476 0l-5.21 5.89-5.21-5.89c-.406-.46-1.067-.46-1.475 0-.406.46-.406 1.207 0 1.667l4.43 5.05H14.23c-.55 0-.998.45-.998 1 0 .554.448.97 1 .97h5.9v3.942h-5.9c-.552 0-1 .448-1 1s.448.985 1 .985h5.9v4.896c0 .552.448 1 1 1 .55 0 .968-.284.968-.836v-5.06H28c.553 0 1-.433 1-.985s-.447-1-1-1h-5.9v-3.94H28c.553 0 1-.418 1-.97z" />
    </g>
  </svg>
);