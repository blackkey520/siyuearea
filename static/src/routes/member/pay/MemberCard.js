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
          title: '日卡',
          desc: this.props.checkconfig.dayvalue/24,
          money: this.props.checkconfig.dayvalue
      }, {
          title: '周卡',
          desc: this.props.checkconfig.weekvalue/(24*7),
          money: this.props.checkconfig.weekvalue
      }, {
          title: '月卡',
          desc: this.props.checkconfig.monthvalue/(24*7*4),
          money: this.props.checkconfig.monthvalue
      }, {
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
            onClick={_el => console.log(_el)}
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
