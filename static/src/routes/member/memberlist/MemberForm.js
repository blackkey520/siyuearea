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
} from "antd";
import { config } from "../../../utils/config";
import moment from "moment";
import { mtype,mstate} from '../../../utils/enum';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;	


@connect(({ member,loading }) => ({
		checkmember: member.checkmember,
		formloading: loading.effects['member/loadmember']
 }))
class MemberForm extends Component {
	static contextTypes = {
		router: PropTypes.object
	};

	constructor(props, context) {
		super(props, context);
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

	onSubmit(e) {
		e.preventDefault();

		this.props.form.validateFields((err, values) => {
			if (err) {
				return;
			}
			const hide = message.loading("正在保存...", 0);
			this.props.dispatch({
				type: "member/savemember",
				payload: {
					param:{
						id: this.props.match.params ? this.props.match.params.id : null,
						mname: values.mname,
						phonenum: values.phonenum,
						mstate:values.mstate,
						mregisttime:values.mregisttime,
						mtype:values.mtype,
						mdesc:values.mdesc,
						mmoney:values.mmoney
					},
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
		});
	}

	render() {
		const { getFieldDecorator } = this.props.form;

		const formItemLayout = {
			labelCol: { span: 3 },
			wrapperCol: { span: 12 }
		};
		if(this.props.formloading)
		{
			return ( <div style={{width:'100%',textAlign:'center',paddingTop:280}}><Spin/></div>)
		}
		const days = moment(this.props.checkmember.etime).diff(moment(), 'days', false);
		let cpd=null;
		if (this.props.checkmember.pcname !== null)
		{
			cpd=<div>{this.props.checkmember.pcname}({days>0?<span style={{color:'red'}}>剩余{days}天</span>:<span style={{color:'red'}}>过期</span>})</div>;
		}
		else{
			cpd=<div>无</div>;
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
						<Button type="primary" onClick={this.onSubmit.bind(this)}>
							确认
						</Button>
					</div>

					<Form>
						<FormItem {...formItemLayout} label="会员名称">
							{getFieldDecorator("mname", {
								initialValue: this.props.checkmember.mname,
								rules: [
									{
										required: true,
										message: "请输入会员名称"
									}
								]
							})( < Input placeholder = "请输入会员名称" / > )
							}
						</FormItem>
						<FormItem {...formItemLayout} label="电话号码">
							{getFieldDecorator("phonenum", {
								initialValue: this.props.checkmember.phonenum,
								rules: [
									{
										required: true,
										message: "请输入电话号码"
									}
								]
							})(<Input placeholder="请输入电话号码" />)}
						</FormItem>
						<FormItem {...formItemLayout} label="会员状态">
							{getFieldDecorator("mstate", {
								initialValue: this.props.checkmember.mstate ? this.props.checkmember.mstate:0
							})(
								<RadioGroup>
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
								initialValue: this.props.checkmember.mtype ? this.props.checkmember.mtype : 0
							})(<RadioGroup>
									{
										mtype.map((item, key) => {
											return (<RadioButton key={item} value={key}>{item}</RadioButton>)
										})
									}
								</RadioGroup>)}
						</FormItem>
						<FormItem {...formItemLayout} label="优惠卡">
							 {
								 cpd
							 }
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
							})( <Input  / > )
							}
						</FormItem>
						<FormItem {...formItemLayout} label="备注">
							{getFieldDecorator("mdesc", {
								initialValue: this.props.checkmember.mdesc,
							})(
								<Input
									type="textarea"
									autosize={{ minRows: 5, maxRows: 10 }}
								/>
							)}
						</FormItem>
					</Form> 
				</div>
			)
	}
}
export default createForm()(MemberForm);