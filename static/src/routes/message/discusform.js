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
} from "antd";
import {getBase64} from '../../utils' 

const FormItem = Form.Item;


@connect(({ message,loading }) => ({
		checkcommunity: message.checkcommunity,
 }))
class CommunityForm extends Component {
	static contextTypes = {
		router: PropTypes.object
	};

	constructor(props, context) {
		super(props, context);
		this.state = {
            loading: false, 
		}
	}

	componentDidMount() {
	 
	}

	componentWillUnmount() {
		this.props.dispatch({
			type: "message/updateState", payload: {
			    checkcommunity: {}
			}
		});
	}

	goBack() {
		this.props.dispatch(routerRedux.push({ pathname: "/discus" }));
	}

	onSubmit(e) {
		e.preventDefault();

		this.props.form.validateFields((err, values) => {
			if (err) {
				return;
            } 
			this.props.dispatch({
				type: "message/addcommunity",
				payload: {
					communityid: this.props.match.params ? this.props.match.params.id : null,
					    communityname: values.communityname,
					    communitydesc: values.communitydesc,
					    communityimg: this.props.checkcommunity.communityimg
				}
			});
		});
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
						<FormItem {...formItemLayout} label="社区名称">
							{
							    getFieldDecorator("communityname", {
								initialValue: this.props.checkcommunity.communityname,
								rules: [
									{
										required: true,
										message: "请输入社区名称"
									}
								]
							})( < Input placeholder = "请输入社区名称" / > )
							}
						</FormItem>
						 
					 
						<FormItem {...formItemLayout}   label="封面图片">
							  
  
       <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action = "/uploadimg"
        onChange={(info)=>{
             if (info.file.status === 'uploading') {
                 this.setState({
                     loading: true
                 });
                 return;
             }
             if (info.file.status === 'error') { 
                 this.setState({
                    loading: false,
                 });
                 message.success("图片已经存在");
                 return;
             }
             if (info.file.status === 'done') { 
				   let checkcommunity = this.props.checkcommunity;
				   checkcommunity.communityimg = info.file.name;
				   this.props.dispatch({
				   	type: "message/updateState",
				   	payload: {
				   		checkcommunity
				   	}
				   });
                 this.setState({ 
                     loading: false,
                 });
             }
        }}
      >
        {this.props.checkcommunity.communityimg ? <img src={`/public/upload/${this.props.checkcommunity.communityimg}`} alt="avatar" style={{ width: '100%' }} />  : uploadButton}
      </Upload> 
						</FormItem>
						 
						<FormItem {...formItemLayout} label="社区说明">
							{getFieldDecorator("communitydesc", {
								initialValue: this.props.checkcommunity.communitydesc,
							})(
								<Input
									type="textarea" 
								/>
							)}
						</FormItem>
					</Form> 
				</div>
			)
	}
}
export default createForm()(CommunityForm);