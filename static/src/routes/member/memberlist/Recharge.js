import React, { Component, PropTypes } from "react";
import { connect } from "dva";
import { routerRedux } from "dva/router";
import { createForm } from 'rc-form';
import {
	Input,
	Form,
	Button,
	Spin,
	Icon,
	message,
	Radio,
	Tabs,
	Tooltip,
	DatePicker,
	Table,
	Select
} from "antd";
import { config } from "../../../utils/config";
import moment from "moment";
import { mtype,atype,astate} from '../../../utils/enum';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;	
const TabPane = Tabs.TabPane;
const Option = Select.Option;


function formatNumber(value) {
  value += '';
  const list = value.split('.');
  const prefix = list[0].charAt(0) === '-' ? '-' : '';
  let num = prefix ? list[0].slice(1) : list[0];
  let result = '';
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
}


@connect(({ productcard,member,loading,accournt }) => ({
	accourntlist: accournt.accourntlist,
	checkmember: member.checkmember,
	formloading: loading.effects['member/loadmember'] && loading.effects['accournt/getaccourntlistbymid'],
	pagination: accournt.pagination,
	productcardlist: productcard.productcardlist
 }))
class Recharge extends Component {
	static contextTypes = {
		router: PropTypes.object
	};

	constructor(props, context) {
		super(props, context);
		this.state={
			rechargevalue:0,
			modaltype:"1",
			cardtype:'1',
			pctype:'',
			cardusedate: moment().format('YYYY-MM-DD 00:00:00')
		}
	}
	loadTableData(page = 1, pageSize = 5) {
		this.props.dispatch({
			type: "accournt/getaccourntlistbymid",
			payload: {
				page,
				pageSize,
				mid: this.props.match.params.id
			}
		});
	}
	tableChange(pagination) {
		this.loadTableData(pagination.current, pagination.pageSize);
	}
	componentDidMount() {
		const id = this.props.match.params && this.props.match.params.id;
		const { dispatch } = this.props;
		if (id) {
			this.loadTableData(1, 5);
			this.props.dispatch({
				type: "productcard/getproductcardlist",
				payload: { page:1, pageSize:10000,isused:1 }
			}); 
			dispatch({ type: "member/loadmember", payload: { id } });
		}
	}

	componentWillUnmount() {
		this.props.dispatch({
			type: "member/updateState",payload:{checkmember:{}}
		});
	}

	goBack() {
		this.props.dispatch(routerRedux.push({ pathname: "/memberlist" }));
	}
 
	render() {
		const pagination = {
			showTotal: total => `共${total}条数据`,
			...this.props.pagination
		};
		const { getFieldDecorator } = this.props.form;
		const title = this.state.rechargevalue ? (
							<span className="numeric-input-title">
								{this.state.rechargevalue !== '' ? formatNumber(this.state.rechargevalue) : ''}
							</span>
							) : '输入充值金额';
		const columns = [{
            title: '会员名称',
            dataIndex: 'mname',
            render: text => <a href="javascript:;">{text}</a>,
            }, {
                title: '操作类型',
				dataIndex: 'atype',
				render:text=><span>{atype[text]}</span>,
            } ,{
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
		if(this.props.formloading)
		{
			return ( <div style={{width:'100%',textAlign:'center',paddingTop:280}}><Spin/></div>)
		}
		return (
				<div className="content-inner">
					<div
						style={{
							borderBottom: "1px solid #ddd",
							marginBottom: 20,
							paddingBottom: 10
						}}
					>
						<Button style={{ marginRight: 10 }} onClick={this.goBack.bind(this)}>
							返回
						</Button>
						<Button style={{ marginRight: 10 }} type="primary" onClick={(e)=>{
								if (this.state.modaltype==="3"&&this.state.pctype==="")
								{
									message.warn("请选择优惠卡");
								}
								else{
									const hide = message.loading("正在保存...", 0);
									this.props.dispatch({
									type: "member/recharge",
									payload: {
										rechargetype: this.state.modaltype,
										cardtype: this.state.cardtype,
										pctype: this.state.pctype,
										cardusedate: this.state.cardusedate,
										rechargevalue: this.state.rechargevalue,
										callback: data => {
											hide();
											if (data && data.success) {
												message.success("保存成功");
												this.goBack();
											} else {
												message.error("保存失败");
											}
										}
									}
									});
								}
							}}>
							确定
						</Button>
						 
					</div>
					 <Tabs defaultActiveKey="1" onChange={(key)=>{
						this.setState({
							modaltype:key
						});
					}}>
						<TabPane style={{height:100}} tab="充值" key="1">
							 <Tooltip
								trigger={['focus']}
								title={title}
								placement="topLeft"
								overlayClassName="numeric-input"
							>
								会员余额：<span style={{color:'red'}}>{this.props.checkmember.mmoney}</span>元
								<br />
								充值金额：<Input
								value={this.state.rechargevalue}
								style={{width:200}}
								onChange={(e)=>{
									const { value } = e.target;
									const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
									if ((!isNaN(value) && reg.test(value)) || value === '') {
									this.setState({
										rechargevalue:value
									});
									}
								}}
								placeholder="输入金额"
								maxLength="25"
								/>元
							</Tooltip>
						</TabPane>
						<TabPane tab="肆阅卡" key="2">
							<RadioGroup onChange={(e)=>{
									this.setState({
										cardtype: e.target.value
									});
								}} defaultValue="1">
								{
										mtype.map((item, key) => {
											if(key!==0)
											{
												return (<RadioButton key={item} value={key}>{item}</RadioButton>)
											}
										})
									}
							</RadioGroup>
							<br/>
							<DatePicker style={{marginTop:10,width:170}} placeholder="选择生效时间(默认当天)" onChange={(date, dateString)=>{
								this.setState({
									cardusedate: date.format('YYYY-MM-DD 00:00:00')
								});
							}}/>
						</TabPane>
						{/* <TabPane tab="优惠卡" key="3">
							
							<Select
								style={{ width: 200 }}
								placeholder="选择优惠卡"
								value={this.state.pctype}
								onChange={(value)=>{
									 this.setState({
										 pctype:value
									 });
								}}
							>
								{
									this.props.productcardlist.map((item,key)=>{
										const days=moment(item.etime).diff(moment(), 'days', false);
										return (<Option key={key} value={item.pcid.toString()}>{days>0?`${item.pcname}(还有${days}天过期)`:'已经过期'}</Option>);
									})
								}
							</Select>
							</TabPane> */}
					</Tabs>		
						<div
					style={{
						paddingBottom: 10,
						marginBottom: 20,
						borderBottom: "1px solid #ddd"
					}}
				>储值记录</div>
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
			)
	}
}
export default createForm()(Recharge);