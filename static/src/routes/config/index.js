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
    InputNumber,
	message,
	Radio,
} from "antd";

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;	


@connect(({ config,loading }) => ({
		checkconfig: config.checkconfig,
		formloading: loading.effects['config/loadconfig']
 }))
class Config extends Component {
	static contextTypes = {
		router: PropTypes.object
	};

	constructor(props, context) {
		super(props, context);
	}

	componentDidMount() {
		const { dispatch } = this.props;
		dispatch({ type: "config/loadconfig", payload: { id:1 } });
	}

	componentWillUnmount() {
		this.props.dispatch({
			type: "config/updateState",payload:{checkconfig:{}}
		});
	}

 

	onSubmit(e) {
		e.preventDefault();

		this.props.form.validateFields((err, values) => {
			if (err) {
				return;
			}
			const hide = message.loading("正在保存...", 0);
			this.props.dispatch({
				type: "config/saveconfig",
				payload: {
					param:{
                        cid: 1,
						dayvalue: values.dayvalue,
						weekvalue: values.weekvalue,
						monthvalue: values.monthvalue,
						sessionvalue: values.sessionvalue,
						rechargedis: parseInt(values.rechargedis)/100,
						overspan: 30
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
		return (
				<div className="content-inner">
					<div
						style={{
							borderBottom: "1px solid #ddd",
							marginBottom: 20,
							paddingBottom: 10
						}}
					>
						<Button type="primary" onClick={this.onSubmit.bind(this)}>
							确认
						</Button>
						 
					</div>

					<Form>
						<FormItem {...formItemLayout} label="日会员价格">
							{getFieldDecorator("dayvalue", {
								initialValue: this.props.checkconfig.dayvalue,
								rules: [
									{
										required: true,
										message: "请输入日会员价格"
									}
								]
							})( < Input placeholder = "请输入日会员价格" / > )
							}
						</FormItem>
						<FormItem {...formItemLayout} label="周会员价格">
							{getFieldDecorator("weekvalue", {
								initialValue: this.props.checkconfig.weekvalue,
								rules: [
									{
										required: true,
										message: "请输入周会员价格"
									}
								]
							})(<Input placeholder="请输入周会员价格" />)}
						</FormItem>
                        <FormItem {...formItemLayout} label="月会员价格">
							{getFieldDecorator("monthvalue", {
								initialValue: this.props.checkconfig.monthvalue,
								rules: [
									{
										required: true,
										message: "请输入月会员价格"
									}
								]
							})(<Input placeholder="请输入月会员价格" />)}
						</FormItem>
                         <FormItem {...formItemLayout} label="季会员价格">
							{getFieldDecorator("sessionvalue", {
								initialValue: this.props.checkconfig.sessionvalue,
								rules: [
									{
										required: true,
										message: "请输入季会员价格"
									}
								]
							})(<Input placeholder="请输入季会员价格" />)}
						</FormItem>
						<FormItem {...formItemLayout} label="充值折扣">
							{getFieldDecorator("rechargedis", {
								initialValue: this.props.checkconfig.rechargedis*100,
							})( <InputNumber
                                    defaultValue={100}
                                    min={0}
                                    max={100}
                                    formatter={value => `${value}%`}
                                    parser={value => value.replace('%', '')}
                                    /> )
							}
						</FormItem>
						{/* <FormItem {...formItemLayout} label="过期时间(分钟)">
							{getFieldDecorator("overspan", {
								initialValue: this.props.checkconfig.overspan,
							})( <InputNumber
                                    defaultValue={1}
                                    min={30}
                                    max={120}
                                    />)
							}
						</FormItem> */}
					</Form> 
				</div>
			)
	}
}
export default createForm()(Config);