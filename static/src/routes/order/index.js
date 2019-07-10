import React, { Component, PropTypes } from "react";
import { connect } from "dva";
import {
	Table,
	Button,
	Modal,
	Switch,
	Menu,
	Dropdown,
	Icon,
	Input,
	Radio
} from "antd";
import moment from "moment";
import { routerRedux } from "dva/router";
import {
	ostate,
	placelist
} from '../../utils/enum';
const Search = Input.Search;

@connect(({ order,loading }) => ({orderlist: order.orderlist,
	orderloading: loading.effects['member/getorderlist'],
	pagination: order.pagination,
	pname: order.pname,
    storetype: order.storetype,
    ostate: order.ostate,
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
		this.loadTableData(1,10);
	}

	loadTableData(page = 1, pageSize = 10) {
		 this.props.dispatch({
                type: "order/getorderlist",
                payload: { page, pageSize }
            });
         
	}
	changeText=(e)=>{
		this.props.dispatch({
                type: "order/updateState",
                payload: {
                	pname: e.target.value
                }
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
                    placeholder="请输入座位编号"
					value={this.props.pname}
					onChange={this.changeText}
                    onSearch={(value) => {
                        this.loadTableData(1, 10);
                    }}
                    style={{ width: 200 }}
                    />
					{/* <Button
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
					</Button>  */}
					<Radio.Group style={{marginLeft:15}} onChange={(e)=>{
					 
						this.props.dispatch({
							type: "order/updateState",
							payload: {
								storetype: e.target.value
							}
						});
						this.loadTableData(1, 10);
						}} value={this.props.storetype}>
						<Radio.Button value={100}>{'全部'}</Radio.Button>
						{
							placelist.map((item,key)=>{
								if(key!==0)
									return(<Radio.Button key={key}  value={key}>{item}</Radio.Button>);
							})
						}
      </Radio.Group>
	  <Radio.Group style={{marginLeft:15}} onChange={(e)=>{
		  this.props.dispatch({
							type: "order/updateState",
							payload: {
								ostate: e.target.value
							}
						});
		  this.loadTableData(1, 10);
						}} value={this.props.ostate}>
						<Radio.Button value={100}>{'全部'}</Radio.Button>
						{
							ostate.map((item, key) => {
								if(key!==0)
									return(<Radio.Button key={key} value={key}>{item}</Radio.Button>);
							})
						}
      </Radio.Group>
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