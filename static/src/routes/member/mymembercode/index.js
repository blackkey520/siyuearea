import React from "react";
import styles from "./index.less";
import { request, config } from "../../../utils";
import { connect } from "dva";
import {List} from 'antd-mobile';
import moment from 'moment';
import QRCode from 'qrcode';

@connect()
class MyMemberCode extends React.Component {
constructor(props, context) {
    super(props, context);
    this.state = {
        url: ''
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

    const url=await QRCode.toDataURL(this.props.match.params.memberid, opts);
    this.setState({
        url
    });
  }
  render() {    
    return (
      <div style={{width:'100%',textAlign:'center',flex:'column'}}> 
          <div style={{fontSize:17,paddingTop:20}}>我的会员码</div>
          <div style={{fontSize:25,paddingTop:10}}>{this.props.match.params.memberid}</div>
          <img src={this.state.url} style={{height:250,width:250,marginTop:30}}/>
      </div>
    );
  }
}

export default MyMemberCode;
