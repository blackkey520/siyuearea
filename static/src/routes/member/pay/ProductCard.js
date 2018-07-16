import React from "react";
import styles from "./index.less";
import { connect } from "dva";
import {routerRedux} from "dva/router";
import { ListView,Icon } from 'antd-mobile';
import 'antd-mobile/lib/grid/style/css';
import moment from 'moment';
const DataSource = ListView.DataSource;
const ds = new DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
@connect(({ member,loading,productcard }) => ({
  loginuser: member.loginuser,
  productcardlist: productcard.productcardlist
 }))
class ProductCard extends React.Component {
  componentDidMount() {
		this.props.dispatch({
				type: "productcard/getproductcardlist",
				payload: { page:1, pageSize:10000,isused:1 }
			}); 
	}
  render() { 
    const row = (rowData, sectionID, rowID) => {
        return (
          <div key={rowID} onClick={()=>{
              const attach = "{type: 3,money: rowData.value,mtype: rowData.pcid,title: rowData.pcname}";
              const url = `http://${self.location.host}/requestpayment/${this.props.loginuser.member.memberopenid}/${rowData.value}/${'优惠卡'}/${attach}`;
              window.open(url, "_self");
            }} style={{ padding: '0 15px' }}>
            <div style={{flexDirection:'row',padding: '15px 0',borderBottom: '2px solid #F6F6F6',backgroundColor:'#fff' }}>
              <div style={{ flexDirection:'column',width:'100%'}}>
                <div style={{float:'left',paddingLeft:15,fontWeight:'bold'}}>{rowData.pcname}</div>
              </div>
              <img src={rowData.img} style={{width:'90%',marginLeft:'5%'}}/>
              <div style={{marginTop:10,paddingLeft:15}}>{rowData.pcdesc}</div>
            </div>
          </div>
        );
      };
    return (
      <div> 
         <div style={{color:'#888',fontSize:14,paddingTop:15,paddingBottom:9,paddingLeft:15}}>优惠卡</div>
         <ListView
          ref={el => this.lv = el}
          dataSource={ds.cloneWithRows(this.props.productcardlist)}
          renderRow={row} 
          style={{
            height: 'calc(100vh - 70px)',
            overflow: 'auto',
          }}
          pageSize={4}
          scrollRenderAheadDistance={500}
          onEndReachedThreshold={10}
        />
      </div>
    );
  }
}

export default ProductCard;
