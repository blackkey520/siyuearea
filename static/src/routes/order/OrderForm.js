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
    Modal
} from "antd";
import Result from "../../components/Result"
import { config } from "../../utils/config";
import moment from "moment";
import {ostate} from '../../utils/enum';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;	
import SitMap from '../../components/SitMap';

@connect(({place,order, loading}) => ({
	placelist : place.placelist,
        errormsg : order.errormsg,
        orderdetail : order.orderdetail,
        recordsdetail:order.recordsdetail,
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
			pdesc:''
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
                    visible:true
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
                            ?<Button type="primary" onClick={this.CreateRecord.bind(this)}>
                                    开台
                                </Button>:this.props.orderdetail.ostate===1?
                                <Button type="primary" onClick={this.StopRecord.bind(this)}>
                                    离店收费
                                </Button>:null
                        }
					</div>
					<div
						style={{
							borderBottom: "1px solid #ddd",
							marginBottom: 20,
							paddingBottom: 10,
							marginLeft:20,
							width:'95%'
						}}
					>
					订单信息
					</div>
					<SitMap selectPid={this.props.orderdetail.pid} sitemap={this.props.placelist} style={{paddingLeft:80,paddingBottom:50}}/>
					<Form>
						<FormItem {...formItemLayout} label="会员名称">
							{getFieldDecorator("mname", {
								initialValue: this.props.orderdetail.mname,
							})(<Input disabled / > )}
						</FormItem>
						<FormItem {...formItemLayout} label="订单状态">
							{getFieldDecorator("ostate", {
								initialValue: ostate[this.props.orderdetail.ostate]
							})(<Input disabled / > )}
						</FormItem>
						<FormItem {...formItemLayout} label="预定时间">
							{getFieldDecorator("otime", {
								initialValue: this.props.orderdetail.mregisttime ? this.props.orderdetail.mregisttime : moment().format('YYYY-MM-DD HH:mm:ss'),
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
					</Form>
                    {
                        this.props.orderdetail.ostate!==0&&this.props.orderdetail.ostate!==3?
                        <div><div
						style={{
							borderBottom: "1px solid #ddd",
							marginBottom: 20,
							paddingBottom: 10,
							marginLeft:20,
							width:'95%'
						}}
					>
					使用信息
					</div>
						<Form>
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
						<FormItem {...formItemLayout} label="收款金额(元)">
							{getFieldDecorator("money", {
								initialValue: this.props.recordsdetail.money
							})(<Input disabled / > )}
						</FormItem>
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
					</Form></div>:null
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
					>
						<div style={{fontSize:15,paddingBottom:15}}>请问您确定在<span style={{color:'red',fontWeight: 'bold'}}>
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