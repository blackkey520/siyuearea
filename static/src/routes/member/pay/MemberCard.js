import React from "react";
import styles from "./index.less";
import { connect } from "dva";
import {routerRedux} from "dva/router";
import { Grid } from 'antd-mobile';
import 'antd-mobile/lib/grid/style/css';
@connect(({ member,loading }) => ({
  loginuser: member.loginuser,
 }))
class MemberCard extends React.Component {
  render() { 
      const data = [{
          title: '日卡',
          desc: '9.3/时',
          money: 140
      }, {
          title: '周卡',
          desc: '4.6/时',
          money: 488
      }, {
          title: '月卡',
          desc: '3.73/时',
          money: 1688
      }, {
          title: '季卡',
          desc: '2.73/时',
          money: 3688
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
                  <span style={{ color: '#888', fontSize: '13px'}}>{dataItem.desc}</span>
                </div>);
            }}
          />
      </div>
    );
  }
}

export default MemberCard;
