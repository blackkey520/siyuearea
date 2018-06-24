import React from "react";
import styles from "./index.less";
import { request, config } from "../../../utils";
import { List, InputItem } from 'antd-mobile';
import { connect } from "dva";
import { createForm } from 'rc-form';
import 'antd-mobile/lib/list/style/css';
import 'antd-mobile/lib/input-item/style/css';
@connect()
class Login extends React.Component {
   constructor(props, context) {
       super(props, context);
       this.state = {
           phone: 0
       }
   }
  render() {
      const { getFieldProps } = this.props.form;
    return (
      <div style={{backgroundColor:'#fff'}}> 
         <div style={{width: '100%', backgroundColor:'#fff', textAlign: 'center',paddingTop:180,fontSize:20}}>请输入手机号码</div>
        <List style={{paddingTop:20}}>
           <InputItem
            {...getFieldProps('phone')}
            onChange = {(value)=>{
              this.setState({phone:value});
            }}
            value={this.state.phone}
            placeholder="手机号码"
            clear
          />
          <List.Item >
              <div style={{width: '100%', backgroundColor:'#fff', textAlign: 'center',paddingTop:30}}> 
           <a onClick={()=>{
              this.props.dispatch({
                type: "member/getusrbyphone",
                payload: {
                   phone: this.state.phone,
                   routerid: this.props.match.params.routeid
                }
              });
              }}>提交</a>
              </div>
              </List.Item>
        </List>
      </div>
    );
  }
}
export default createForm()(Login);
