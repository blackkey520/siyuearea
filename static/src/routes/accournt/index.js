import React, { Component, PropTypes } from "react";
import { connect } from "dva";
import {
    Table,
    Button,
    Modal,
    Select,
    Menu,
    Dropdown,
    Icon,
    Input,
    DatePicker,
} from "antd";
import moment from "moment";
import { routerRedux } from "dva/router";
import { atype,astate} from '../../utils/enum';
const Search = Input.Search;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
import zhCN from 'antd/lib/locale-provider/zh_TW';
@connect(({ accournt,loading }) => ({accourntlist: accournt.accourntlist,
	accourntloading: loading.effects['accournt/getorderlist'],
	pagination: accournt.pagination
 }))
class AccourntList extends Component {
	static contextTypes = {
		router: PropTypes.object
    };
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
	componentDidMount() {
		this.loadTableData();
	}

	loadTableData(page = 1, pageSize = 10) {
        const {
            membercode, atype, astate, btime, etime
        }=this.state;
        this.props.dispatch({
                type: "accournt/getaccourntlist",
                payload: { page, pageSize,membercode,atype,astate,btime,etime }
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
                title: '入账类型',
				dataIndex: 'atype',
				render:text=><span>{atype[text]}</span>,
            },{
                title: '账目类型',
				dataIndex: 'astate',
				render:text=><span>{astate[text]}</span>,
            },{
            title: '入账金额',
            dataIndex: 'amoney',
            }, {
            title: '备注',
			dataIndex: 'adesc',
            }, {
                title: '入账时间',
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
                 <Search
                    placeholder="请输入用户编号"
                    onSearch={(value) => {
                        this.setState({
                            membercode: value
                        });
                        this.loadTableData(1,10);
                    }}
                    style={{ width: 200 }}
                    />
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
					loading={this.props.accourntloadings}
					bordered
					onChange={this.tableChange.bind(this)}
				/>
			</div>
		);
	}
}

export default AccourntList;