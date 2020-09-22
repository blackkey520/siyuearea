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
	DatePicker,
	Switch,
	Radio,
    Upload, Modal,
    message
} from "antd";
import {getBase64} from '../../utils' 
import {
	protype
} from '../../utils/enum';
const FormItem = Form.Item;
const TextArea = Input.TextArea;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
@connect(({ product,loading }) => ({
		checkproduct: product.checkproduct,
 }))
class ProductForm extends Component {
	static contextTypes = {
		router: PropTypes.object
	};

	constructor(props, context) {
		super(props, context);
		this.state = {
			loading: false,
			loadings: [false, false, false, false, false, false, false, false, false, false], 
		}
	}

	componentDidMount() {
		const id = this.props.match.params && this.props.match.params.id;
		 
	}

	componentWillUnmount() {
	 
	}

	goBack() {
		this.props.dispatch(routerRedux.push({ pathname: "/product" }));
	}

	onSubmit(e) {
		e.preventDefault();

		this.props.form.validateFields((err, values) => {
			if (err) {
				return;
			}  
			this.props.dispatch({
				type: "product/saveproduct",
				payload: {
					proid: this.props.match.params ? this.props.match.params.id : null,
						proname: values.proname,
						protype: values.protype,
					    promoney: values.promoney,
					    image: this.props.checkproduct.image,
						prodesc: values.prodesc,
						introduce: values.introduce,
						proimgdesc: this.props.checkproduct.proimgdescarray.join(',')
				}
			});
		});
	}
	renderImages=()=>{
			const uploadButton = (
      <div>
        {this.state.loading ? <Icon type="loading" /> : <Icon type="plus" />}
        <div className="ant-upload-text">上传</div>
      </div>
    );
		let rtnVal=[];
		this.props.checkproduct.proimgdescarray.map((item, key) => {
			rtnVal.push(<Upload
			key={key}
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="/uploadimg"  
        onChange={(info)=>{
             if (info.file.status === 'uploading') {
                
				 this.setState((prevState) => {
					 let loadings = prevState.loadings;
					 loadings[key]=true;
					 return ({
					 	loadings
					 });
				 });
                 return;
             }
             if (info.file.status === 'error') { 
				 this.setState((prevState) => {
				 	let loadings = prevState.loadings;
				 	loadings[key] = true;
				 	return ({
				 		loadings, 
				 	});
				 });
                 
                 message.success("图片已经存在");
                 return;
             }
             if (info.file.status === 'done') { 
				 this.props.dispatch({
				 	type: "product/updateState",
				 	payload: {
				 		image: info.file.name
				 	}
				 });
				 let checkproduct = this.props.checkproduct;
				 checkproduct.proimgdescarray[key] = info.file.name;
				 this.props.dispatch({
				 	type: "product/updateState",
				 	payload: {
				 		checkproduct
				 	}
				 });
				 this.setState((prevState) => {
				 	let loadings = prevState.loadings; 
				 	loadings[key] = false; 
				 	return ({
				 		loadings
				 	});
				 });
             }
        }}
      >
        {this.props.checkproduct.proimgdescarray[key]
		 ? <img src={`/public/upload/${this.props.checkproduct.proimgdescarray[key]}`} alt="avatar" style={{ width: '100%' }} /> 
		 : uploadButton}
      </Upload> );
		});
		return rtnVal;
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		const { previewVisible, previewImage } = this.state;
		

		const uploadButton = (
      <div>
        {this.state.loading ? <Icon type="loading" /> : <Icon type="plus" />}
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
						<FormItem {...formItemLayout} label="商品名称">
							{getFieldDecorator("proname", {
								initialValue: this.props.checkproduct.proname,
								rules: [
									{
										required: true,
										message: "请输入商品名称"
									}
								]
							})( <Input placeholder = "请输入商品名称" / > )
							}
						</FormItem>
						<FormItem {...formItemLayout} label="商品类别">
							 {getFieldDecorator("protype", {
								initialValue: this.props.checkproduct.protype ? this.props.checkmember.protype : 0
							})(
								<RadioGroup>
									{
										protype.map((item, key) => {
											 
												return (<RadioButton key={item} value={key}>{item}</RadioButton>)
											 
										})
									}
								</RadioGroup>
							)}
						</FormItem>
						
						 <FormItem {...formItemLayout} label="商品简介">
							{
								getFieldDecorator("introduce", {
								initialValue: this.props.checkproduct.introduce,
							})(
								<Input
									 
								/>
							)}
						</FormItem>
						<FormItem {...formItemLayout} label="价格(元)">
							{getFieldDecorator("promoney", {
								initialValue: this.props.checkproduct.promoney ? this.props.checkproduct.promoney : 0,
							})( <InputNumber  
    /> )
							}
						</FormItem>
						<FormItem {...formItemLayout}   label="封面图片">
							
  
       <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="/uploadimg"  
        onChange={(info)=>{
             if (info.file.status === 'uploading') {
                 this.setState({
                     loading: true
                 });
                 return;
             }
             if (info.file.status === 'error') { 
                 this.setState({
                    loading: false
                 });
                 message.success("图片已经存在");
                 return;
             }
             if (info.file.status === 'done') { 
				  let checkproduct = this.props.checkproduct;
				  checkproduct.image=info.file.name;
				this.props.dispatch({
					type: "product/updateState",
					payload: {
						checkproduct
					}
				});
                 this.setState({
                     loading: false,
                 });
             }
        }}
      >
        {this.props.checkproduct.image ? <img src={`/public/upload/${this.props.checkproduct.image}`} alt="avatar" style={{ width: '100%' }} /> 
		:uploadButton}
      </Upload> 
						</FormItem>
						 <FormItem {...formItemLayout}   label="商品图片">
							 <div style={{display:'flex',flexDirection:'row',width:'100%'}}>
							  
		{
			this.renderImages()
		}
       </div>
						</FormItem>
						<FormItem {...formItemLayout} label="商品说明">
							{getFieldDecorator("prodesc", {
								initialValue: this.props.checkproduct.prodesc,
							})(
								<TextArea
									type="textarea" 
								/>
							)}
						</FormItem>
					</Form> 
				</div>
			)
	}
}
export default createForm()(ProductForm);