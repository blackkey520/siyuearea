import React, { Component, PropTypes } from "react";
import { connect } from "dva"; 
import { createForm } from 'rc-form';
import {
    Input,
	Table,
	DatePicker
} from "antd";
import { config } from "../../utils/config";
import moment from "moment";
import {odrtype} from '../../utils/enum';
 const Search = Input.Search;
 const {  RangePicker } = DatePicker;
import zhCN from 'antd/lib/locale-provider/zh_TW';
@connect(({ place,loading, }) => ({
		traillist: place.traillist,
        traillistloading: loading.effects['place/gettraillist'],
        pagination: place.pagination
 }))
class TrialList extends Component {
	static contextTypes = {
		router: PropTypes.object
	};
	constructor(props, context) {
        super(props, context);
        this.state={
			dates: [],
			searchtext:''
        }
    }
   
	 componentDidMount() {
	     this.loadTableData();
	 }

	 loadTableData(page = 1, pageSize = 10, searchtext = '',date=[]) {
		 let params={
			 page,
			 pageSize,
			 pm:{}
		 }
	     if (searchtext !== '') {
	          params.pm.odrdesc=searchtext
		 } 
		 if(date.length!=0)
		 {
			 params.pm.btime = date[0].format('YYYY-MM-DD HH:mm:ss')
			 params.pm.etime = date[1].format('YYYY-MM-DD HH:mm:ss')
		 }
		 this.props.dispatch({
		 	type: "place/gettraillist",
		 	payload: params
		 });
	 }

	 tableChange(pagination) {
	     this.loadTableData(pagination.current, pagination.pageSize, this.state.searchtext, this.state.dates);
	 }
	render() {  
        const pagination = {
			showTotal: total => `共${total}条数据`,
			...this.props.pagination
		};
		 
        const columns = [{
            title: '试用时间',
            dataIndex: 'odrdate',
            render: (text, record, index) => {
            	return (
            		moment(text).format('YYYY-MM-DD HH:mm:ss')
            	);
            }
            }, {
            title: '试用类型',
			dataIndex: 'odrtype',
			render:text=><span>{odrtype[text]}</span>,
            }, {
                title: '状态',
				dataIndex: 'isfinish',
				render: (text, record, index) => { 
					return (
						text==0?'正在使用':'使用完成'
					);
				}
            },{
            title: '使用座位',
			dataIndex: 'pname',
            },{
			title: '备注',
			width:500,
			dataIndex: 'odrdesc',
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
                    placeholder="请输入搜索条件"
                    onSearch={(value) => {
						this.setState({
							searchtext: value
						});
                        this.loadTableData(1, 10, value, this.state.dates);
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
					<RangePicker placeholder={['开始时间','结束时间']} locale={zhCN} allowClear style={{ marginLeft: 15 }} onChange={(date, dateString)=>{
                       
							   this.setState({
                               		dates: date,
                               });
							   this.loadTableData(1, 10, this.state.searchtext, date);
                            }} /> 
				</div>

				<Table
					columns={columns}
					pagination={pagination}
					dataSource={this.props.traillist}
					rowKey="oid"
					loading={this.props.traillistloading}
					bordered
					onChange={this.tableChange.bind(this)}
				/>
			</div>
			)
	}
}
export default createForm()(TrialList);