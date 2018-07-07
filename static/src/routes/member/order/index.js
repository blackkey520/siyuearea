import React from "react";
import styles from "./index.less";
import { request, config } from "../../../utils";
import { connect } from "dva";
import { SegmentedControl,ListView } from 'antd-mobile';
import 'antd-mobile/lib/segmented-control/style/css';
import 'antd-mobile/lib/list-view/style/css';
import {ostate} from '../../../utils/enum';
import moment from 'moment';
import { Icon } from 'antd'
const DataSource = ListView.DataSource;
const ds = new DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
import { routerRedux } from "dva/router";
@connect(({ member,order,loading }) => ({
  loginuser: member.loginuser,
  mobileorderlist: order.mobileorderlist,
  pagination:order.pagination,
  loadingorder:loading.effects['order/getmobileorderlist'],
 }))
class Order extends React.Component {
  
  componentWillMount(){
    //   const url = global.client.getAuthorizeURL('http://'+self.location.host+'/callback','','snsapi_userinfo');
    //  window.open(url, "_self");
    this.props.dispatch({
                type: "app/changetab",
                payload: { tab: 'order' }
              });
      this.props.dispatch({
        type:"order/getmobileorderlist",
        payload:{
          mid:this.props.loginuser.member.mid,
          page:1,
          pageSize:5
        }
      });
  }
  //  componentDidMount() {
  //   // you can scroll to the specified position
  //   // setTimeout(() => this.lv.scrollTo(0, 120), 800);

    
  //   // simulate initial Ajax
  //   setTimeout(() => {
       
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRows(data),
  //       isLoading: false,
  //     });
  //   }, 600);
  // }
   onEndReached = (event) => {
     
  } 
  
  render() {
      const row = (rowData, sectionID, rowID) => {
        return (
          <div key={rowID} onClick={()=>{
                   this.props.dispatch(
                    routerRedux.push({
                      pathname: `/mobile/order/${rowData.ordercode}`
                    })
                  );
                  this.props.dispatch({
                    type:"order/updateState",
                    payload:{
                      selectedmobileorder:rowData,
                    }
                  });
            }} style={{ padding: '0 15px' }}>
            
            <div style={{height:80,flexDirection:'row',padding: '15px 0',borderBottom: '2px solid #F6F6F6' }}>
              <div style={{ flexDirection:'column',width:'100%'}}>
                <div style={{float:'left'}}>预定座位-{rowData.pname}</div>
                <div style={{float:'right',fontSize:'13',color:rowData.ostate===0?'#e97330':rowData.ostate===1?'#f93533':rowData.ostate===2?'#108ee9':'grey'}}>{ostate[rowData.ostate]}</div>
              </div>
              <div style={{marginTop:30}}><Icon type="clock-circle-o" />预定时间{moment(rowData.otime).format('YYYY-MM-DD HH:mm:ss')}</div>
            </div>
          </div>
        );
      };
    return (
      <div> 
        <ListView
          ref={el => this.lv = el}
          dataSource={ds.cloneWithRows(this.props.mobileorderlist)}
          renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
            {!this.props.loadingorder&&this.props.pagination.total>this.props.pagination.current*5 ? <a onClick={()=>{
                  this.props.dispatch({
                    type:"order/getmobileorderlist",
                    payload:{
                      mid:this.props.loginuser.member.mid,
                      page:this.props.pagination.current+1,
                      pageSize:5
                    }
                  });
              }}>加载更多</a> : '没有更多记录了'}
          </div>)}
          renderRow={row} 
          style={{
            height: 'calc(100vh - 70px)',
            overflow: 'auto',
          }}
          pageSize={4}
          scrollRenderAheadDistance={500}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={10}
        />
      </div>
    );
  }
}

export default Order;