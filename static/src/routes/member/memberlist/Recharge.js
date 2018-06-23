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
	Modal,
	Tooltip,
	DatePicker
} from "antd";
import { config } from "../../../utils/config";
import moment from "moment";
import { mtype,mstate} from '../../../utils/enum';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;	


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


@connect(({ member,loading }) => ({
		checkmember: member.checkmember,
		formloading: loading.effects['member/loadmember']
 }))
class Recharge extends Component {
	static contextTypes = {
		router: PropTypes.object
	};

	constructor(props, context) {
		super(props, context);
		this.state={
			rechargevalue:0,
			visible:false,
			modaltype:0,
			cardtype:'1',
			cardusedate: moment().format('YYYY-MM-DD 00:00:00')
		}
	}

	componentDidMount() {
		const id = this.props.match.params && this.props.match.params.id;
		const { dispatch } = this.props;

		if (id) {
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
		const { getFieldDecorator } = this.props.form;
		const title = this.state.rechargevalue ? (
							<span className="numeric-input-title">
								{this.state.rechargevalue !== '' ? formatNumber(this.state.rechargevalue) : ''}
							</span>
							) : '输入充值金额';
		const formItemLayout = {
			labelCol: { span: 3 },
			wrapperCol: { span: 12 }
		};
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
								 this.setState({
									visible:true,
									modaltype:0
								});
							}}>
							充值
						</Button>
						<Button type="primary" onClick={(e)=>{
								 this.setState({
									visible:true,
									modaltype: 1
								});
							}}>
							开卡
						</Button>
					</div>
					<Form>
						<FormItem {...formItemLayout} label="会员名称">
							{getFieldDecorator("mname", {
								initialValue: this.props.checkmember.mname
							})( <Input disabled / > )
							}
						</FormItem>
						<FormItem {...formItemLayout} label="电话号码">
							{getFieldDecorator("phonenum", {
								initialValue: this.props.checkmember.phonenum
							})(<Input disabled />)}
						</FormItem>
						<FormItem {...formItemLayout} label="会员状态">
							{getFieldDecorator("mstate", {
								initialValue: this.props.checkmember.mstate ? this.props.checkmember.mstate:0
							})(
								<RadioGroup disabled>
									{
										mstate.map((item,key)=>{
											return (<RadioButton key={item} value={key}>{item}</RadioButton>)
										})
									}
								</RadioGroup>
							)}
						</FormItem>
						<FormItem {...formItemLayout} label="会员类型">
							{getFieldDecorator("mtype", {
								initialValue: this.props.checkmember.status?this.props.checkmember.status:0
							})(<RadioGroup disabled>
									{
										mtype.map((item, key) => {
											return (<RadioButton key={item} value={key}>{item}</RadioButton>)
										})
									}
								</RadioGroup>)}
						</FormItem>
						<FormItem {...formItemLayout} label="注册时间">
							{getFieldDecorator("mregisttime", {
								initialValue: this.props.checkmember.mregisttime ? this.props.checkmember.mregisttime : moment().format('YYYY-MM-DD HH:mm:ss'),
							})( <Input disabled / > )
							}
						</FormItem>
						<FormItem {...formItemLayout} label="会员余额(元)">
							{getFieldDecorator("mmoney", {
								initialValue: this.props.checkmember.mmoney?this.props.checkmember.mmoney:0,
							})( <Input disabled  / > )
							}
						</FormItem>
						<FormItem {...formItemLayout} label="备注">
							{getFieldDecorator("mdesc", {
								initialValue: this.props.checkmember.mdesc,
							})(
								<Input
								disabled
									type="textarea"
									autosize={{ minRows: 5, maxRows: 10 }}
								/>
							)}
						</FormItem>
					</Form> 
					 <Modal
					title={this.state.modaltype===0?'充值':'开卡'}
					visible={this.state.visible}
					onOk={()=>{
						const hide = message.loading("正在保存...", 0);
						this.setState({
							visible:false
						});
						this.props.dispatch({ type: "member/recharge", payload: { recchargetype:this.state.modaltype,
						cardtype: this.state.cardtype,cardusedate:this.state.cardusedate,rechargevalue: this.state.rechargevalue
						,callback: data => {
							hide();
							if (data && data.success) {
								message.success("保存成功");
								this.goBack();
							} else {
								message.error("保存失败");
							}
					} } });
					}}
					onCancel={()=>{
						this.setState({
							visible:false
						});
					}}
					okText="确认"
					cancelText="取消"
					>
						{this.state.modaltype===0?<div><div style={{fontSize:15,paddingBottom:15}}>请问您确定为<span style={{color:'red',fontWeight: 'bold'}}>
								{this.props.checkmember.mname}</span>充值吗？</div>

						 <Tooltip
							trigger={['focus']}
							title={title}
							placement="topLeft"
							overlayClassName="numeric-input"
						>
							<Input
							value={this.state.rechargevalue}
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
							/>
						</Tooltip></div>:
							<div><div style={{fontSize:15,paddingBottom:15}}>请问您确定为<span style={{color:'red',fontWeight: 'bold'}}>
								{this.props.checkmember.mname}</span>开卡吗？</div>
							<RadioGroup onChange={(e)=>{
									this.setState({
										cardtype: e.target.value
									});
								}} defaultValue="1">
								<RadioButton value="1">日卡会员</RadioButton>
								<RadioButton value="2">周卡会员</RadioButton>
								<RadioButton value="3">月卡会员</RadioButton>
								<RadioButton value="4">季卡会员</RadioButton>
							</RadioGroup>
							<br/>
							<DatePicker style={{marginTop:10,width:170}} placeholder="选择生效时间(默认当天)" onChange={(date, dateString)=>{
								this.setState({
									cardusedate: date.format('YYYY-MM-DD 00:00:00')
								});
							}}/>
						 </div>
						}
					</Modal>
				</div>
			)
	}
}
export default createForm()(Recharge);