import React from "react";
import styles from "./index.less";
import { connect } from "dva";
import {routerRedux} from "dva/router";
import { Grid,Badge } from 'antd-mobile';
import 'antd-mobile/lib/grid/style/css';
import 'antd-mobile/lib/badge/style/css';

@connect(({ member,loading }) => ({
  loginuser: member.loginuser,
 }))
class Recharge extends React.Component {
  render() { 
    const data = [{
      title: '100',
      desc: '',
      money: 100
    }, {
      title: '200',
      desc: '',
      money: 200
    }, {
      title: '500',
      desc: '',
      money: 500
    }, {
      title: '1000',
      desc: '充值立赠100元',
      money: 1000
    }, {
      title: '2000',
      desc: '充值立减200元',
      money: 2000
    }, {
      title: '5000',
      desc: '充值立减500元',
      money: 5000
    }];
    return (
      <div> 
         <div style={{color:'#888',fontSize:14,paddingTop:15,paddingBottom:9,paddingLeft:15}}>会员充值</div>
         <Grid data={data}
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
                    <Badge text={'促销'} style={{ marginLeft: 5 }} />
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
          />
      </div>
    );
  }
}

export default Recharge;
