import React, { Component, PropTypes } from "react";
import { connect } from "dva";
import { routerRedux } from "dva/router";
import { createForm } from 'rc-form';
import {
	Input,
	Form,
	Button,
	Spin,
	Alert,
    Radio,
	Modal,
	Tabs,
	Steps, Popover,
	message
} from "antd";

const Step = Steps.Step;
import Result from "../../components/Result"
import { config } from "../../utils/config";
import moment from "moment";
import {ostate,mstate,mtype} from '../../utils/enum';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;	
import OrderFormItem from '../../components/OrderFormItem';
import SitMap from '../../components/SitMap';
const TabPane = Tabs.TabPane;

@connect(({place,order, loading}) => ({
	placelist : place.placelist,
        errormsg : order.errormsg,
        orderdetail : order.orderdetail,
		recorddetail:order.recorddetail,
		memberdetail: order.memberdetail,
		formloading: loading.effects['order/loadorder']
 }))
class OrderForm extends Component {
	static contextTypes = {
		router: PropTypes.object
	};
	constructor(props, context) {
        super(props, context);
        this.state={
			visible:false,
			pdesc:'',
			show:0
		}
	}
	componentDidMount() {
        const oid = this.props.match.params && this.props.match.params.oid;
		this.props.dispatch({ type: "place/getplacelist", payload: {  } });
		const { dispatch } = this.props;
		if (oid) {
			dispatch({ type: "order/loadorder", payload: { oid } });
		}
	}
	goBack() {
        this.props.dispatch(
			routerRedux.push({
				pathname: `/orderlist`
			})
		);
    }
    StopRecord(){
			 this.props.dispatch(
			 	routerRedux.push({
			 		pathname: `/memberlist/orderrecord/${this.props.match.params.id}/${this.props.match.params.oid}/orderend`
			 	})
			 );
    }
    CreateOrder(){
		this.props.dispatch(
			routerRedux.push({
				pathname: `/memberlist/orderrecord/${this.props.match.params.id}/add`
			})
		);
    }
	CreateRecord(e) {
        	this.setState({
					visible:true,
                });
	}

