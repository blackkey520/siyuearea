import React from "react";
import { connect } from "dva";
import {routerRedux} from "dva/router";
import {
    Msg,
    Footer,
    FooterLinks,
    FooterLink,
    FooterText,
    Toast
}from 'react-weui';


@connect(({ pay,loading }) => ({
  paysuccess: pay.paysuccess,
  isloading: loading['pay/payhandle']
 }))
class PayResult extends React.Component {
    componentWillMount(){
        this.props.dispatch({
            type: "pay/payhandle",
            payload: {
                money: this.props.match.params.money,
                type: this.props.match.params.type,
                mtype: this.props.match.params.mtype,
                title: this.props.match.params.title,
                issuc: this.props.match.params.issuc,
                openid: this.props.match.params.openid
            }
        });
    }
  render() {
      if (this.props.isloading)
      {
        return (<Toast icon="loading" show={true}>努力加载中</Toast>);
      }else{
        return (
            <Msg
                type={this.props.paysuccess?"success":"warn"}
                title={this.props.paysuccess?"支付成功":"支付失败"}
                description = {
                    this.props.paysuccess ? "您的订单已经支付完成" : "您的订单支付失败"
                }
                buttons={[{
                    type: 'primary',
                    label: '开始预订',
                    onClick:()=>{
                        this.props.dispatch(
                            routerRedux.push({
                                pathname: `/mobile/init/reserve`
                            })
                        );
                    }
                }]}
                footer={()=>{
                    return(<Footer>
                    <FooterLinks>
                        <FooterLink href="#">肆阅空间</FooterLink>
                    </FooterLinks>
                    <FooterText>
                        Copyright © 2018-2026 bjlanyue
                    </FooterText>
                </Footer>);
                }}
            />
        );
      }
  }
}

export default PayResult;
