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
} from "antd";
import Result from "../../components/Result";
import moment from "moment";
import { GetMoney,GetMoneyDetail } from '../../utils'
import {
	ostate,
	mstate,
	mtype
} from '../../utils/enum';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;	
const confirm = Modal.confirm;
import SitMap from '../../components/SitMap';

@connect(({ order,loading,place }) => ({
		errormsg : order.errormsg,
        orderdetail : order.orderdetail,
		recorddetail:order.recorddetail,
		memberdetail: order.memberdetail,
 }))
class OrderEnd extends Component {
	static contextTypes = {
		router: PropTypes.object
	};
	constructor(props, context) {
		super(props, context);
		this.state={
			money:0
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
				pathname: `/memberlist/orderrecord/${this.props.match.params.id}`
			})
		);
	}
	Recharge()
	{
		this.props.dispatch(
			routerRedux.push({
				pathname: `/memberlist/recharge/${this.props.orderdetail.mid}`
			})
		);
	}
	FinishRecord(e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (err) {
				return;
			}
			const hide = message.loading("正在保存...", 0);
			this.props.dispatch({
				type: "order/finishrecord",
				payload: {
					param:{
						oid: this.props.match.params ? this.props.match.params.oid : null,
						etime: values.etime,
						money: values.money,
						pdesc:values.pdesc,
					},
					record:{...this.props.recorddetail},
					order:{...this.props.orderdetail},
					callback: msg => {
						hide();
						if (msg==='success') {
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

 
		const formItemWiLayout = {
			labelCol: { span:2},
			wrapperCol: { span: 17}
        };
        if(this.props.errormsg==='success')
        {
            return (
                 <Result
                            type="success"
                            title={'操作成功'}
                            description={'该订单已经流转完成'}
                            extra={''}
                            actions={<div>
                                <Button style={{ marginRight: 10 }} onClick={this.goBack.bind(this)}>返  回
                                </Button></div>}
                        />
            )
        }else if(this.props.errormsg==='faild'){
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
        }else if(this.props.errormsg==='ordernotfound'){
            return (
                 <Result
                            type="error"
                            title={'订单没有找到'}
                            description={'该用户下的订单发生异常，请联系程序开发人员，后台解决'}
                            extra={''}
                            actions={<div>
                                <Button style={{ marginRight: 10 }} onClick={this.goBack.bind(this)}>返  回
                                </Button></div>}
                        />
            )
        } else if (this.props.errormsg === 'outofcardtime') {
            return (
                 <Result
                            type="error"
                            title={'您的会员卡已经到期'}
                            description={`您的${mtype[this.props.memberdetail.mtype]}已经到期`}
                            extra={''}
                            actions={<div>
                                <Button style={{ marginRight: 10 }} onClick={this.goBack.bind(this)}>返  回
                                </Button><Button type="primary" onClick={this.Recharge.bind(this)}>
                                    充值 / 充卡
                                </Button></div>}
                        />
            )
        }else if(this.props.errormsg==='outofmoney'){
            return (
                 <Result
                            type="error"
                            title={'余额不足'}
                            description={'该会员的余额不足'}
                            extra={''}
                            actions={<div>
                                <Button style={{ marginRight: 10 }} onClick={this.goBack.bind(this)}>返  回
                                </Button><Button type="primary" onClick={this.Recharge.bind(this)}>
                                    充值 / 充卡
                                </Button></div>}
                        />
            )
        }else{
			debugger;
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
                        <Button type="primary" onClick={this.FinishRecord.bind(this)}>
                                    完成
                                </Button>
					</div> 
					<Form style={{marginTop:15}}  	>
						<FormItem {...formItemWiLayout} label="开始时间">
							{getFieldDecorator("btime", {
								initialValue: this.props.recorddetail.btime?moment(this.props.recorddetail.btime).format('YYYY-MM-DD HH:mm:ss'):'',//
							})( <Input disabled / > )
							}
						</FormItem>
						<FormItem {...formItemWiLayout} label="结束时间">
							{getFieldDecorator("etime", {
								initialValue: moment().format('YYYY-MM-DD HH:mm:ss'),
							})(<Input disabled / > )}
						</FormItem>
					</Form>
					{
						this.props.memberdetail.mtype === 0?<Form style={{marginTop:15}}  	>
						<FormItem {...formItemWiLayout} label="收款金额(元)">
							{getFieldDecorator("money", {
								initialValue: GetMoney(moment(this.props.recorddetail.btime), moment())
							})(<Input   / > )}
						</FormItem>
						<FormItem {...formItemWiLayout} label="持续时间(小时)">
							{getFieldDecorator("timespan", {
								initialValue: Math.ceil(moment().diff(moment(this.props.recorddetail.btime),'hours',true)),
							})( <Input disabled / > )
							}
						</FormItem>
					</Form>:<Form style={{marginTop:15}}  	>
						<FormItem {...formItemWiLayout} label="会员类型">
							 {getFieldDecorator("mtype", {
								initialValue: this.props.memberdetail.mtype ? this.props.memberdetail.mtype : 0
							})(<RadioGroup disabled>
									{
										mtype.map((item, key) => {
											return (<RadioButton key={item} value={key}>{item}</RadioButton>)
										})
									}
								</RadioGroup>)}
						</FormItem>
					</Form>
					}
					<Form style={{marginTop:15}}>
						{this.props.memberdetail.mtype === 0?<FormItem {...formItemWiLayout} label="收款明细">
							{getFieldDecorator("pdetail", {
								initialValue: GetMoneyDetail(moment(this.props.recorddetail.btime), moment()),
							})(
								<Input
									type="textarea"
									autosize={{ minRows: 5, maxRows: 10 }}
								/>
							)}
						</FormItem>:null}
						<FormItem {...formItemWiLayout} label="使用备注">
							{getFieldDecorator("pdesc", {
								initialValue: this.props.recorddetail.pdesc,
							})(
								<Input
									type="textarea"
									autosize={{ minRows: 5, maxRows: 10 }}
								/>
							)}
						</FormItem>
					</Form>
					
				</div>)
        }
	}
}
export default createForm()(OrderEnd);