import React, { Component, PropTypes } from "react";
import { connect } from "dva";
import {
    Comment,
    Avatar,
    Form,
    Button,
    List,
    Input,
    Icon
} from "antd";
import {
    routerRedux
} from "dva/router";
 

@connect(({
            message,
            loading
        }) => ({
    communitylist: message.communitylist,
    communityloading: loading.effects['message/communitylist'], 
	pagination: message.pagination
 }))
class Discus extends Component {
	 
componentDidMount() {
   this.loadTableData(1,100);
}
loadTableData(page = 1, pageSize = 10) {
		 this.props.dispatch({
                type: "message/getcommunitylist",
                payload: { page, pageSize }
            });    
    }
    
  render() {
 const IconText = ({ icon, text }) => (
  <span>
      <div>{icon}</div>
    {text}
  </span>
);


      return (
     <div className="content-inner">
				<div
					style={{
						paddingBottom: 10,
						marginBottom: 20,
						borderBottom: "1px solid #ddd"
					}}
				>
				  
					
					<Button
						onClick={()=>{
							this.props.dispatch(
									routerRedux.push({ pathname: "/discus/create" })
							);
							this.props.dispatch({
								type: "discus/updateState",
								payload: {
									checkcommunity: {}
								}
							});
						}}
						style={{ marginLeft: 10 }}
					>
						新增讨论区
					</Button> 
				</div>
              
 <List
    itemLayout="vertical"
    size="large" 
    dataSource={this.props.communitylist}
    renderItem={item => (
      <List.Item
        key={item.communityname}
        actions={[ 
            <div style={{display:'flex',flexDirection:'row',alignItems:'center' }} ><div>{item.memcount}人加入</div>
            <Button style={{marginLeft:15}} type="primary" onClick={()=>{
                this.props.dispatch(
                  routerRedux.push({
                    pathname: `/message/${item.communityid}`
                  })
                );
              }}>进入</Button></div>
        ]}
        extra={
          <img
            width={170}
            alt="logo"
            src={`/public/upload/${item.communityimg}`}
          />
        }
      >
        <List.Item.Meta
          title={<a href={item.href} onClick={()=>{
              this.props.dispatch({
                  type: "message/updateState",
                  payload: {
                      checkcommunity: item
                  }
              });
              this.props.dispatch(
                  routerRedux.push({
                      pathname: `/discus/edit/${item.communityid}`
                  })
              );
               
          }}>{item.communityname}</a>}
          description={item.communitydesc}
          
        />
        {/* {item.communitydesc} */}
      </List.Item>
    )}
  /></div>
      )
  }
}

export default Discus;