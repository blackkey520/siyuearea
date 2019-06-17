
import React from "react";
import styles from "./index.less";
import { request, config } from "../../../utils";
import moment from 'moment';
import { connect } from "dva";
import { routerRedux } from "dva/router";
import SitMap from '../../../components/SitMap'
import { DatePicker, ActivityIndicator, NoticeBar, Button} from 'antd-mobile';
import {Toast} from 'antd-mobile';
import 'antd-mobile/lib/date-picker/style/css';
import 'antd-mobile/lib/toast/style/css';
import zhCN from 'antd-mobile/lib/date-picker/locale/zh_CN';
import 'antd-mobile/lib/activity-indicator/style/css';
import 'antd-mobile/lib/notice-bar/style/css';
import 'antd-mobile/lib/button/style/css';
@connect(({ place,loading,member }) => ({
		placelist : place.placelist,
    placeloading : loading.effects['place/getplacelist'],
    loginuser: member.loginuser,
 }))
class Reserve extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      date:moment().add(1, 'hours'),
    };
  }
  componentWillMount(){
    //   const url = global.client.getAuthorizeURL('http://'+self.location.host+'/callback','','snsapi_userinfo');
    //  window.open(url, "_self");
    this.props.dispatch({
                type: "app/changetab",
                payload: { tab: 'reserve' }
              });
      this.props.dispatch({ type: "place/getplacelist", payload: {  } });
  }
  render() {
    const now = new Date();
    if(this.props.placeloading)
    {
      return (
        <div style={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:300}}> 
          <ActivityIndicator
          style={{width:'100%',textAlign:'center'}}
                  text="加载中"
                />
        </div>
      );
    }
    return (
      <div> 
         <NoticeBar >
      温馨提示：
      1. 肆阅会员卡仅限会员本人使用；
      2. 充值成功即视为交易成功， 会员卡不予退换；
      3. 最终解释权归肆阅空间所有。
    </NoticeBar>
        <div style={{width:'100%',overflow:'auto'}}>
         	<SitMap ref={(r)=>this.placemap=r} sitemap={this.props.placelist}  /></div>
         <DatePicker
          locale={zhCN}
          mode="datetime"
          format="YYYY-MM-DD HH:mm"
          title=""
          value={this.state.date.toDate()}
          onChange={v => this.setState({ date: moment(v) })}
          extra="点击选择订时间"
        >
          <TimeComponent>请选择预订时间</TimeComponent>
        </DatePicker>

        <div style={{width:'100%',paddingTop:30,textAlign:'center'}} >
          
          <Button onClick={() => {
            let selectitem = this.placemap.getselectItem();
            if (selectitem) {
              const _that = this;
              this.props.dispatch({
                type: "place/orderplace",
                payload: {
                  mid: this.props.loginuser.member.mid,
                  mregisttime: this.props.loginuser.member.mregisttime,
                  place: selectitem,
                  desc: '',
                  orderdate: this.state.date.format('YYYY-MM-DD HH:mm:ss'),
                  callback: data => {
                    if (data && data.success) {
                      Toast.info('预订成功啦', 1);
                      _that.props.dispatch(
                        routerRedux.push({ pathname: `/mobile/order`, })
                      );
                    } else {
                      Toast.info('您还有未完成的订单', 1);
                    }
                  }
                }
              });
            } else {
              Toast.info('选择一个工位吧', 1);
            }
          }} type="primary">预订</Button>
              </div>
      </div>
    );
  }
}
const TimeComponent = ({extra, onClick, children}) => (
  <div
    onClick={onClick}
    style={{ backgroundColor: '#fff', height: '45px', lineHeight: '45px', padding: '0 15px' }}
  >
    {children}
    <span style={{ float: 'right', color: '#888' }}>{extra}</span>
  </div>
);
export default Reserve;
