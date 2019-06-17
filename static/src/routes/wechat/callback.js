import React from "react";
import { request, config } from "../../utils";
import { connect } from "dva";
import {
  Button,
  CellsTitle,
  CellBody,
  CellFooter,
  Form,
  FormCell,
  Input,
  Toast
} from 'react-weui';

 
 
@connect(({ member,loading }) => ({
	loading:loading.effects['member/getusrmsg'],
  loginuser: member.loginuser,
  mobilemsg:member.mobilemsg
 }))
class Callback extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state={
        phone: '',
        sccode:''
    }
	}

	componentDidMount() {
      const code=this.props.location.search.match(/\?code=(\S*)\&state=/)[1];
      this.props.dispatch({
          type: "member/getusrmsg",
          payload: { code ,
          routerid:this.props.location.search.match(/\&state=(\S*)/)[1]}
      });
	}
  render() {
    if(this.props.loading){
      return(<Toast icon="loading" show={true}>努力加载中</Toast>);
    }
    if(this.props.mobilemsg!==''){
      return(<div style={{width:'100%',paddingLeft:'40%',paddingTop:'200px'}}> 
         {this.props.mobilemsg}
      </div>);
    }
    if(!this.props.loginuser.ismember)
    {
      return (
        <div style={{width:'100%'}}> 
          <div style={{marginTop:235}}>
          <CellsTitle>你好，<span style={{fontWeight: 'bold'}}>
              {this.props.loginuser.userInfo?this.props.loginuser.userInfo.nickname:''}</span> 
              为了让我们知道您是谁，输入电话号码来预订吧~</CellsTitle>
            <Form>
                <FormCell vcode>
                    <CellBody>
                        <Input onChange = {(e)=>{
                        this.setState({phone:e.target.value});
                      }} placeholder="请输入您的电话"/>
                    </CellBody>
                    <CellFooter>
                        <Button onClick={()=>{
                          this.props.dispatch({
                            type: "member/register",
                            payload: {
                              phone: this.state.phone,
                              userInfo:this.props.loginuser.userInfo,
                              routerid:this.props.location.search.match(/\&state=(\S*)/)[1]
                            }
                          });}} type="vcode">确定</Button>
                    </CellFooter>
                </FormCell>
            </Form>
            </div>
        </div>
      );
    }
    return (
      <Toast icon="loading" show={true}>努力加载中</Toast>
    );
  }
}

export default Callback;
