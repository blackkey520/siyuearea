import React from "react";
import styles from "./index.less";
import { request, config } from "../../../utils";
import { List, InputItem } from 'antd-mobile';
import { connect } from "dva";
import { createForm } from 'rc-form';
import 'antd-mobile/lib/list/style/css';
import 'antd-mobile/lib/input-item/style/css';
@connect()
class Register extends React.Component {
 state = {
   phone: '',
   sccode:''
 } 
  render() {
    const { getFieldProps } = this.props.form;
     
    return (
      <div> 
        <div style={{width: '100%', backgroundColor:'#fff', textAlign: 'center'}}>用户注册</div>
        <List>
          <List.Item>
            <InputItem
            {...getFieldProps('phone')}
            type="phone"
            onChange = {(value)=>{
              this.setState({phone:value});
            }}
            value={this.state.phone}
            extra = {<a>发送</a>}
            placeholder="手机号码"
            clear
          />
            <InputItem
            {...getFieldProps('sccode')}
            type = "number"
             onChange = {(value)=>{
              this.setState({sccode:value});
            }}
            value={this.state.sccode}
            placeholder="请输入验证码"
            extra = {<a onClick={()=>{
              this.props.dispatch({
                type: "member/register",
                payload: {
                   phone: this.state.phone,
                }
              });
              }}>提交</a>}
            clear
          />
          </List.Item>
        </List>
      </div>
    );
  }
}

export default createForm()(Register);