	render() {
		const { getFieldDecorator } = this.props.form;

		const formItemLayout = {
			labelCol: { span: 3 },
			wrapperCol: { span: 12 }
		};
		let isdis = false;
		let message = null;
		const days = moment(this.props.memberdetail.mregisttime).diff(moment(), 'days', true);
		if (this.props.memberdetail.mpd==0&&days < 0) {
			isdis = true;
			if (this.props.orderdetail.ostate === 0) {
				message =<Alert message={'学习卡已经过期过期，不能开台，请充值、开卡或者延期'} type="error" /> ;
			}
		}
		if (this.props.memberdetail.mstate === 2) {
			isdis = true;
			message = <Alert message={'会员已经停用，不能开台，请吧会员状态改为启用'} type="error" />;
		}
		if (this.props.memberdetail.mtype === 7 || this.props.memberdetail.mtype === 8 || this.props.memberdetail.mtype === 9)
		{
			// if (moment().format('d') == 6 || moment().format('d') == 0)
			// {

			// }else{
			// 	isdis = true;
			// 	message = <Alert message={'您的会员卡只能在周六和周日使用'} type="error" />;
			// }
		}
		if (this.props.memberdetail.mtype === 10 || this.props.memberdetail.mtype === 11|| this.props.memberdetail.mtype === 12) {
			if (moment().hour() >= 6 && moment().hour() <= 8) {

			} else {
				isdis = true;
				message = <Alert message={'您的学习卡只能在六点到八点之间使用'} type="error" />;
			}
		}
        if(this.props.formloading)
        {
            return ( <div style={{width:'100%',textAlign:'center',paddingTop:280}}><Spin/></div>)
        }
        if(this.props.errormsg==='none')
        {
            return (
                 <Result
					type="error"
					title={'没有找到订单'}
					description={'该用户下未找到任何订单,点击返回按钮返回上一级,点击创建订单为该用户创建订单'}
					extra={''}
					actions={<div>
						<Button style={{ marginRight: 10 }} onClick={this.goBack.bind(this)}>返  回
						</Button>
						<Button type="primary" onClick={this.CreateOrder.bind(this)}>
							创建订单
						</Button></div>}
				/>
            )
        }else if(this.props.errormsg==='err'){
            return (
                 <Result
					type="error"
					title={'订单信息发生错误'}
					description={'该用户下的订单发生异常，请联系程序开发人员，后台解决'}
					extra={''}
					actions={<div>
						<Button style={{ marginRight: 10 }} onClick={this.goBack.bind(this)}>返  回
						</Button></div>}
				/>
            )
        }else{
            return (<div className="content-inner">
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
                        {
                            this.props.orderdetail.ostate===0
                            ?<Button type="primary" disabled={isdis} onClick={this.CreateRecord.bind(this)}>
                                    开台
                                </Button>:this.props.orderdetail.ostate===1?
                                <Button type="primary" onClick={this.StopRecord.bind(this)}>
                                    离店收费
                                </Button>:null
                        }
					</div>
					 
					<Steps  current={this.props.orderdetail.ostate} >
						<Step onClick={()=>{
							this.setState({
								show:0
							});
							}} title="预订" description={this.props.orderdetail.otime ? moment(this.props.orderdetail.otime).format('YYYY-MM-DD HH:mm:ss') : moment().format('YYYY-MM-DD HH:mm:ss')} />
						<Step onClick={()=>{
							if(this.props.orderdetail.ostate>0)
							{
								this.setState({
									show:1
								});
							}
							}} title="到店使用" description={this.props.recorddetail.btime?moment(this.props.recorddetail.btime).format('YYYY-MM-DD HH:mm:ss'):''} />
						<Step onClick={()=>{
							if(this.props.orderdetail.ostate>0)
							{
								this.setState({
									show:1
								});
							}
							}} title="订单完成" description={this.props.recorddetail.etime?moment(this.props.recorddetail.etime).format('YYYY-MM-DD HH:mm:ss'):''} />
					</Steps>
					{
						message
					}
					{
						this.state.show===0?
						<div  style={{paddingTop:50}}>
							<Form>
								<FormItem {...formItemLayout} label="订单状态">
									{getFieldDecorator("ostate", {
										initialValue: ostate[this.props.orderdetail.ostate]
									})(<Input disabled / > )}
								</FormItem>
								<FormItem {...formItemLayout} label="预订时间">
									{getFieldDecorator("otime", {
										initialValue: this.props.orderdetail.otime ? moment(this.props.orderdetail.mregisttime).format('YYYY-MM-DD HH:mm:ss') : moment().format('YYYY-MM-DD HH:mm:ss'),
									})( <Input disabled / > )
									}
								</FormItem>
								<FormItem {...formItemLayout} label="订单备注">
									{getFieldDecorator("mdesc", {
										initialValue: this.props.orderdetail.mdesc,
									})(
										<Input
											type="textarea"
											disabled
											autosize={{ minRows: 5, maxRows: 10 }}
										/>
									)}
								</FormItem>
								<FormItem {...formItemLayout} label="会员名称">
							{getFieldDecorator("mname", {
								initialValue: this.props.memberdetail.mname,
								rules: [
									{
										required: true,
										message: "请输入会员名称"
									}
								]
							})( <Input disabled placeholder = "请输入会员名称" / > )
							}
						</FormItem>
						<FormItem {...formItemLayout} label="电话号码">
							{getFieldDecorator("phonenum", {
								initialValue: this.props.memberdetail.phonenum,
								rules: [
									{
										required: true,
										message: "请输入电话号码"
									}
								]
							})(<Input disabled placeholder="请输入电话号码" />)}
						</FormItem>
						<FormItem {...formItemLayout} label="会员状态">
							{getFieldDecorator("mstate", {
								initialValue: this.props.memberdetail.mstate ? this.props.memberdetail.mstate : 0
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
							</Form>
						</div>
						:<OrderFormItem  {...this.props} />	
					}
					 
                    <Modal
					title="开台确定"
					visible={this.state.visible}
					onOk={()=>{
						const hide = message.loading("正在保存...", 0);
						this.setState({
							visible:false
						});
						const detail=this.props.orderdetail;
                        detail.pdesc=this.state.pdesc;
						const that=this;
						that.props.dispatch({ type: "order/addrecord", payload: { ...detail,callback: data => {
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
					><div style={{fontSize:15,paddingBottom:15}}>请问您确定在<span style={{color:'red',fontWeight: 'bold'}}>
							{moment().format('YYYY-MM-DD HH:mm:ss')}</span>为<span style={{fontWeight: 'bold'}}>
								{this.props.orderdetail.mname}</span>开台吗？</div>

						<Input
                            placeholder="输入备注信息"
                            value={this.state.pdesc}
                                    onChange={(e)=>{
                                        const { value } = e.target;
                                        this.setState({ pdesc:value });
                                    }}
									type="textarea"
									autosize={{ minRows: 5, maxRows: 10 }}
								/>
					</Modal>
				</div>)
        }
	}
}
export default createForm()(OrderForm);

const customDot = (dot, { status, index }) => (
  <Popover content={<span>step {index} status: {status}</span>}>
    {dot}
  </Popover>
);