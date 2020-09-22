import React, { Component, PropTypes } from "react";
import { connect } from "dva";
import { Table, Button, Modal, Switch,Menu, Dropdown,Icon,Input  } from "antd";
import moment from "moment";
import { routerRedux } from "dva/router";

@connect(({
            suggest,
            loading
        }) => ({
                suggestlist: suggest.suggestlist,
	suggestloading: loading.effects['suggest/getsuggestlist'],
	pagination: suggest.pagination
 }))
class SuggestCard extends Component {
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
                type: "suggest/getsuggestlist",
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
            title: '姓名',
            dataIndex: 'mname',
            render: text => <a href="javascript:;">{text}</a>,
            }, {
            title: '建议时间',
            dataIndex: 'stime',
            render:text=><span>{moment(text).format('YYYY-MM-DD HH:mm:ss')}</span>,
            },{
            title: '建议内容',
			dataIndex: 'sdesc',
			 
            } ];
		return (
			<div className="content-inner">
				 

				<Table
					columns={columns}
					pagination={pagination}
					dataSource = {
					    this.props.suggestlist
					}
					rowKey="pcid"
					loading = {
					    this.props.suggestloading
					}
					bordered
					onChange={this.tableChange.bind(this)}
				/>
			</div>
		);
	}
}

export default SuggestCard;