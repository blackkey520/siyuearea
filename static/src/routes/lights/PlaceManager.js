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
	Tabs,
    DatePicker,
    Modal
} from "antd";
import { config } from "../../utils/config";
import moment from "moment";
import {ostate,placetype} from '../../utils/enum';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;	
const TabPane = Tabs.TabPane;
import SiteMapSDWL from '../../components/SiteMapSDWL';
import SitMapDWL from '../../components/SitMapDWL';
import SitMap from '../../components/SitMap';
import locale from 'antd/lib/date-picker/locale/zh_CN';
const confirm = Modal.confirm;
@connect(({ place,loading, }) => ({
		placelist : place.placelist,
        placeloading : loading.effects['place/getplacelist'],
        selectPlace: place.selectPlace,
        selectRecord: place.selectRecord,
        akey: place.akey
 }))
class PlaceManager extends Component {
	static contextTypes = {
		router: PropTypes.object
	};
	constructor(props, context) {
        super(props, context);
        this.state={
            visible: false
        }
    }
    componentDidMount() {
        this.props.dispatch({ type: "place/getplacelist", payload: {  } });
	}
	placeClick=(placeid)=>{   
        let selectPlaces = this.props.placelist.find((item)=>{
            return item.pid == placeid
        });
        if (selectPlaces.pstate == 0 || selectPlaces.pstate == 4)
        {
            // selectPlaces.ptypen = placetype[selectPlaces.ptype];
            selectPlaces.pdescn = placetype[selectPlaces.pdesc];
            this.props.dispatch({ type: "place/placeload", payload: {selectPlace:selectPlaces} });
            this.setState({
                visible: true
            });
        }
        else{
          if(selectPlaces.pstate==2){
            const that=this;
            confirm({
              title: '请问您确定要关灯吗？',
              content: null,
              onOk() {
                that.props.dispatch({
                  type: "place/manualcloselight",
                  payload: {
                    selectPlace: selectPlaces
                  }
                });
              },
              okText :"确认",
              cancelText :"取消",
              onCancel() {
                 
              },
            });
          }else{
            message.error("请选择未使用、未预订的作为开台");
          }
        }
    }
    handleOk = () => {
        const form = this.props.form;
        form.validateFields((err, values) => {
 
            if (err) {
                return;
            }
            this.props.dispatch({
                type: "place/placehandle",
                payload: {
                    values
                }
            });

            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({
                visible: false
            });
        });
    }
	render() {  
        const { getFieldDecorator } = this.props.form;
          const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
		if(this.props.placeloading)
		{
			return ( <div style={{width:'100%',textAlign:'center',paddingTop:280}}><Spin/></div>)
		}
		return (
				<div className="content-inner">
                    <Tabs
                        activeKey={this.props.akey}
                        onChange={(activeKey)=>{
                          this.props.dispatch({
                            type: "place/updateState",
                            payload: {
                              akey: activeKey
                            }
                          });
                        }}
                        tabPosition={'left'}
                        style={{ height: 500 }}
                        >
                        <TabPane tab={
                          <span><Icon onClick={()=>{
                              this.props.dispatch({ type: "place/getplacelist", payload: {  } });
                            }}  type="reload" />中关村</span>
                        } key="1"><SitMap ref={(r)=>this.placemap=r} sitemap={this.props.placelist} placeClick={this.placeClick}  /></TabPane>
                        <TabPane  tab={
                          <span><Icon onClick={()=>{
                              this.props.dispatch({ type: "place/getplacelist", payload: {  } });
                            }} type="reload"/>大望路</span>
                        }  key="2"><SitMapDWL ref={(r)=>this.placemap=r} sitemap={this.props.placelist} placeClick={this.placeClick}  /></TabPane>
                          <TabPane  tab={
                          <span><Icon onClick={()=>{
                              this.props.dispatch({ type: "place/getplacelist", payload: {  } });
                            }} type="reload"/>大望路(自助)</span>
                        }  key="3"><SiteMapSDWL ref={(r)=>this.placemap=r} sitemap={this.props.placelist} placeClick={this.placeClick}  /></TabPane>
                         
                        </Tabs>
                        
					
						  <Modal
          visible={this.state.visible}
          title="人工开台"
          okText="确定"
          cancelText="关闭"
          onCancel={() => {
                this.setState({ visible: false });
            }}
          onOk={ this.handleOk}
        >
          <Form >
            <Form.Item label="座位信息">
              <div>
                  {
                      this.props.selectPlace != null ? `${this.props.selectPlace.pdescn}-${this.props.selectPlace.parea}-${this.props.selectPlace.pname}` : ''
                  }
              </div>
            </Form.Item>
             <Form.Item label="开台类型" className="collection-create-form_last-form-item">
              {getFieldDecorator('odrtype', {
                initialValue: this.props.selectRecord == null ? '0' : this.props.selectRecord.odrtype+'',
              })(
                <Radio.Group>
                  <Radio value="0">试用</Radio>
                  <Radio value="1">大众点评</Radio>
                  <Radio value="2">美团</Radio>
                  <Radio value="3">其他</Radio>
                </Radio.Group>
              )}
            </Form.Item>
            <Form.Item label="备注">
              {
                  getFieldDecorator('odrdesc', {
                      initialValue: this.props.selectRecord==null?'':this.props.selectRecord.odrdesc,
                  })( < Input type = "textarea" / > )           
              }
            </Form.Item>
           
          </Form>
        </Modal>
				</div>
			)
	}
}
export default createForm()(PlaceManager);