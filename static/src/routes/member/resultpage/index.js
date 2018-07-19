import React from "react";
import {
  Msg,
  Footer,
  FooterLinks,
  FooterLink,
  FooterText,
  Toast
} from 'react-weui';
import { connect } from "dva";
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
      <Msg
        type={this.props.match.params.suc==="true"?"success":"warn"}
        title={this.props.match.params.tit}
        description = {this.props.resultmsg}
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
export default ResultPage;
