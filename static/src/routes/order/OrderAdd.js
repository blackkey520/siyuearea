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
	DatePicker
} from "antd";
import { config } from "../../utils/config";
import moment from "moment";
import {ostate} from '../../utils/enum';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;	
import SitMap from '../../components/SitMap'
import locale from 'antd/lib/date-picker/locale/zh_CN';
@connect(({ place,loading, }) => ({
		placelist : place.placelist,
        placeloading : loading.effects['place/getplacelist'],
 }))
class OrderAdd extends Component {
	static contextTypes = {
		router: PropTypes.object
	};
	constructor(props, context) {
        super(props, context);
        this.state={
			desc:'',
			orderdate:moment().format('YYYY-MM-DD HH:mm:ss')
        }
    }
    componentDidMount() {
        this.props.dispatch({ type: "place/getplacelist", payload: {  } });
	}
	goBack() {
        this.props.dispatch(
			routerRedux.push({
				pathname: `/orderlist`
			})
		);
    }
	onSubmit(e) {
		let selectitem=this.placemap.getselectItem();
		if(selectitem)
		{	
			const hide = message.loading("正在保存...", 0);
				this.props.dispatch({
						type: "place/orderplace",
						payload: {
							mid: this.props.match.params.id,
								place: selectitem,
								desc:this.state.desc,
								orderdate:this.state.orderdate,
							callback: data => {
								hide();
								if (data && data.success) {
									message.success("保存成功");
									this.goBack();
								} else {
									message.error("该用户还有未完成的订单");
								}
							}
						}
					});
		}else{
			message.warning("请选择预订的工位");
		}
        
	}
	render() {
		if(this.props.placeloading)
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
                                    创建
                                </Button>
					</div>
					<SitMap ref={(r)=>this.placemap=r} sitemap={this.props.placelist}  />
						<DatePicker
							showTime
							format="YYYY-MM-DD HH:mm:ss"
							placeholder="请输入预订时间(不写则默认当前时间)"
							locale={locale} 
							 style={{marginTop:20,width:300}}
							onChange={(value, dateString)=>{
								this.setState({
									orderdate:dateString
								});
							}}
							/>
							<br/>
                        <Input
                            value={this.state.desc}
                            onChange={(e)=>{
                                const { value } = e.target;
                                        this.setState({ desc:value });
                            }}
							placeholder={'请输入备注'}
									type="textarea"
									autosize={{ minRows: 5, maxRows: 5 }}
									style={{width:600,marginTop:20}}
								/>
                    {/* 选择座位
                    {
                        this.props.match.params.id
                    } */}
				</div>
			)
	}
}
export default OrderAdd;