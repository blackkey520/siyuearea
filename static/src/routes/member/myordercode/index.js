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
import {ostate,atype} from '../../../utils/enum';
import { GetMoney,GetMoneyDetail } from '../../../utils'
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
          this.props.selectedmobileorder.rstate === 0?
           <div style={{marginTop:10}}>
               <List renderHeader={() => '使用信息'} className="my-list">
                    <Item>预定时间<Brief>{moment(this.props.selectedmobileorder.otime).format('YYYY-MM-DD HH:mm:ss')}</Brief></Item>
                    <Item>使用时间<Brief>{moment(this.props.selectedmobileorder.btime).format('YYYY-MM-DD HH:mm:ss')}</Brief></Item>
                    <Item>使用时间(小时)<Brief>{Math.round(moment().diff(moment(this.props.selectedmobileorder.btime),'hours',true))}</Brief></Item>
                </List> 
            </div>:<div style={{marginTop:10}}>
               <List renderHeader={() => '使用信息'} className="my-list">
                   <Item>消费方式<Brief>{atype[this.props.selectedmobileorder.rstate]}</Brief></Item>
                    <Item>预定时间<Brief>{moment(this.props.selectedmobileorder.otime).format('YYYY-MM-DD HH:mm:ss')}</Brief></Item>
                    <Item>使用时间<Brief>{moment(this.props.selectedmobileorder.btime).format('YYYY-MM-DD HH:mm:ss')}</Brief></Item>
                    <Item>结束时间<Brief>{moment(this.props.selectedmobileorder.etime).format('YYYY-MM-DD HH:mm:ss')}</Brief></Item>
                    <Item>使用时间(小时)<Brief>{Math.round(moment(this.props.selectedmobileorder.etime).diff(moment(this.props.selectedmobileorder.btime),'hours',true))}</Brief></Item>
                    {this.props.selectedmobileorder.rstate===1?<Item>消费金额（元）<Brief>{this.props.selectedmobileorder.money}</Brief></Item>:null}
                    {this.props.selectedmobileorder.rstate===1?<Item wrap>{GetMoneyDetail(moment(this.props.selectedmobileorder.btime), moment(this.props.selectedmobileorder.etime))}</Item>:null}
                </List> 
            </div>
          }
      </div>
    );
  }
}

export default MyOrderCode;
