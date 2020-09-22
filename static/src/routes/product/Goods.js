import React, { Component, PropTypes } from "react";
import { connect } from "dva";
import { Table, Button, Modal, Switch,Menu, Radio,Icon,Input  } from "antd";
import moment from "moment";
import { routerRedux } from "dva/router";
import { ostate } from '../../utils/enum';
const Search = Input.Search;

@connect(({ goods,loading }) => ({goodslist: goods.goodslist,
	loading: loading.effects['goods/getgoodslist'],
    pagination: goods.pagination,
    isfinish: goods.isfinish
 }))
class Goods extends Component {
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

	loadTableData(page = 1, pageSize = 10) {
       this.props.dispatch({
                type: "goods/getgoodslist",
                payload: { page, pageSize }
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
		 
        const columns = [ {
            title: '下单人',
            dataIndex: 'manme',
            render: text => <a href="javascript:;">{text}</a>,
            }, {
            title: '商品名称',
            dataIndex: 'proname',
            render:text=><span>{text}</span>,
            },{
            title: '下单时间',
            dataIndex: 'gtime',
            render:text=><span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>,
            } , {
            title: '原价',
            dataIndex: 'money',
            render:text=><span>￥{text}</span>,
            },{
            title: '折后价',
            dataIndex: 'dismoney',
            render:text=><span>￥{text}</span>,
            },{
            title: '已经完成',
            dataIndex: 'isfinish',
            render:text=><span>{text==0?'未完成':'已完成'}</span>,
            } ,{
            	title: '操作',
            	render: (text, record, index) => { 
					 
					return (
						<div>
							<Button style={{ marginLeft: 8 }} onClick={()=>{
                                this.props.dispatch({
                                    type: "goods/updatelist",
                                    payload: {
                                        gid: record.gid,
                                        isfinish:1
                                    }
                                }); 
							}}>
								 <Icon type="bars" />完成订单
							</Button>
						</div>
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
					  <Radio.Group style={{marginLeft:15}} onChange={(e)=>{
					 
						this.props.dispatch({
							type: "goods/updateState",
							payload: {
								isfinish: e.target.value
							}
						});
						this.loadTableData(1, 10);
						}} value={this.props.isfinish}>
						<Radio.Button value={100}>{'全部'}</Radio.Button>
						<Radio.Button value={0}>{'未完成'}</Radio.Button>
						<Radio.Button value={1}>{'已完成'}</Radio.Button>
						 
      </Radio.Group>
				</div>

				<Table
					columns={columns}
					dataSource={this.props.goodslist}
					rowKey="gid"
					loading={this.props.loading}
					bordered
					onChange={this.tableChange.bind(this)}
				/>
			</div>
		);
	}
}

export default Goods;