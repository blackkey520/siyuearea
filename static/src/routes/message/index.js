import React, { Component, PropTypes,createElement } from "react";
import { connect } from "dva";
import {
    Modal,
    Avatar,
    Tag,
    Button,
    List,
    Input,
    Icon
} from "antd";
import moment from 'moment';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
const { TextArea } = Input;
import {
  routerRedux
} from "dva/router";

@connect(({
            message,
            loading
        }) => ({
    messagelist: message.messagelist,
    messageloading: loading.effects['message/getmessagelist'],
    sendloading: loading.effects['message/addmessage'],
	pagination: message.pagination
 }))
class Message extends Component {
	 constructor(props, context) {
	   super(props, context);
	   this.state = {
	     previewImage: '',
      previewVisible: false,
	   }
	 }
componentDidMount() {
   this.loadTableData(1,10);
}
loadTableData(page = 1, pageSize = 10) {
		 this.props.dispatch({
        type: "message/getmessagelist",
        payload: {
          page,
          pageSize,
          room:parseInt(this.props.match.params.communityid)
        }
      });    
	}
  handleSubmit = () => {
    this.setState({
      value:''
    });
      this.props.dispatch({
          type: "message/addmessage",
          payload: {
              msgcontent:this.state.value,
              msgtype:1
          }
      });
  };

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };
onLoadMore = () => {
     this.loadTableData(this.props.pagination.current+1, 10);
  };
   IconText = ({ icon, text }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
);
renderimglist=(imgs)=>{
  const imgarray=[];
  imgs.map((item)=>{
     imgarray.push(<div style={{width:99,height:99,padding:8,borderWidth:1,borderStyle:'solid',borderColor:'grey',marginLeft:8}}><img onClick={()=>{
       this.setState({
          previewImage: `${item}`,
            previewVisible: true,
       });
     }} src={`${item}`} style={{width:85,height:85}} /> </div>);
  });
  return imgarray;
}
handleCancel=()=>{
  this.setState({
    previewVisible:false
  });
}
  render() {
    const {
      messageloading,
        messagelist,
        sendloading,
    } = this.props;
    
  
    return (
      <div style={{marginLeft:25,marginRight:25}}>
        {messagelist.length > 0 && <List
          itemLayout = "vertical"
          size = "large"
        loadMore={(
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
          }}
        >
          <Button loading={messageloading} onClick={this.onLoadMore}>加载更多</Button>
        </div>
      )}
    dataSource={messagelist}
  
    renderItem={item => (
      <List.Item
        key={item.msgid}
        actions={[
    <span>
      <Icon type="like" /><span style={{marginLeft:10}}>{item.likecount}</span>
    </span>,
    <span >
       <Icon type="message" /><span style={{marginLeft:10}}>{item.comcount}</span>
    </span>
  ]}
        extra={ 
          <div>{item.msgtime}</div>
        }
      >
        <List.Item.Meta
          avatar={<Avatar src={item.wechatmsg} />}
          title={<a onClick={()=>{ 
             this.props.dispatch({
                  type: "message/updateState",
                  payload: {
                      messagedetail: item
                  }
              });
              this.props.dispatch(
                  routerRedux.push({
                      pathname: `/messagedetail/${item.msgid}`
                  })
              );
            }}>{item.mname}</a>}
          description={<div>{item.level}{item.msgtype==1?<Tag style={{marginLeft:10}} color="orange">精华</Tag>:''}</div>}
        />
        <div>{item.msgcontent}</div>
         <div style={{flexDirection:'row',display:'flex'}}>
           {
             this.renderimglist(item.newimg)
           }
         </div>
      </List.Item>
       
    )}
  />}
         <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
        </Modal>
      </div>
    );
  }
}

export default Message;