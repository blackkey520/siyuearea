import React from "react";
import { connect } from "dva";
import moment from 'moment';
import QRCode from 'qrcode';
import {atype} from '../../../utils/enum';
import { GetMoneyDetail } from '../../../utils';
import style from './index.less'
import {
    Preview,
    PreviewHeader,
    PreviewFooter,
    PreviewBody,
    PreviewItem,
    PreviewButton
} from 'react-weui';

@connect(({ order }) => ({
  selectedmobileorder: order.selectedmobileorder,
  mobilemember: order.mobilemember
 }))
class MyOrderCode extends React.Component {
constructor(props, context) {
    super(props, context);
    this.state = {
        url: '',
        show:0,
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

    const url=await QRCode.toDataURL(this.props.match.params.orderid, opts);
    this.setState({
        url
    });
  }
  renderorderdetail=()=>{
      if (this.props.selectedmobileorder.ostate === 0 || this.props.selectedmobileorder.ostate === 3)
      {
        return(<PreviewItem label="预订时间" value={moment(this.props.selectedmobileorder.otime).format('YYYY-MM-DD HH:mm:ss')} />);
      }
      if (this.props.selectedmobileorder.rstate !== null && this.props.selectedmobileorder.rstate === 1)
      {
          return(<div><PreviewItem label="预订时间" value={moment(this.props.selectedmobileorder.otime).format('YYYY-MM-DD HH:mm:ss')} />
                <PreviewItem label="使用时间" value={moment(this.props.selectedmobileorder.btime).format('YYYY-MM-DD HH:mm:ss')} />
                <PreviewItem label="使用时长(小时)" value={Math.round(moment().diff(moment(this.props.selectedmobileorder.btime),'hours',true))} />
                </div>);
      }
      if (this.props.selectedmobileorder.rstate !== null && this.props.selectedmobileorder.rstate === 2)
      {
          return(<div>
                <PreviewItem label="预订时间" value={moment(this.props.selectedmobileorder.otime).format('YYYY-MM-DD HH:mm:ss')} />
                <PreviewItem label="使用时间" value={moment(this.props.selectedmobileorder.btime).format('YYYY-MM-DD HH:mm:ss')} />
                <PreviewItem label="结束时间" value={moment(this.props.selectedmobileorder.etime).format('YYYY-MM-DD HH:mm:ss')} />
                <PreviewItem label="使用时长(小时)" value={Math.round(moment().diff(moment(this.props.selectedmobileorder.btime),'hours',true))} />
                 <PreviewItem label="消费肆阅币（元" value={this.props.selectedmobileorder.money} /> 
                     <PreviewItem label="消费肆阅币明细" value={GetMoneyDetail(moment(this.props.selectedmobileorder.btime), moment(this.props.selectedmobileorder.etime))} /> }
                </div>);
      }
 
  }
  render() {
    return (
        <Preview>
            <PreviewHeader>
                <PreviewItem label="订单号码" value={this.props.match.params.orderid} />
            </PreviewHeader>
            <PreviewBody style={{textAlign:'center'}}>
               
                    <img src={this.state.url} style={{height:250,width:250}}/>
                    {
                        this.renderorderdetail()
                    }
               
                 
                
            </PreviewBody>
            <PreviewFooter>
                <PreviewButton>二维码</PreviewButton>
            </PreviewFooter>
        </Preview>
 
    );
  }
}

export default MyOrderCode;
