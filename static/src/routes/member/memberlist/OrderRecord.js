import React, { Component, PropTypes } from "react";
import { connect } from "dva";
import { Table, Button, Modal, Switch,Menu, DatePicker,Icon  } from "antd";
import moment from "moment";
import { routerRedux } from "dva/router";
import {
	ostate,
	placelist
} from '../../../utils/enum';
 const {
 	RangePicker
 } = DatePicker;
import { GetMoney,GetMoneyDetail } from '../../../utils'
@connect(({ order,loading }) => ({orderlist: order.orderlist,
	orderloading: loading.effects['member/getorderlist'],
	pagination: order.pagination,
	btime: order.btime,
		etime: order.etime
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
			...this.props.pagination
		};
		 
        const columns = [{
            title: '预定地点',
            dataIndex: 'storetype',
            render: text => placelist[text],
            },{
            title: '预订工位',
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
                title: '预订时间',
				dataIndex: 'otime',
				render: (text, record, index) => { 
					return (
						moment(text).format('YYYY-MM-DD HH:mm:ss')
					);
				}
            }, {
            title: '开始时间',
			dataIndex: 'btime',
			render: (text, record, index) => {
				if (text != null)
				return (
					moment(text).format('YYYY-MM-DD HH:mm:ss')
				);
			}
            },  {
            title: '结束时间',
			dataIndex: 'etime',
			render: (text, record, index) => {
				if(text!=null)
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
					<RangePicker style={{marginLeft:15}} value={[this.props.btime,this.props.etime]} onChange={(date, dateString)=>{
						 
						this.props.dispatch({
							type: "order/updateState",
							payload: {
								btime: date[0],
								etime:date[1]
							}
						});
						this.loadTableData(1, 10);
							}} />	 
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