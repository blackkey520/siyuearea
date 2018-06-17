import React, { Component, PropTypes } from "react";
import { connect } from "dva";
import { Table, Button, Modal, Switch,Menu, Dropdown,Icon  } from "antd";
import moment from "moment";
import { routerRedux } from "dva/router";
import { ostate } from '../../../utils/enum';
 

@connect(({ order,loading }) => ({orderlist: order.orderlist,
	orderloading: loading.effects['member/getorderlist'],
	pagination: order.pagination
 }))
class OrderRecord extends Component {
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

	loadTableData(page = 1, pageSize = 10) {
		this.props.dispatch({
			type: "order/getorderlist",
			payload: { page, pageSize,mid:this.props.match.params.id }
		});
	}

	tableChange(pagination) {
		this.loadTableData(pagination.current, pagination.pageSize);
	}
	render() {
		 
		const pagination = {
			showTotal: total => `共${total}条数据`,
			showSizeChanger: true,
			showQuickJumper: true,
			...this.props.pagination
		};
		 
        const columns = [{
            title: '预定工位',
            dataIndex: 'pname',
            render: text => <a href="javascript:;">{text}</a>,
            }, {
            title: '会员名称',
            dataIndex: 'mname',
            }, {
            title: '订单状态',
			dataIndex: 'ostate',
			render:text=><span>{ostate[text]}</span>,
            }, {
                title: '预定时间',
				dataIndex: 'otime',
				render: (text, record, index) => { 
					return (
						moment(text).format('YYYY-MM-DD HH:mm:ss')
					);
				}
            }, {
            	title: '操作',
            	render: (text, record, index) => { 
					 
					return (
						<Button style={{ marginLeft: 8 }} onClick={()=>{
							 this.props.dispatch(
								routerRedux.push({
									pathname: `/memberlist/orderrecord/${this.props.match.params.id}/${record.oid}`
								})
							);
							}}>
								 <Icon type="right-square" />查看详情
							</Button>
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
					<Button
						onClick={()=>{
							 this.props.dispatch(routerRedux.push({ pathname: "/memberlist" }));
						}}
						style={{ marginRight: 10 }}
					>
						返回
					</Button> 
					{/* <Button
						onClick={()=>{
							this.props.dispatch(
								routerRedux.push({
									pathname: `/memberlist/orderrecord/${this.props.match.params.id}/add`
								})
							);
						}}
						style={{ marginRight: 10 }}
					>
						新增订单
					</Button>  */}
				</div>

				<Table
					columns={columns}
					pagination={pagination}
					dataSource={this.props.orderlist}
					rowKey="oid"
					loading={this.props.orderloading}
					bordered
					onChange={this.tableChange.bind(this)}
				/>
			</div>
		);
	}
}

export default OrderRecord;