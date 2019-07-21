import React, { Component, PropTypes } from "react";
import { connect } from "dva";
import {
	Table,
	Button,
	Modal,
	InputNumber,
	Menu,
	Dropdown,
	Icon,
	Input,
	message,
	Form,
	Calendar,
	 Row,
	 Col,
} from "antd";
import moment from "moment";


import { routerRedux } from "dva/router";
import { mtype,mstate} from '../../../utils/enum';
import { createForm } from 'rc-form';
const Search = Input.Search;
const TextArea = Input.TextArea;
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
 
@connect(({ member,loading }) => ({memberlist: member.memberlist,
	memberloading:loading.effects['member/getmemberlist'],
	pagination: member.pagination,
	searchval: member.searchval
 }))
class MemberList extends Component {
	static contextTypes = {
		router: PropTypes.object
	};
	constructor(props, context) {
		super(props, context);
		this.state={
			record:null,
			yqdays:0,
			yqdate:moment(),
			yqdesc:'',
			kftext:0,
			visible:false
		}
	}
	componentDidMount() {
		this.loadTableData(1,10, this.props.searchval);
	}
 
	loadTableData(page = 1, pageSize = 10,membercode='') {
		 if(membercode!=='')
        {
			this.props.dispatch({
				type: "member/getmemberlist",
				payload: { page, pageSize,membercode }
			});
		}else{
			this.props.dispatch({
				type: "member/getmemberlist",
				payload: { page, pageSize }
			});
		}
	}

	tableChange(pagination) {
		this.loadTableData(pagination.current, pagination.pageSize, this.props.searchval);
	}
	  handleCancel = () => {
	  	this.setState({
	  		visible: false
	  	});
	  };

