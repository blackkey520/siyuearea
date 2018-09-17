import React from "react";
import styles from "./index.less";
import { connect } from "dva";
import {routerRedux} from "dva/router"; 


import {
  Tab,
  TabBody,
  NavBar,
  NavBarItem,
  Article,
  Input,
   Badge, Cells, Cell, CellBody, CellFooter,Button
} from 'react-weui';
@connect(({ member,loading }) => ({
  loginuser: member.loginuser,
 }))
class Recharge extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      tab: 0,
      money:500,
    };
  }
  render() { 
    const data = [{
      title: '200',
      desc: '',
      money: 200
    }, {
      title: '500',
      desc: '',
      money: 500
    }, {
      title: '1000',
      desc: '',
      money: 1000
    }, {
      title: '2000',
      desc: '',
      money: 2000
    }, {
      title: '5000',
      desc: '',
      money: 5000
    }];
    const openid = this.props.loginuser.member ? this.props.loginuser.member.memberopenid:'wu'
    return (
      <Tab>
                <NavBar>
                    <NavBarItem active={this.state.tab == 0} onClick={e=>this.setState({tab:0})}>定额充值</NavBarItem>
                    <NavBarItem active={this.state.tab == 1} onClick={e=>this.setState({tab:1})}>自定义金额</NavBarItem>
                </NavBar>
                <TabBody>
                    <Article style={{display: this.state.tab == 0 ? null : 'none'}}>
        <Cells>
            {
              data.map((item,key)=>{
                return (
                  <Cell key={key} access onClick={()=>{
                    const url = `http://${self.location.host}/requestpayment/${openid}/${item.money}/${'会员充值'}/1/${item.title}/${item.title}`;
                    window.open(url, "_self");
              }}>
                <CellBody>
                  {item.title}
                  {item.desc!==''?<Badge preset="body">促销</Badge>:null}
                </CellBody>
                {item.desc!==''? <CellFooter style={{fontSize: '13px', color: '#888888'}}>{item.desc}</CellFooter>:null}
            </Cell>
                );
              })
            }
        </Cells>
                        {/* <Grid data={data}
            columnNum={3}
            itemStyle={{ height: '80px'}}
            onClick={_el => {
              const url = `http://${self.location.host}/requestpayment/${this.props.loginuser.member.memberopenid}/${_el.money}/${'会员充值'}/1/${_el.title}/${_el.title}`;
              window.open(url, "_self");
            }}
            renderItem={dataItem => {
              if(dataItem.desc!=='')
              {
                return( 
                  <div style={{height:'100%',width:'100%'}}>
                  <div style={{ color: '#888', fontSize: '25px'}}>
                    <span>{dataItem.title}</span>
                    <Badge text={'促销'} style={{marginBottom:15}} />
                  </div>
                  <span style={{ color: '#888', fontSize: '13px'}}>{dataItem.desc}</span></div>);
              }else{
                return(<div style={{height:'100%',width:'100%'}}>
                  <div style={{ color: '#888', fontSize: '25px'}}>
                    <span>{dataItem.title}</span>
                  </div>
                  <span style={{ color: '#888', fontSize: '13px'}}>{dataItem.desc}</span>
                </div>);
              }
            }}
          /> */}
                    </Article>
                    <Article style={{display: this.state.tab == 1 ? null : 'none'}}>
                        <Input value={this.state.money} onChange={(e)=>{
                         const { value } = e.target;
                          this.setState({
                            money:value
                          });
                        }} type="price" style={{fontSize:25}} placeholder="请输入您充值的金额"/>
                        <Button style={{marginTop:35}} onClick={()=>{
                          const url = `http://${self.location.host}/requestpayment/${openid}/${this.state.money}/${'会员充值'}/1/${this.state.money}/${this.state.money}`;
                          window.open(url, "_self");
                          }} type="primary" plain>充值</Button>
                    </Article> 
                </TabBody>
            </Tab>
    );
  }
}

export default Recharge;
