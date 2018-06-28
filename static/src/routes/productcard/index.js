import React, { Component, PropTypes } from "react";
import { connect } from "dva";
import { Table, Button, Modal, Switch,Menu, Dropdown,Icon,Input  } from "antd";
import moment from "moment";
import { routerRedux } from "dva/router";
import { ostate } from '../../utils/enum';
const Search = Input.Search;

@connect(({ productcard,loading }) => ({productcardlist: productcard.productcardlist,
	productcardloading: loading.effects['productcard/getproductcardlist'],
	pagination: productcard.pagination
 }))
class ProductCard extends Component {
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
                type: "productcard/getproductcardlist",
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
		 
        const columns = [{
            title: '优惠卡名称',
            dataIndex: 'pcname',
            render: text => <a href="javascript:;">{text}</a>,
            }, {
            title: '开始时间',
            dataIndex: 'btime',
            render:text=><span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>,
            },{
            title: '简述',
			dataIndex: 'etime',
			render:(text)=>{
				const days = moment(text).diff(moment(), 'days', false);
				return(days>0?<span>还有<span style={{color:'red'}}>{days}</span>天过期</span>:<span style={{color:'red'}}>已经过期</span>);
			},
            } ,  {
            title: '价格',
			dataIndex: 'value',
            }, {
            	title: '状态',
				dataIndex: 'isused',
				render:text=><span>{text===0?'停用':'启用'}</span>,
            },{
            	title: '操作',
            	render: (text, record, index) => { 
					 
					return (
						<div>
							<Button style={{ marginLeft: 8 }} onClick={()=>{
							 this.props.dispatch(
								routerRedux.push({
									pathname: `/productcard/edit/${record.pcid}`
								})
							);
							}}>
								 <Icon type="bars" />编辑
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
					<Button
						onClick={()=>{
							this.props.dispatch(
									routerRedux.push({ pathname: "/productcard/create" })
							);
						}}
						style={{ marginLeft: 10 }}
					>
						新增优惠卡
					</Button> 

				</div>

				<Table
					columns={columns}
					pagination={pagination}
					dataSource={this.props.productcardlist}
					rowKey="pcid"
					loading={this.props.productcardloading}
					bordered
					onChange={this.tableChange.bind(this)}
				/>
			</div>
		);
	}
}

export default ProductCard;