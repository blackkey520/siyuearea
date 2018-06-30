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
	DatePicker,
	Switch,
	Radio,
	Upload, Modal
} from "antd";
import moment from "moment";

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;


@connect(({ productcard,loading }) => ({
		checkproductcard: productcard.checkproductcard,
		formloading: loading.effects['member/loadproductcard'],
		imglist: productcard.imglist
 }))
class ProductCardForm extends Component {
	static contextTypes = {
		router: PropTypes.object
	};

	constructor(props, context) {
		super(props, context);
		this.state = {
			previewVisible: false,
			previewImage: '',
			fileList: [{
				uid: -1,
				name: 'xxx.png',
				status: 'done',
				url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
			}],
		};
	}

	componentDidMount() {
		const id = this.props.match.params && this.props.match.params.id;
		const { dispatch } = this.props;

		if (id) {
			dispatch({ type: "productcard/loadproductcard", payload: { id } });
		}
	}

	componentWillUnmount() {
		this.props.dispatch({
			type: "productcard/updateState",payload:{checkproductcard:{}}
		});
	}

	goBack() {
		this.props.dispatch(routerRedux.push({ pathname: "/productcard" }));
	}

	onSubmit(e) {
		e.preventDefault();

		this.props.form.validateFields((err, values) => {
			if (err) {
				return;
			}
			const hide = message.loading("正在保存...", 0);
			this.props.dispatch({
				type: "productcard/saveproductcard",
				payload: {
					param:{
						id: this.props.match.params ? this.props.match.params.id : null,
						pcname: values.pcname,
						btime: values.time[0],
						etime: values.time[1],
						value: values.value,
						pcdesc: values.pcdesc,
						isused: values.isused,
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
		const { previewVisible, previewImage } = this.state;
		

		const uploadButton = (
			<div>
				<Icon type="plus" />
				<div className="ant-upload-text">上传</div>
			</div>
		);
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
						<Button type="primary" onClick={this.onSubmit.bind(this)}>
							确认
						</Button>
					</div>

					<Form>
						<FormItem {...formItemLayout} label="优惠券名称">
							{getFieldDecorator("pcname", {
								initialValue: this.props.checkproductcard.pcname,
								rules: [
									{
										required: true,
										message: "请输入优惠券名称"
									}
								]
							})( <Input placeholder = "请输入优惠券名称" / > )
							}
						</FormItem>
						<FormItem {...formItemLayout} label="有效时间">
							{getFieldDecorator("time", {
								initialValue: [moment(this.props.checkproductcard.btime), moment(this.props.checkproductcard.etime)],
								rules: [
									{
										required: true,
										message: ['请选择有效时间']
									}
								]
							})(<RangePicker />)}
						</FormItem>
						 
						<FormItem {...formItemLayout} label="价格(元)">
							{getFieldDecorator("value", {
								initialValue: this.props.checkproductcard.value ? this.props.checkproductcard.value : 0,
							})( <Input   / > )
							}
						</FormItem>
						<FormItem {...formItemLayout} label="封面图片">
							 <div className="clearfix">
								<Upload
								action="//jsonplaceholder.typicode.com/posts/"
								listType="picture-card"
								fileList={this.props.imglist}
								onPreview = {
									(file) => {
										this.setState({
											previewImage: file.url || file.thumbUrl,
											previewVisible: true,
										});
									}
								}
								onChange={({ fileList }) => {
								 
										this.props.dispatch({
											type: "productcard/updateState",
											payload: {
												imglist: fileList
											}
										});
								}}
								>
								{this.props.imglist.length >= 1 ? null :uploadButton }
							 
								</Upload>
								<Modal visible={previewVisible} footer={null} onCancel={() => this.setState({ previewVisible: false })}>
								<img alt="example" style={{ width: '100%' }} src={previewImage} />
								</Modal>
							</div>
						</FormItem>
						<FormItem {...formItemLayout} label="是否启用">
							{getFieldDecorator("isused", {
								initialValue: this.props.checkproductcard.isused
							})(<RadioGroup>
									<RadioButton  value={0}>停用</RadioButton>
									<RadioButton  value={1}>启用</RadioButton>
								</RadioGroup>)}
						</FormItem>
						<FormItem {...formItemLayout} label="备注">
							{getFieldDecorator("pcdesc", {
								initialValue: this.props.checkproductcard.pcdesc,
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
export default createForm()(ProductCardForm);