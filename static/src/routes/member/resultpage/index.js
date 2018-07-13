import React from "react";
import styles from "./index.less";
import { request, config } from "../../../utils";
import { Result , Icon } from 'antd-mobile';
import { connect } from "dva";
import 'antd-mobile/lib/result/style/css';
import 'antd-mobile/lib/icon/style/css';
@connect(({ member }) => ({
		resultmsg: member.resultmsg,
 }))
class ResultPage extends React.Component {
   constructor(props, context) {
       super(props, context);
       this.state = {
           phone: 0
       }
   }
  render() {
    return (
      <div style={{backgroundColor:'#fff'}}> 
        <Result
            style={{paddingTop:170}}
            img={<Icon type={this.props.match.params.suc==="true"?"check-circle":"cross-circle-o"}  style={this.props.match.params.suc==="true"?{ fill: '#1F90E6',width:60,height:60 }:{ fill: '#ffc600',width:60,height:60 }} />}
            title={this.props.match.params.tit}
            message={this.props.resultmsg}
        />
      </div>
    );
  }
}
export default ResultPage;
