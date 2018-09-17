import React, { Component, PropTypes } from "react";
import { connect } from "dva";
import { routerRedux } from "dva/router";
import { createForm } from 'rc-form';
import {
	Input,
	Form,
	Button,
	Spin,
     Row, Col,
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
						daydis: parseInt(values.daydis) / 100,
						weekdis: parseInt(values.weekdis) / 100,
						monthdis: parseInt(values.monthdis) / 100,
						sessiondis: parseInt(values.sessiondis) / 100,
						weekzmvalue: values.weekzmvalue,
						monthzmvalue: values.monthzmvalue,
						sessionzmvalue: values.sessionzmvalue,
						weekzmdis: parseInt(values.weekzmdis) / 100,
						monthzmdis: parseInt(values.monthzmdis) / 100,
						sessionzmdis: parseInt(values.sessionzmdis) / 100,
						weekzyvalue: values.weekzyvalue,
						monthzyvalue: values.monthzyvalue,
						sessionzyvalue: values.sessionzyvalue,
						weekzydis: parseInt(values.weekzydis) / 100,
						monthzydis: parseInt(values.monthzydis) / 100,
						sessionzydis: parseInt(values.sessionzydis) / 100,
						rechargedis: parseInt(values.rechargedis) / 100,
						rechargedisone: parseInt(values.rechargedisone) / 100,
						rechargedistwo: parseInt(values.rechargedistwo) / 100,
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

					<Form >
						<Row gutter={0}>
							<Col span={10} push={1}>
								<FormItem {...formItemLayout} labelCol={{span: 7}} label="日会员价格">
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
							</Col>
							<Col span={10} push={1}>
								<FormItem {...formItemLayout} labelCol={{span: 7}}  label="日会元折扣">
									{getFieldDecorator("daydis", {
										initialValue: this.props.checkconfig.daydis*100,
										rules: [
											{
												required: true,
												message: "请输入日会元折扣"
											}
										]
									})(<InputNumber
                                    min={0}
                                    max={100}
                                    formatter={value => `${value}%`}
                                    parser={value => value.replace('%', '')}
                                    /> )}
								</FormItem>
							</Col>
						</Row>

						<Row gutter={0}>
							<Col span={10} push={1}>
								<FormItem {...formItemLayout} labelCol={{span: 7}}  label="周会员价格">
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
							</Col>
							<Col span={10} push={1}>
								<FormItem {...formItemLayout} labelCol={{span: 7}}  label="周会元折扣">
									{getFieldDecorator("weekdis", {
										initialValue: this.props.checkconfig.weekdis * 100,
										rules: [
											{
												required: true,
												message: "请输入周会元折扣"
											}
										]
									})(<InputNumber
                                    min={0}
                                    max={100}
                                    formatter={value => `${value}%`}
                                    parser={value => value.replace('%', '')}
                                    /> )}
								</FormItem>
							</Col>
						</Row>
						 
						<Row gutter={0}>
							<Col span={10} push={1}>
								<FormItem {...formItemLayout} labelCol={{span: 7}} label="月会员价格">
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
							</Col>
							<Col span={10} push={1}>
								<FormItem {...formItemLayout} labelCol={{span: 7}}  label="月会元折扣">
									{
										getFieldDecorator("monthdis", {
										initialValue: this.props.checkconfig.monthdis * 100,
										rules: [
											{
												required: true,
												message: "请输入月会元折扣"
											}
										]
									})(<InputNumber
                                    min={0}
                                    max={100}
                                    formatter={value => `${value}%`}
                                    parser={value => value.replace('%', '')}
                                    /> )}
								</FormItem>
							</Col>
						</Row>
                        
						<Row gutter={0}>
							<Col span={10} push={1}>
								<FormItem {...formItemLayout} labelCol={{span: 7}} label="季会员价格">
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
							</Col>
							<Col span={10} push={1}>
								<FormItem {...formItemLayout} labelCol={{span: 7}}  label="季会元折扣">
									{
										getFieldDecorator("sessiondis", {
										initialValue: this.props.checkconfig.sessiondis * 100,
										rules: [
											{
												required: true,
												message: "请输入季会元折扣"
											}
										]
									})(<InputNumber
                                    min={0}
                                    max={100}
                                    formatter={value => `${value}%`}
                                    parser={value => value.replace('%', '')}
                                    /> )}
								</FormItem>
							</Col>
						</Row>
						<Row gutter={0}>
							<Col span={10} push={1}>
								<FormItem {...formItemLayout} labelCol={{span: 7}}  label="周(周末)会员价格">
									{getFieldDecorator("weekzmvalue", {
										initialValue: this.props.checkconfig.weekzmvalue,
										rules: [
											{
												required: true,
												message: "请输入周(周末)会员价格"
											}
										]
									})(<Input placeholder="请输入周(周末)会员价格" />)}
								</FormItem>
							</Col>
							<Col span={10} push={1}>
								<FormItem {...formItemLayout} labelCol={{span: 7}}  label="周(周末)会元折扣">
									{getFieldDecorator("weekzmdis", {
										initialValue: this.props.checkconfig.weekzmdis * 100,
										rules: [
											{
												required: true,
												message: "请输入周(周末)会元折扣"
											}
										]
									})(<InputNumber
                                    min={0}
                                    max={100}
                                    formatter={value => `${value}%`}
                                    parser={value => value.replace('%', '')}
                                    /> )}
								</FormItem>
							</Col>
						</Row>
						 
						<Row gutter={0}>
							<Col span={10} push={1}>
								<FormItem {...formItemLayout} labelCol={{span: 7}} label="月(周末)会员价格">
									{getFieldDecorator("monthzmvalue", {
										initialValue: this.props.checkconfig.monthzmvalue,
										rules: [
											{
												required: true,
												message: "请输入月(周末)会员价格"
											}
										]
									})(<Input placeholder="请输入月(周末)会员价格" />)}
								</FormItem>
							</Col>
							<Col span={10} push={1}>
								<FormItem {...formItemLayout} labelCol={{span: 7}}  label="月(周末)会元折扣">
									{
										getFieldDecorator("monthzmdis", {
										initialValue: this.props.checkconfig.monthzmdis * 100,
										rules: [
											{
												required: true,
												message: "请输入月(周末)会元折扣"
											}
										]
									})(<InputNumber
                                    min={0}
                                    max={100}
                                    formatter={value => `${value}%`}
                                    parser={value => value.replace('%', '')}
                                    /> )}
								</FormItem>
							</Col>
						</Row>
                        
						<Row gutter={0}>
							<Col span={10} push={1}>
								<FormItem {...formItemLayout} labelCol={{span: 7}} label="季(周末)会员价格">
									{getFieldDecorator("sessionzmvalue", {
										initialValue: this.props.checkconfig.sessionzmvalue,
										rules: [
											{
												required: true,
												message: "请输入季(周末)会员价格"
											}
										]
									})(<Input placeholder="请输入季(周末)会员价格" />)}
								</FormItem>
							</Col>
							<Col span={10} push={1}>
								<FormItem {...formItemLayout} labelCol={{span: 7}}  label="季(周末)会元折扣">
									{
										getFieldDecorator("sessionzmdis", {
										initialValue: this.props.checkconfig.sessionzmdis * 100,
										rules: [
											{
												required: true,
												message: "请输入季(周末)会元折扣"
											}
										]
									})(<InputNumber
                                    min={0}
                                    max={100}
                                    formatter={value => `${value}%`}
                                    parser={value => value.replace('%', '')}
                                    /> )}
								</FormItem>
							</Col>
						</Row>
						<Row gutter={0}>
							<Col span={10} push={1}>
								<FormItem {...formItemLayout} labelCol={{span: 7}}  label="周(作业)会员价格">
									{getFieldDecorator("weekzyvalue", {
										initialValue: this.props.checkconfig.weekzyvalue,
										rules: [
											{
												required: true,
												message: "请输入周(作业)会员价格"
											}
										]
									})(<Input placeholder="请输入周(作业)会员价格" />)}
								</FormItem>
							</Col>
							<Col span={10} push={1}>
								<FormItem {...formItemLayout} labelCol={{span: 7}}  label="周(作业)会元折扣">
									{getFieldDecorator("weekzydis", {
										initialValue: this.props.checkconfig.weekzydis * 100,
										rules: [
											{
												required: true,
												message: "请输入周(作业)会元折扣"
											}
										]
									})(<InputNumber
                                    min={0}
                                    max={100}
                                    formatter={value => `${value}%`}
                                    parser={value => value.replace('%', '')}
                                    /> )}
								</FormItem>
							</Col>
						</Row>
						 
						<Row gutter={0}>
							<Col span={10} push={1}>
								<FormItem {...formItemLayout} labelCol={{span: 7}} label="月(作业)会员价格">
									{getFieldDecorator("monthzyvalue", {
										initialValue: this.props.checkconfig.monthzyvalue,
										rules: [
											{
												required: true,
												message: "请输入月(作业)会员价格"
											}
										]
									})(<Input placeholder="请输入月(作业)会员价格" />)}
								</FormItem>
							</Col>
							<Col span={10} push={1}>
								<FormItem {...formItemLayout} labelCol={{span: 7}}  label="月(作业)会元折扣">
									{
										getFieldDecorator("monthzydis", {
										initialValue: this.props.checkconfig.monthzydis * 100,
										rules: [
											{
												required: true,
												message: "请输入月(作业)会元折扣"
											}
										]
									})(<InputNumber
                                    min={0}
                                    max={100}
                                    formatter={value => `${value}%`}
                                    parser={value => value.replace('%', '')}
                                    /> )}
								</FormItem>
							</Col>
						</Row>
                        
						<Row gutter={0}>
							<Col span={10} push={1}>
								<FormItem {...formItemLayout} labelCol={{span: 7}} label="季(作业)会员价格">
									{getFieldDecorator("sessionzyvalue", {
										initialValue: this.props.checkconfig.sessionzyvalue,
										rules: [
											{
												required: true,
												message: "请输入季(作业)会员价格"
											}
										]
									})(<Input placeholder="请输入季(作业)会员价格" />)}
								</FormItem>
							</Col>
							<Col span={10} push={1}>
								<FormItem {...formItemLayout} labelCol={{span: 7}}  label="季(作业)会元折扣">
									{
										getFieldDecorator("sessionzydis", {
										initialValue: this.props.checkconfig.sessionzydis * 100,
										rules: [
											{
												required: true,
												message: "请输入季(作业)会元折扣"
											}
										]
									})(<InputNumber
                                    min={0}
                                    max={100}
                                    formatter={value => `${value}%`}
                                    parser={value => value.replace('%', '')}
                                    /> )}
								</FormItem>
							</Col>
						</Row>
                         <Row gutter={0}>
							<Col span={10} push={1}>
								<FormItem {...formItemLayout} labelCol={{span: 7}} label="充值折扣(>1000)">
									{getFieldDecorator("rechargedis", {
										initialValue: this.props.checkconfig.rechargedis*100,
									})( <InputNumber
											min={0}
											max={100}
											formatter={value => `${value}%`}
											parser={value => value.replace('%', '')}
											/> )
									}
								</FormItem>
							</Col>
							<Col span={10} push={1}>
								 <FormItem {...formItemLayout} labelCol={{span: 7}} label="充值折扣(1000-500)">
									{
										getFieldDecorator("rechargedisone", {
										initialValue: this.props.checkconfig.rechargedisone*100,
									})( <InputNumber
											min={0}
											max={100}
											formatter={value => `${value}%`}
											parser={value => value.replace('%', '')}
											/> )
									}
								</FormItem>
							</Col>
								<Col span={10} push={1}>
								 <FormItem {...formItemLayout} labelCol={{span: 7}} label="充值折扣(<=500)">
									{
										getFieldDecorator("rechargedistwo", {
										initialValue: this.props.checkconfig.rechargedistwo*100,
									})( <InputNumber
											min={0}
											max={100}
											formatter={value => `${value}%`}
											parser={value => value.replace('%', '')}
											/> )
									}
								</FormItem>
							</Col>
						</Row>
					</Form> 
				</div>
			)
	}
}
export default createForm()(Config);