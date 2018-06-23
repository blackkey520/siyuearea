import React, { Component, PropTypes } from "react";
import { connect } from "dva";
import { Table, Button, Modal, Switch,Menu, Dropdown,Icon,Input  } from "antd";
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
			record:null
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
		this.loadTableData(pagination.current, pagination.pageSize);
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
            	title: '生效时间',
				dataIndex: 'mregisttime',
				render:text=><span>{moment(text).format('YYYY-MM-DD')}</span>,
            }, {
            title: '会员状态',
			dataIndex: 'mstate',
			render:text=><span>{mstate[text]}</span>,
            }, {
                title: '会员类型',
				dataIndex: 'mtype',
				render:text=><span>{mtype[text]}</span>,
            }, {
                title: '卡内余额',
                dataIndex: 'mmoney',
            }, {
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
							   }
							}}>
							<Menu.Item key ="1">充值/开卡</Menu.Item>
							<Menu.Item key="2">编辑</Menu.Item>
							<Menu.Item key="3">预定记录</Menu.Item>
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
                    placeholder="请输入会员编号"
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
			</div>
		);
	}
}

export default MemberList;