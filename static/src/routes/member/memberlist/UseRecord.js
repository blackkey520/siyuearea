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
	Radio
} from "antd";
import moment from "moment";
import { routerRedux } from "dva/router";
import { atype,astate } from '../../../utils/enum'; 

@connect(({ accournt,loading }) => ({accourntlist: accournt.accourntlist,
	accourntloading: loading.effects['accournt/getaccourntlistbymid'],
	pagination: accournt.pagination,
	atype: accournt.atype
 }))
class UseRecord extends Component {
	static contextTypes = {
		router: PropTypes.object
	}; 
	componentDidMount() {
		this.loadTableData();
	}

	loadTableData(page = 1, pageSize = 10) {
		this.props.dispatch({
			type: "accournt/getaccourntlistbymid",
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
            title: '会员名称',
            dataIndex: 'mname',
            render: text => <a href="javascript:;">{text}</a>,
            }, {
                title: '操作类型',
				dataIndex: 'atype',
				render:text=><span>{atype[text]}</span>,
            },{
            title: '操作前金额',
            dataIndex: 'amoney',
            render: (text, record, index) => {
                 
                    return (<div>{text}</div>)
                 
            }
            }, {
                title: '操作后金额',
                dataIndex: 'asmoney',
                 render: (text, record, index) => {
                 
                    return (<div>{text}</div>)
                
            }
            }, {
            title: '备注',
			dataIndex: 'adesc',
            }, {
                title: '操作时间',
				dataIndex: 'atime',
				render: (text, record, index) => { 
					return (
						moment(text).format('YYYY-MM-DD HH:mm:ss')
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
						<Radio.Group style={{marginLeft:15}} onChange={(e)=>{
					 
						this.props.dispatch({
							type: "accournt/updateState",
							payload: {
								atype: e.target.value
							}
						});
						this.loadTableData(1, 10);
						}} value={this.props.atype}>
						<Radio.Button value={100}>{'全部'}</Radio.Button>
						{
							atype.map((item, key) => {
								if(key!==0)
									return(<Radio.Button key={key}  value={key}>{item}</Radio.Button>);
							})
						}
      </Radio.Group>
				</div>

				<Table
					columns={columns}
					pagination={pagination}
					dataSource={this.props.accourntlist}
					rowKey="aid"
					loading={this.props.accourntloading}
					bordered
					onChange={this.tableChange.bind(this)}
				/>
			</div>
		);
	}
}

export default UseRecord;