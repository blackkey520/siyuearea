import React from "react";
import styles from "./index.less";
import { request, config } from "../../../utils";
import { connect } from "dva";
import {List} from 'antd-mobile';
import {mtype, mstate} from '../../../utils/enum';
import 'antd-mobile/lib/list/style/css';
import {routerRedux} from "dva/router";
import moment from 'moment';
const Item = List.Item;
const Brief = Item.Brief;

@connect(({ member,loading }) => ({
  loginuser: member.loginuser,
 }))
class Mine extends React.Component {
  componentWillMount(){
    //   const url = global.client.getAuthorizeURL('http://'+self.location.host+'/callback','','snsapi_userinfo');
    //  window.open(url, "_self");
    if (this.props.loginuser.member) {
       this.props.dispatch({
                type: "app/changetab",
                payload: { tab: 'mine' }
              });

            }else{
              this.props.dispatch(
         routerRedux.push({
           pathname: `/mobile/init/mine`
         })
       );
            }
  }
  render() {
    let cpd = null;
    if (this.props.loginuser.member)
    {
        const days = moment(this.props.loginuser.member.etime).diff(moment(), 'days', false);
      
        if (this.props.loginuser.member.pcname !== null)
        {
          cpd=<div>{this.props.loginuser.member.pcname}({days>0?<span style={{color:'red'}}>剩余{days}天</span>:<span style={{color:'red'}}>过期</span>})</div>;
        }
        else{
          cpd=<div>无</div>;
        }
    }
    return (
      <div> 
         <List renderHeader={() => <div onClick={()=>{
            const that=this;
            this.props.dispatch(
              routerRedux.push({
                pathname: `/mobile/mine/${that.props.loginuser.member.membercode}`
              })
            );
           }}><img style={{width:'70px',height:'70px'}} src={this.props.loginuser.userInfo?this.props.loginuser.userInfo.headimgurl:''}/>{this.props.loginuser.userInfo?this.props.loginuser.userInfo.nickname:''}</div>} className="my-list">
        <Item  multipleLine >
          注册时间 <Brief>{moment(this.props.loginuser.member?this.props.loginuser.member.mregisttime:'').format('YYYY-MM-DD HH:mm:ss')}</Brief>
        </Item>
         <Item  multipleLine >
          会员状态 <Brief>{mstate[this.props.loginuser.member?this.props.loginuser.member.mstate:0]}</Brief>
        </Item>
        <Item  multipleLine>
          会员类型 <Brief>{mtype[this.props.loginuser.member?this.props.loginuser.member.mtype:0]}</Brief>
        </Item>
        <Item  multipleLine>
          会员卡 <Brief>{cpd}</Brief>
        </Item>
        
        <Item
          arrow="horizontal"
          thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
          multipleLine
          onClick={() => {}}
        >
          我的账户 <Brief>{this.props.loginuser.member?this.props.loginuser.member.mmoney:0}</Brief>
        </Item>
      </List>
      </div>
    );
  }
}

export default Mine;
