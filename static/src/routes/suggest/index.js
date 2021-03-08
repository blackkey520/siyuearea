import React, { Component, PropTypes } from "react";
import { connect } from "dva";
import { Table, Button, Modal, Switch,Menu, Dropdown,message,Input  } from "antd";
import moment from "moment";
import { routerRedux } from "dva/router";
const { TextArea } = Input;

@connect(({
            suggest,
            loading
        }) => ({
                suggestlist: suggest.suggestlist,
	suggestloading: loading.effects['suggest/getsuggestlist'],
	pagination: suggest.pagination
 }))
class SuggestCard extends Component {
	static contextTypes = {
		router: PropTypes.object
	};
	constructor(props, context) {
		super(props, context);
		this.state={
            record:null,
			isshowsuggest:false,
			selectitem:null,
			feedback:''
		}
	}
	componentDidMount() {
		this.loadTableData();
	}

	loadTableData(page = 1, pageSize = 10) {
       this.props.dispatch({
                type: "suggest/getsuggestlist",
                payload: { page, pageSize }
            });
	}

	tableChange(pagination) {
		this.loadTableData(pagination.current, pagination.pageSize);
	}
	handleCancel=()=>{
		this.setState({
			  isshowsuggest:false,
			  selectitem:null
		  })
	}
	render() {
		 
		const pagination = {
			showTotal: total => `共${total}条数据`,
			...this.props.pagination
		};
		 
        const columns = [{
            title: '姓名',
            dataIndex: 'mname',
            render: text => <a href="javascript:;">{text}</a>,
            }, {
            title: '建议时间',
            dataIndex: 'stime',
            render:text=><span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>,
            },{
            title: '建议内容',
			dataIndex: 'sdesc',
			 
            },{
            title: '回复内容',
			dataIndex: 'feedback',
			 
            },{
				title: '操作',
				fixed: 'right',
				width: 150,
            	render: (text, record, index) => {
					return (  <Button type="primary" onClick={()=>{ 
						this.setState({
							isshowsuggest:true,
							selectitem:record
						});
						}}>回复</Button>);
				 }
			} ];
		return (
			<div className="content-inner">
				 

				<Table
					columns={columns}
					pagination={pagination}
					dataSource = {
					    this.props.suggestlist
					}
					rowKey="pcid"
					loading = {
					    this.props.suggestloading
					}
					bordered
					onChange={this.tableChange.bind(this)}
				/>
					<Modal
          title="意见回复"
		  width = "1000"
		  onOk={()=>{ 
			  const hide = message.loading("正在保存...", 0);
			   this.props.dispatch({
			  	type: "suggest/feedbackmsg",
			  	payload: {
			  		sid: this.state.selectitem.sid,
					feedback: this.state.feedback,
			  		callback: data => {
			  			hide();
			  			if (data && data.success) {
			  				this.loadTableData(this.props.pagination.current, this.props.pagination.pageSize);
			  				message.success("保存成功");
			  			} else {
			  				message.error("保存失败");
			  			}
						this.setState({
							selectitem:null,
							feedback:'',
							isshowsuggest:false,
						});
			  		}
			  	}
			  });
		  }}
		  visible={this.state.isshowsuggest}
          onCancel={this.handleCancel}
		  >
		  	 <TextArea value={this.state.feedback} onChange={(e)=>{
														this.setState({
															feedback:e.target.value
														});
														}}  rows={4} />
		  </Modal>
			</div>
		);
	}
}

export default SuggestCard;