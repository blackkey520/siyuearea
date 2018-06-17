import React from "react";
import { request, config } from "../../utils";
import { connect } from "dva";
import {ActivityIndicator,List, InputItem} from 'antd-mobile';
import 'antd-mobile/lib/activity-indicator/style/css';
import { createForm } from 'rc-form';
import 'antd-mobile/lib/list/style/css';
import 'antd-mobile/lib/input-item/style/css';
@connect(({ member,loading }) => ({
	loading:loading.effects['member/getusrmsg'],
  loginuser: member.loginuser,
  mobilemsg:member.mobilemsg
 }))
class Callback extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state={
         phone: '',
   sccode:''
    }
	}

	componentDidMount() {
        const code=this.props.location.search.match(/\?code=(\S*)\&state=/)[1];
        this.props.dispatch({
                type: "member/getusrmsg",
                payload: { code ,
                routerid:this.props.location.search.match(/\&state=(\S*)/)[1]}
            });
	}
  render() {
    const { getFieldProps } = this.props.form;
    if(this.props.loading){
      return(<div style={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:300}}> 
         <ActivityIndicator
         style={{width:'100%',textAlign:'center'}}
                text="加载中"
              />
      </div>);
    }
    if(this.props.mobilemsg!==''){
      return(<div style={{width:'100%',paddingLeft:'40%',paddingTop:'200px'}}> 
         {this.props.mobilemsg}
      </div>);
    }
    if(!this.props.loginuser.ismember)
    {
      return (
        <div style={{width:'100%'}}> 
          <div style={{width: '100%', backgroundColor:'#fff', textAlign: 'center',paddingTop:100}}>
            你好，<span style={{fontWeight: 'bold'}}>
              {this.props.loginuser.userInfo?this.props.loginuser.userInfo.nickname:''}</span> 
              您还不是我们的会员，输入电话号码，注册一个吧~</div>
        <List>
          <List.Item>
            <InputItem
            {...getFieldProps('phone')}
            type="phone"
            onChange = {(value)=>{
              this.setState({phone:value});
            }}
            value={this.state.phone}
            placeholder="手机号码"
            clear
          />
          <div style={{width:'100%',paddingTop:30,textAlign:'center'}} >
           <a onClick={()=>{
              this.props.dispatch({
                type: "member/register",
                payload: {
                   phone: this.state.phone,
                   userInfo:this.props.loginuser.userInfo,
                   routerid:this.props.location.search.match(/\&state=(\S*)/)[1]
                }
              });
              }}>提交</a>
              </div>
          </List.Item>
        </List>
        </div>
      );
    }
    return (
      <div style={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:300}}> 
         <ActivityIndicator
         style={{width:'100%',textAlign:'center'}}
                text="加载中"
              />
      </div>
    );
  }
}

export default createForm()(Callback);
