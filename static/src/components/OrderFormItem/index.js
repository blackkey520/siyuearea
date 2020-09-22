import React from 'react'
import {
	Input,
	Form,
	Button,
	Spin,
	Icon,
	message,
	Radio,
	Modal,
	Tabs
} from "antd";
import moment from "moment";
import {ostate,mstate,mtype,atype} from '../../utils/enum';
import { GetMoney,GetMoneyDetail } from '../../utils'
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;	
class OrderFormItem extends React.Component {
	 
	render() {
		const {content, ...props} = this.props;
const { getFieldDecorator } = this.props.form;

		const formItemLayout = {
			labelCol: { span: 3 },
			wrapperCol: { span: 12 }
		};
		if(this.props.recorddetail.rstate===0)
		{
			return(<Form style={{paddingTop:50}}>
						<FormItem {...formItemLayout} label="开始使用时间">
							{getFieldDecorator("btime", {
								initialValue: this.props.recorddetail.btime?moment(this.props.recorddetail.btime).format('YYYY-MM-DD HH:mm:ss'):'',//
							})( <Input disabled / > )
							}
						</FormItem>
						<FormItem {...formItemLayout} label="持续时间(小时)">
							{
								moment().diff(moment(this.props.recorddetail.btime), 'hours',true)
							}
						</FormItem>
						<FormItem {...formItemLayout} label="使用备注">
							{getFieldDecorator("pdesc", {
								initialValue: GetMoneyDetail(moment(this.props.recorddetail.btime), moment(this.props.recorddetail.etime),this.props.recorddetail.discount),
							})(
								<Input
									type="textarea"
                                    disabled
									autosize={{ minRows: 5, maxRows: 10 }}
								/>
							)}
						</FormItem>
					</Form>)
		}else{
			return (<Form style={{paddingTop:50}}>
		 
						<FormItem {...formItemLayout} label="开始使用时间">
							{getFieldDecorator("btime", {
								initialValue: this.props.recorddetail.btime?moment(this.props.recorddetail.btime).format('YYYY-MM-DD HH:mm:ss'):'',//
							})( <Input disabled / > )
							}
						</FormItem>
						<FormItem {...formItemLayout} label="结束使用时间">
							{getFieldDecorator("etime", {
								initialValue: this.props.recorddetail.etime?moment(this.props.recorddetail.etime).format('YYYY-MM-DD HH:mm:ss'):'',//
							})(<Input disabled / > )}
						</FormItem>
						{
							this.props.recorddetail.rstate === 0 ? <div > < FormItem { ...formItemLayout
							}
							label = "消费金额(元)" >
							{getFieldDecorator("money", {
								initialValue: this.props.recorddetail.money
							})(<Input disabled / > )}
						</FormItem><FormItem { ...formItemLayout
							}
							label = "使用明细" >
							{GetMoneyDetail(moment(this.props.recorddetail.btime), moment(this.props.recorddetail.etime),this.props.recorddetail.discount)}
						</FormItem></div>:null
						}
						<FormItem {...formItemLayout} label="持续时间(小时)">
							{
								Math.round(moment(this.props.recorddetail.etime).diff(moment(this.props.recorddetail.btime), 'hours', true))
							}
						</FormItem>
						<FormItem {...formItemLayout} label="使用备注">
							{getFieldDecorator("pdesc", {
								initialValue: GetMoneyDetail(moment(this.props.recorddetail.btime), moment(this.props.recorddetail.etime),this.props.recorddetail.discount),
							})(
								<Input
									type="textarea"
                                    disabled
									autosize={{ minRows: 5, maxRows: 10 }}
								/>
							)}
						</FormItem>
					</Form>)
		}
	}
}

export default OrderFormItem
