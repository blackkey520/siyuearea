import React, { Component, PropTypes,createElement } from "react";
import { connect } from "dva";
import {
    Modal,
    Avatar,
    Tag,
    Comment,
    List,
    Input,
    Icon
} from "antd";
import moment from 'moment';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
const { TextArea } = Input;


@connect(({
            message,
            loading
        }) => ({
    commentlist: message.commentlist,
    commentloading: loading.effects['message/getcommentlist'],
    messagedetail: message.messagedetail,
 }))
class MessageDetail extends Component {
	   constructor(props, context) {
	   super(props, context);
	   this.state = {
	     previewImage: '',
      previewVisible: false,
	   }
	 }

componentDidMount() {
   this.loadTableData();
}
loadTableData() {
		 this.props.dispatch({
        type: "message/getcommentlist",
        payload: {
        }
      });    
	}
 

  
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
 
    const {messagedetail} =this.props; 
    let action=[
    <span>
      <Icon type="like" /><span style={{marginLeft:10}}>{messagedetail.likecount}</span>
    </span>,
    <span >
       <Icon type="message" /><span style={{marginLeft:10}}>{messagedetail.comcount}</span>
    </span>,
    <span ><a onClick={()=>{
        this.props.dispatch({
        type: "message/delmessage",
        payload: {
            msgid:messagedetail.msgid
        }
      });    
      }}>删除</a></span>
  ]; 
  if(messagedetail.msgtype==0){
    action.push(
    <span ><a onClick={()=>{
        this.props.dispatch({
        type: "message/exquisite",
        payload: {
            msgid:messagedetail.msgid
        }
      });    
        }}>加精</a></span>);
  }
     if (messagedetail.msgid)
     {
        return (
      <div style={{marginLeft:25,marginRight:25}}>
          <List
          itemLayout = "vertical"
          size = "large"
         
    dataSource={[messagedetail]}
  
    renderItem={item => (
      <List.Item
        key={item.msgid}
        actions={action}
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
  />
        <List
    className="comment-list"
    header={`${this.props.commentlist.length} 条回复`}
    itemLayout="horizontal"
    dataSource={this.props.commentlist}
    renderItem={item => (
      <li>
        <Comment
          actions={[<span ><a onClick={()=>{
        this.props.dispatch({
        type: "message/delcomment",
        payload: {
            comid: item.comid
        }
      });    
      }}>删除</a></span>]}
          author={item.mname}
          avatar={item.wechatmsg}
          content={item.comcontent}
          datetime={item.comtime}
        />
      </li>
    )}
  />
         <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
        </Modal>
      </div>
    );
     }else{
        return(<div></div>);
     }
    
  }
}

export default MessageDetail;