import React from "react";
import styles from "./index.less";
import { connect } from "dva";
import {routerRedux} from "dva/router";
import {
  Grid,
  Badge
} from 'antd-mobile';
import 'antd-mobile/lib/grid/style/css';
import 'antd-mobile/lib/badge/style/css';
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
          subtitle:'',
          desc: this.props.checkconfig.dayvalue/24,
          money: this.props.checkconfig.dayvalue
      }, {
         type: 2,
          title: '周卡',
          subtitle: '',
          desc: this.props.checkconfig.weekvalue/(24*7),
          money: this.props.checkconfig.weekvalue
      }, {
         type: 3,
          title: '月卡',
          subtitle: '',
          desc: this.props.checkconfig.monthvalue/(24*7*4),
          money: this.props.checkconfig.monthvalue
      }, {
         type: 4,
          title: '季卡',
          subtitle: '',
          desc: this.props.checkconfig.sessionvalue/(24*7*4*3),
          money: this.props.checkconfig.sessionvalue
      }, {
        type: 5,
        title: '周卡',
        subtitle: '周末',
        desc: this.props.checkconfig.weekzmvalue / (24 * 7),
        money: this.props.checkconfig.weekzmvalue
      }, {
        type: 6,
        title: '月卡',
        subtitle: '周末',
        desc: this.props.checkconfig.monthzmvalue / (24 * 7 * 4),
        money: this.props.checkconfig.monthzmvalue
      }, {
        type: 7,
        title: '季卡',
        subtitle: '周末',
        desc: this.props.checkconfig.sessionzmvalue / (24 * 7 * 4 * 3),
        money: this.props.checkconfig.sessionzmvalue
      }, {
        type: 8,
        title: '周卡',
        subtitle: '作业',
        desc: this.props.checkconfig.weekzyvalue / (24 * 7),
        money: this.props.checkconfig.weekzyvalue
      }, {
        type: 9,
        title: '月卡',
        subtitle: '作业',
        desc: this.props.checkconfig.monthzyvalue / (24 * 7 * 4),
        money: this.props.checkconfig.monthzyvalue
      }, {
        type: 10,
        title: '季卡',
        subtitle: '作业',
        desc: this.props.checkconfig.sessionzyvalue / (24 * 7 * 4 * 3),
        money: this.props.checkconfig.sessionzyvalue
      }];
    return (
      <div> 
         <div style={{color:'#888',fontSize:14,paddingTop:15,paddingBottom:9,paddingLeft:15}}>会员卡</div>
         <Grid data={data}
            columnNum={3}
            itemStyle={{ height: '80px'}}
            onClick={_el => { 
                  const url = `http://${self.location.host}/requestpayment/${this.props.loginuser.member.memberopenid}/${_el.money}/${'会员卡购买'}/2/${_el.type}/${ _el.title}`;
                  window.open(url, "_self");
            }}
            renderItem={dataItem => {
              return(<div style={{height:'100%',width:'100%'}}>
                  <div style={{ color: '#888', fontSize: '25px'}}>
                    <span>{dataItem.title}</span>
                    <Badge text={dataItem.subtitle} hot style={{ position:'absolute',top:-30,left:-20 }} />
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
