import React, { Component, PropTypes } from "react";
import { connect } from "dva";
import { Table, Button, Modal, Switch,Menu, Dropdown,Icon,Input  } from "antd";
import moment from "moment";
import { routerRedux } from "dva/router";
import { ostate } from '../../utils/enum';
const Search = Input.Search;

@connect(({ order,loading }) => ({orderlist: order.orderlist,
	orderloading: loading.effects['member/getorderlist'],
	pagination: order.pagination
 }))
class OrderList extends Component {
	static contextTypes = {
		router: PropTypes.object
	};
	constructor(props, context) {
		super(props, context);
		this.state={
            record:null,
		}
	}
	componentDidMount() {
		this.loadTableData();
	}

	loadTableData(page = 1, pageSize = 10,ordercode='') {
        if(ordercode!=='')
        {
            this.props.dispatch({
                type: "order/getorderlist",
                payload: { page, pageSize,ordercode }
            });
        }
		else{
             this.props.dispatch({
                type: "order/getorderlist",
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
									pathname: `/memberlist/orderrecord/${record.mid}/${record.oid}`
								})
							);
							}}>
								 <Icon type="bars" />查看详情
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
                 <Search
                    placeholder="请输入订单编号"
                    onSearch={(value) => {
                        this.loadTableData(1,10,value);
                    }}
                    style={{ width: 200 }}
                    />
					<Button
						onClick={()=>{
							this.props.dispatch(
								routerRedux.push({
									pathname: `/memberlist/orderrecord/1/add`
								})
							);
						}}
						style={{ marginLeft: 10 }}
					>
						新增线下订单
					</Button> 

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

export default OrderList;