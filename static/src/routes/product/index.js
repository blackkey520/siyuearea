import React, { Component, PropTypes } from "react";
import { connect } from "dva";
import {
	Table,
	Button,
	Radio,
	Switch,
	Menu,
	Dropdown,
	Icon,
	Input
} from "antd";
import moment from "moment";
import { routerRedux } from "dva/router";
import { protype } from '../../utils/enum';
const Search = Input.Search;

@connect(({ product,loading }) => ({productlist: product.productlist,
	loading: loading.effects['product/getproductlist'],
	pagination: product.pagination,
	protype:product.protype
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
                type: "product/getproductlist",
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
            title: '商品名称',
            dataIndex: 'proname',
            render: text => <a href="javascript:;">{text}</a>,
			}, 
			{
				title: '商品类别',
            dataIndex: 'protype',
           render: (text, record, index) => { 
					 
					return (
						<div>
							 {protype[text]}
						</div>
					);
				}
			}, {
            title: '商品价格',
            dataIndex: 'promoney',
            render:text=><span>￥{text}</span>,
            },{
            title: '商品简述',
			dataIndex: 'prodesc',
            } ,{
            	title: '操作',
            	render: (text, record, index) => { 
					 
					return (
						<div>
							<Button style={{ marginLeft: 8 }} onClick={()=>{
                                this.props.dispatch({
                                    type: "product/updateState",
                                    payload: {
                                        checkproduct: record
                                    }
                                });
                                this.props.dispatch(
                                    routerRedux.push({
                                        pathname: `/product/edit/${record.proid}`
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
									routerRedux.push({ pathname: "/product/create" })
							);
							this.props.dispatch({
								type: "product/updateState",
								payload: {
									checkproduct: {
										proimgdescarray: ['', '', '', '', '', '', '', '', '', '']
									}
								}
							});
						}}
						style={{ marginLeft: 10 }}
					>
						新增商品
					</Button> 
						<Radio.Group style={{marginLeft:15}} onChange={(e)=>{
					 
						this.props.dispatch({
							type: "product/updateState",
							payload: {
								protype: e.target.value
							}
						});
						this.loadTableData(1, 10);
						}} value={this.props.protype}>
						<Radio.Button value={100}>{'全部'}</Radio.Button>
						{
							protype.map((item, key) => {
								
									return(<Radio.Button key={key}  value={key}>{item}</Radio.Button>);
							})
						}
						 
      </Radio.Group>
				</div>

				<Table
					columns={columns}
					dataSource={this.props.productlist}
					rowKey="proid"
					loading={this.props.loading}
					bordered
					onChange={this.tableChange.bind(this)}
				/>
			</div>
		);
	}
}

export default ProductCard;