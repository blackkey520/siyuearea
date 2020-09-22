import React, { Component, PropTypes } from "react";
import { connect } from "dva";
import {
	Table,
	Button,
	Select,
	DatePicker,
	Input
} from "antd";
import moment from "moment";
import { routerRedux } from "dva/router";
import { atype,astate } from '../../../utils/enum'; 
const Search = Input.Search;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
import zhCN from 'antd/lib/locale-provider/zh_TW';
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
  constructor(props, context) {
  	super(props, context);
  	this.state = {
  		membercode: undefined,
  		atype: undefined,
  		astate: undefined,
  		btime: undefined,
  		etime: undefined
  	}
  }
	loadTableData(page = 1, pageSize = 10) {
	 
		const {
            membercode, atype, astate, btime, etime
        }=this.state;
        this.props.dispatch({
                type: "accournt/getaccourntlistbymid",
                payload: {
					mid: this.props.match.params.id,
					page,
                	pageSize,
                	membercode,
                	atype,
                	astate,
                	btime,
                	etime
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
						 
	   <Select defaultValue="all" style={{marginLeft:5,width: 120}} onChange={(value)=>{
									this.setState({
										atype: value === "all" ? undefined : parseInt(value)
									});
								}}>
								<Option value="all">全部</Option>
                                {
                                    atype.map((item,key)=><Option key={key} value={key.toString()}>{item}</Option>)
                                }
							</Select>
                            <RangePicker placeholder={['开始时间','结束时间']} locale={zhCN} allowClear style={{ marginLeft: 5 }} onChange={(date, dateString)=>{
                                if(date.length===0){
                                    this.setState({
                                        btime: undefined,
                                        etime: undefined,
                                    });
                                }else{
                                    this.setState({
                                        btime: date[0].format('YYYY-MM-DD 00:00:00'),
                                        etime: date[1].format('YYYY-MM-DD 00:00:00  '),
                                    });
                                }
                            }} /> 
							<Button
						onClick={()=>{
							this.loadTableData(1, 10);
						}}
                         type = "primary"
						style={{ marginLeft: 10 }}
					>
						查询
					</Button> 
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