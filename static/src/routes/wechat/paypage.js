import React from "react";
import { request, config } from "../../utils";
import { connect } from "dva";
import {ActivityIndicator,List, InputItem} from 'antd-mobile';
import 'antd-mobile/lib/activity-indicator/style/css';
import { createForm } from 'rc-form';
import 'antd-mobile/lib/list/style/css';
import 'antd-mobile/lib/input-item/style/css';
@connect()
class PayPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state={
         phone: '',
   sccode:''
    }
	}
 
  render() {
    return (
        <div style={{width:'100%'}}> 
         <a onClick={()=>{
              this.props.dispatch({
                  type: "config/testpay",
                  payload: {
                      money: 1,
                  }
              });
              }}>提交</a>
        </div>
      );
  }
}

export default createForm()(Callback);
