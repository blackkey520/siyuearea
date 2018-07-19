import React from "react";
import { connect } from "dva";
import QRCode from 'qrcode';
import {
    Preview,
    PreviewHeader, PreviewFooter, PreviewBody, PreviewItem, PreviewButton
} from 'react-weui';
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
        <Preview>
            <PreviewHeader>
                <PreviewItem label="我的会员号码" value={this.props.match.params.memberid} />
            </PreviewHeader>
            <PreviewBody style={{textAlign:'center'}}>
                <img src={this.state.url} style={{height:250,width:250}}/>
            </PreviewBody>
            <PreviewFooter>
                <PreviewButton >二维码</PreviewButton>
            </PreviewFooter>
        </Preview>
    );
  }
}

export default MyMemberCode;
