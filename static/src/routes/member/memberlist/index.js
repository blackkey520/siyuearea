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
	message
} from "antd";
import moment from "moment";
import { routerRedux } from "dva/router";
import { mtype,mstate} from '../../../utils/enum';
const Search = Input.Search;

 
@connect(({ member,loading }) => ({memberlist: member.memberlist,
	memberloading:loading.effects['member/getmemberlist'],
	pagination: member.pagination
 }))
class MemberList extends Component {
	static contextTypes = {
		router: PropTypes.object
	};
	constructor(props, context) {
		super(props, context);
		this.state={
			record:null,
			yqdays:1,
			selectvalue:'',
			kftext:0
		}
	}
	componentDidMount() {
		this.loadTableData();
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
		this.loadTableData(pagination.current, pagination.pageSize, this.state.selectvalue);
	}
	render() {
		 
		const pagination = {
			showTotal: total => `共${total}条数据`,
			...this.props.pagination
		};
		 
        const columns = [{
            title: '会员名称',
            dataIndex: 'mname',
            render: text => <a href="javascript:;">{text}</a>,
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
            },{
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
								   const that=this;
									Modal.warn({
										title: '会员延期',
										content: (
											<div>为 <span style={{color:'red'}}>{record.mname}</span> 延期 <InputNumber value={this.state.yqdays} min={1} max={1000} defaultValue={1} onChange={(value)=>{
												this.setState({
													yqdays:value
												});
											}} /> 天 </div>
										),
										okText:'确定',
										onOk() { 
											const hide = message.loading("正在保存...", 0);
											that.props.dispatch({
												type: "member/extendovertime",
												payload: {
													extenddays: that.state.yqdays,
													param:record,
													callback: data => {
														hide();
														if (data && data.success) {
															that.loadTableData(that.props.pagination.current, that.props.pagination.pageSize, that.state.selectvalue);
															message.success("保存成功");
														} else {
															message.error("保存失败");
														}
													}
												}
											});
										},
									});
							   }else if (e.key === "6") {
								   const that=this;
									Modal.warn({
										title: '会员扣费',
										content: (
											<div>为 <span style={{color:'red'}}>{record.mname}</span> 扣费 <InputNumber value={this.state.kftext} min={0} max={1000} defaultValue={0} onChange={(value)=>{
												this.setState({
													kftext: value
												});
											}} /> 元 </div>
										),
										okText:'确定',
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
															that.loadTableData(that.props.pagination.current, that.props.pagination.pageSize, that.state.selectvalue);
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
									record
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
                    onSearch={(value) => {
                        this.loadTableData(1,10,value);
						this.setState({
							selectvalue:value
						});
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
			</div>
		);
	}
}

export default MemberList;