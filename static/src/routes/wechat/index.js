import React from "react";
import { request, config } from "../../utils";
import { connect } from "dva";
import {ActivityIndicator} from 'antd-mobile';
import 'antd-mobile/lib/activity-indicator/style/css';
@connect()
class WeChat extends React.Component {
  constructor(props, context) {
    super(props, context);
	}

	componentDidMount() {
       const url = global.client.getAuthorizeURL('http://'+self.location.host+'/callback',this.props.match.params.routeid,'snsapi_userinfo');
     window.open(url, "_self");
	}
  render() {
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

export default WeChat;