	render() {
		 
		const pagination = {
			showTotal: total => `共${total}条数据`,
			...this.props.pagination
		};
		 const {
		 	getFieldDecorator
		 } = this.props.form;
		 const formItemLayout = {
		 	labelCol: {
		 		span: 5
		 	},
		 	wrapperCol: {
		 		span: 18
		 	}
		 };
		  
        const columns = [{
            title: '会员名称',
            dataIndex: 'mname',
            render: (text, record, index) => {
					return(<a href="javascript:;" onClick={()=>{
						 
				}}>{text}</a>);
				},
            }, {
            title: '联系方式',
            dataIndex: 'phonenum',
            }, {
            	title: '到期时间',
				dataIndex: 'mregisttime',
				render: (text, record, index) => {
					const days = moment(record.mregisttime).diff(moment(), 'days', false);
					return(<div>{moment(text).format('YYYY-MM-DD')}({days>0?<span style={{color:'red'}}>剩余{days}天</span>:<span style={{color:'red'}}>过期</span>})</div>);
				}
            }, {
            	title: '注册时间',
				dataIndex: 'mrtime',
				render: (text, record, index) => {
					return(<div>{moment(text).format('YYYY-MM-DD hh:mm:ss')}</div>);
				}
            }, {
                title: '会员类型',
				dataIndex: 'mtype',
				render: (text, record, index) => {
					const days = moment(record.mregisttime).diff(moment(), 'days', false);
					if(text==0)
					{
						return(<div>{'储值用户'}({<span style={{color:'red'}}>余额{record.mmoney}元</span>})</div>);
					}else{
						return(<div>{mtype[text]}</div>);
					}
				}
            },  {
            title: '备注',
            dataIndex: 'mdesc',
            width:300
            },{
            	title: '操作',
            	render: (text, record, index) => { 
					const menu=(<Menu record={record} onClick={(e)=>{
							   if(e.key==="1")
							   {
								   this.props.dispatch(
										routerRedux.push({
											pathname: `/memberlist/recharge/${this.state.record.mid}`
										})
								   );
							   }else if(e.key==="2"){
								    this.props.dispatch(
								    	routerRedux.push({
								    		pathname: `/memberlist/edit/${this.state.record.mid}`
								    	})
								    );
							   }else if(e.key==="3"){
								    this.props.dispatch(
								    	routerRedux.push({
								    		pathname: `/memberlist/orderrecord/${this.state.record.mid}`
								    	})
								    );
							   } else if (e.key === "4") {
							   	this.props.dispatch(
							   		routerRedux.push({
							   			pathname: `/memberlist/userecord/${this.state.record.mid}`
							   		})
							   	);
							   } else if (e.key === "5") {
								   this.setState({
								   	visible: true
								   });
								   
							   }else if (e.key === "6") {
								   const that=this;
									Modal.confirm({
										title: '会员扣费',
										content: (
											<div>为 <span style={{color:'red'}}>{record.mname}</span> 扣费 <InputNumber value={this.state.kftext} min={0} max={1000} defaultValue={0} onChange={(value)=>{
												this.setState({
													kftext: value
												});
											}} /> 元 </div>
										),
										okText:'确定',
										cancelText: '取消',
										onOk() { 
											const hide = message.loading("正在保存...", 0);
											that.props.dispatch({
												type: "member/chargingmoney",
												payload: {
													kftext: that.state.kftext,
													param:record,
													callback: data => {
														hide();
														if (data && data.success) {
															that.loadTableData(that.props.pagination.current, that.props.pagination.pageSize, that.props.searchval);
															message.success("保存成功");
														} else {
															message.error("保存失败");
														}
													}
												}
											});
										},
									});
							   }
							}}>
							<Menu.Item key ="1">充值/开卡</Menu.Item>
							<Menu.Item key="2">编辑</Menu.Item>
							<Menu.Item key="3">预订记录</Menu.Item>
							<Menu.Item key="4">使用记录</Menu.Item>
							<Menu.Item key="5">延期</Menu.Item>
							<Menu.Item key="6">扣钱</Menu.Item>
						</Menu>);
					return (
						<Dropdown onVisibleChange={()=>{
								this.setState({
									record,
									yqdate:moment(record.mregisttime),
								});
							}} overlay={menu}>
							<Button style={{ marginLeft: 8 }}>
								操作 <Icon type="down" />
							</Button>
						</Dropdown>
					);
				}
            }];
		return (
			<div className="content-inner">
				<div
					style={{
						paddingBottom: 10,
						marginBottom: 20,
						borderBottom: "1px solid #ddd"
					}}
				>
				  <Search
                    placeholder="请输入会员编号/姓名/电话"
					value={this.props.searchval}
					onChange={e=>{
						this.props.dispatch({
							type: "member/updateState",
							payload: {
								searchval: e.target.value
							}
						});
					}}
                    onSearch={(value) => {
                        this.loadTableData(1,10,value);
						 
                    }}
                    style={{ width: 200 }}
                    />
					
					<Button
						onClick={()=>{
							this.props.dispatch(
								routerRedux.push({ pathname: "/memberlist/create" })
							);
						}}
						style={{ marginLeft: 10 }}
					>
						新增会员
					</Button> 
				</div>

				<Table
					columns={columns}
					pagination={pagination}
					dataSource={this.props.memberlist}
					rowKey="mid"
					loading={this.props.memberloading}
					bordered
					onChange={this.tableChange.bind(this)}
				/>
				<Modal
          title="会员延期"
		  visible={this.state.visible}
          onCancel={this.handleCancel}
		  onOk={()=>{ 
			  if (this.state.yqdesc==='')
			  {
				  message.error("必须填写延期说明");
				  return;
			  }
			   if (this.state.yqdays === 0) {
			   	message.error("请选择延期时间");
			   	return;
			   }
			  const hide = message.loading("正在保存...", 0);
			  this.props.dispatch({
			  	type: "member/extendovertime",
			  	payload: {
			  		extenddays: this.state.yqdays,
					yqdesc: this.state.yqdesc,
			  		param: this.state.record,
			  		callback: data => {
			  			hide();
			  			if (data && data.success) {
			  				this.loadTableData(this.props.pagination.current, this.props.pagination.pageSize, this.props.searchval);
			  				message.success("保存成功");
			  			} else {
			  				message.error("保存失败");
			  			}
						this.setState({
							yqdays:0,
							yqdate:moment(),
							yqdesc:'',
							visible:false,
						});
			  		}
			  	}
			  });
		  }} 
        >
		   {
			   this.state.record!=null?<div><div>到期时间<span style={{color:'red'}}>{moment(this.state.record.mregisttime).format('YYYY-MM-DD HH:mm:ss')}</span>,为 <span style={{color:'red'}}>{this.state.record.mname}</span> 延期  {this.state.yqdays} 天 ,延期后时间<span style={{color:'red'}}>{this.state.yqdate.format('YYYY-MM-DD HH:mm:ss')}</span></div> 
											<Calendar value = {
												this.state.yqdate
											}
											fullscreen = {
												false
											}
											onChange = {value => {
												const yqdays = value.diff(this.state.record.mregisttime, 'days');
									 
													this.setState({
														yqdays,
														yqdate:value,
														visible:true
													});
                  								}
													} /><TextArea placeholder="请输入延期说明" value={this.state.yqdesc} onChange={(e)=>{
														this.setState({
															yqdesc:e.target.value
														});
														}} rows={4} /></div>:null
		   }
         
        </Modal>
			</div>
		);
	}
}

export default createForm()(MemberList);