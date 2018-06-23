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
import {ostate,mstate,mtype} from '../../utils/enum';
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
		return (<Form style={{paddingTop:50}}>
			<FormItem {...formItemLayout} label="消费方式">
							{this.props.recordsdetail.rstate === 0?'充值消费':'会员卡消费'}
						</FormItem>
						<FormItem {...formItemLayout} label="开始使用时间">
							{getFieldDecorator("btime", {
								initialValue: this.props.recordsdetail.btime?moment(this.props.recordsdetail.btime).format('YYYY-MM-DD HH:mm:ss'):'',//
							})( <Input disabled / > )
							}
						</FormItem>
						<FormItem {...formItemLayout} label="结束使用时间">
							{getFieldDecorator("etime", {
								initialValue: this.props.recordsdetail.etime?moment(this.props.recordsdetail.etime).format('YYYY-MM-DD HH:mm:ss'):'',//
							})(<Input disabled / > )}
						</FormItem>
						{
							this.props.recordsdetail.rstate === 0 ? < div > < FormItem { ...formItemLayout
							}
							label = "消费金额(元)" >
							{getFieldDecorator("money", {
								initialValue: this.props.recordsdetail.money
							})(<Input disabled / > )}
						</FormItem></div>:null
						}
						<FormItem {...formItemLayout} label="持续时间(小时)">
							{getFieldDecorator("timespan", {
								initialValue: moment(this.props.recordsdetail.etime).diff(moment(this.props.recordsdetail.btime),'hours'),
							})( <Input disabled / > )
							}
						</FormItem>
						<FormItem {...formItemLayout} label="使用备注">
							{getFieldDecorator("pdesc", {
								initialValue: this.props.recordsdetail.pdesc,
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

export default OrderFormItem
