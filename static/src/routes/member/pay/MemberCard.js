import React from "react";
import styles from "./index.less";
import { connect } from "dva";
import {routerRedux} from "dva/router";
import { Grid } from 'antd-mobile';
import 'antd-mobile/lib/grid/style/css';
@connect(({ member,loading,config }) => ({
  loginuser: member.loginuser,
  checkconfig: config.checkconfig,
 }))
class MemberCard extends React.Component {

	componentDidMount() {
		const { dispatch } = this.props;
		dispatch({ type: "config/loadconfig", payload: { id:1 } });
	}
  render() { 
      const data = [{
          type:1,
          title: '日卡',
          desc: this.props.checkconfig.dayvalue/24,
          money: this.props.checkconfig.dayvalue
      }, {
         type: 2,
          title: '周卡',
          desc: this.props.checkconfig.weekvalue/(24*7),
          money: this.props.checkconfig.weekvalue
      }, {
         type: 3,
          title: '月卡',
          desc: this.props.checkconfig.monthvalue/(24*7*4),
          money: this.props.checkconfig.monthvalue
      }, {
         type: 4,
          title: '季卡',
          desc: this.props.checkconfig.sessionvalue/(24*7*4*3),
          money: this.props.checkconfig.sessionvalue
      }];
    return (
      <div> 
         <div style={{color:'#888',fontSize:14,paddingTop:15,paddingBottom:9,paddingLeft:15}}>会员卡</div>
         <Grid data={data}
            columnNum={3}
            itemStyle={{ height: '80px'}}
            onClick={_el => { 
                  const attach = `{type: 2,money: ${_el.money},mtype: ${_el.type},title:${ _el.titless}}`;
                  const url = `http://${self.location.host}/requestpayment/${this.props.loginuser.member.memberopenid}/${_el.money}/${'会员卡'}/${attach}`;
                  window.open(url, "_self");
            }}
            renderItem={dataItem => {
              return(<div style={{height:'100%',width:'100%'}}>
                  <div style={{ color: '#888', fontSize: '25px'}}>
                    <span>{dataItem.title}</span>
                  </div>
                  <span style={{ color: '#888', fontSize: '13px'}}>{`${dataItem.desc.toFixed(2)}/小时`}</span>
                </div>);
            }}
          />
      </div>
    );
  }
}

export default MemberCard;
