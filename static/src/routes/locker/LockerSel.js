import React, { Component, PropTypes } from "react";
import { connect } from "dva";
import {
	Table,
	Button,
	Modal,
	InputNumber,
	Menu,
	Dropdown,
	Icon,
	Input,
	message,
	Form,
	Radio,
	 Tag,
	 Col,
} from "antd";
import moment from "moment";
import {placelist,ltype} from '../../utils/enum';

import { routerRedux } from "dva/router";
import { mtype,mstate} from '../../utils/enum';
import { createForm } from 'rc-form';
const Search = Input.Search;
const TextArea = Input.TextArea;
import 'moment/locale/zh-cn';
const { confirm } = Modal;
moment.locale('zh-cn');
 
@connect(({ locker,loading }) => ({
	lockerlist: locker.lockerlist,
	lockerloading: loading.effects['locker/getlockerlist'],
	pagination: locker.pagination,
	searchval: locker.searchval,
	lstate: locker.lstate,
	mem: locker.mem
 }))
class LockerSel extends Component {
	static contextTypes = {
		router: PropTypes.object
	};
	constructor(props, context) {
		super(props, context);
		this.state={
			 
		}
	}
	componentDidMount() {
		this.loadTableData(1,10);
	}
 
	loadTableData(page = 1, pageSize = 10) {
		 this.props.dispatch({
				type: "locker/getlockerlist",
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
            title: '编号',
            dataIndex: 'lname',
             
            },   {
            	 title: '类型',
            	 dataIndex: 'ltype',
				render: (text, record, index) => {
					return(<div>{ltype[text]}</div>);
				}
            }, {
            	title: '位置',
				dataIndex: 'lstate',
				render: (text, record, index) => {
					return(<div>{placelist[text]}</div>);
				}
            },  {
                title: '状态',
                dataIndex: 'mname',
                render: (text, record, index) => {
                    if(text==null)
                    {
                        return (<Tag color={'#87d068'}>
              空闲
            </Tag>);
                    }else{
						if (this.props.member.mid==record.lmember)
						{
							return (<Tag color={'blue'}>
              {this.props.member.mname}储物柜
            </Tag>);
						}
                        else{
							return (<Tag color={'#f50'}>
              使用中
            </Tag>);
						}
                    }
				}
            }, {
                title: '操作',
                dataIndex: 'mid',
                render: (text, record, index) => {
					const that=this;
                    if(text==null)
                    {
                        return (<Button onClick={()=>{
							const rec=record;
							 confirm({
							 	title: <div>确定为 <span style={{color:'red',fontWeight:'bold'}}>{that.props.member.mname}</span> 分配 [<span style={{color:'red',fontWeight:'bold'}}>{placelist[rec.lstate]+' '+rec.lname}</span>]储物柜吗</div>,
							 	onOk() {
							 		that.props.SelectChange(rec);
							 	},
							 });
							}}>选择</Button>);
                    } 
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
                    placeholder="请输入储物柜编号/会员姓名/联系电话"
					value={this.props.searchval}
					onChange={e=>{
						this.props.dispatch({
							type: "locker/updateState",
							payload: {
								searchval: e.target.value
							}
						});
					}}
                    onSearch={(value) => {
                        this.loadTableData(1,10,value);
                    }}
                    style={{ width: 200 }}
                    />
						<Radio.Group style={{marginLeft:15}} onChange={(e)=>{
					 
						this.props.dispatch({
							type: "locker/updateState",
							payload: {
								lstate: e.target.value
							}
						});
						this.loadTableData(1, 10);
						}} value={this.props.lstate}>
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
							type: "locker/updateState",
							payload: {
								mem: e.target.value
							}
						});
						this.loadTableData(1, 10);
						}} value={this.props.mem}>
						<Radio.Button value={100}>{'全部'}</Radio.Button>
						<Radio.Button value={0}>{'空闲'}</Radio.Button>
						<Radio.Button value={1}>{'使用'}</Radio.Button>
						 
      </Radio.Group>
				</div>

				<Table
					columns={columns}
					pagination={pagination}
					dataSource={this.props.lockerlist}
					rowKey="lid"
					
					loading={this.props.lockerloading}
					bordered
					onChange={this.tableChange.bind(this)}
				/>
			 
			</div>
		);
	}
}

export default LockerSel;