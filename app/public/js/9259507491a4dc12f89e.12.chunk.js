webpackJsonp([12],{1010:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u,n,r=a(289),o=l(r),i=a(10),s=l(i),d=a(218),p=l(d),c=a(5),m=l(c),f=a(15),h=l(f),y=a(7),b=l(y),v=a(6),_=l(v);a(290);var g=a(0),k=l(g),E=a(285),x=a(3625),N=l(x),T=a(144),F=(a(60),a(458),{module:"tableManager"}),C=(n=u=function(e){function t(e,a){return(0,m.default)(this,t),(0,b.default)(this,(t.__proto__||(0,p.default)(t)).call(this,e,a))}return(0,_.default)(t,e),(0,h.default)(t,[{key:"componentDidMount",value:function(){var e=this.props.match.params&&this.props.match.params.id,t=this.props.dispatch;e&&t({type:"tableForm/loadTable",payload:(0,s.default)({id:e},F)})}},{key:"componentWillUnmount",value:function(){this.props.dispatch({type:"tableForm/resetState"})}},{key:"goBack",value:function(){this.props.dispatch(T.routerRedux.push({pathname:"/tableManager"}))}},{key:"onSubmit",value:function(e){var t=this,a=o.default.loading("正在保存...",0);this.props.dispatch({type:"tableForm/saveTable",payload:(0,s.default)({},this.props,{template:e.template,cont:e.cont,template_name:e.template_name,status:e.status,time:e.time},F,{callback:function(e){a(),e&&e.success?(o.default.success("保存成功"),t.goBack()):o.default.error("保存失败")}})})}},{key:"render",value:function(){var e=this.props;return k.default.createElement(N.default,{template:e.template,cont:e.cont,template_name:e.template_name,status:e.status,seotitle:e.seotitle,time:e.time,onSubmit:this.onSubmit.bind(this)})}}]),t}(g.Component),u.contextTypes={router:g.PropTypes.object},n);t.default=(0,E.connect)(function(e){var t=e.tableForm,a=e.app;return(0,s.default)({},t,{content:t.con,uid:a.user.uid,name:a.user.name})})(C),e.exports=t.default},3625:function(e,t,a){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u,n,r=a(459),o=l(r),i=a(992),s=l(i),d=a(10),p=l(d),c=a(288),m=l(c),f=a(115),h=l(f),y=a(218),b=l(y),v=a(5),_=l(v),g=a(15),k=l(g),E=a(7),x=l(E),N=a(6),T=l(N),F=a(978),C=l(F);a(993),a(287),a(145),a(979);var D=a(0),M=l(D),P=(a(60),a(3)),B=(l(P),a(144)),R=a(285),S=a(458),O=(l(S),C.default.Item),w=(n=u=function(e){function t(){return(0,_.default)(this,t),(0,x.default)(this,(t.__proto__||(0,b.default)(t)).apply(this,arguments))}return(0,T.default)(t,e),(0,k.default)(t,[{key:"onSubmit",value:function(e){var t=this;e.preventDefault(),this.props.form.validateFields(function(e,a){e||(a.time=Date.parse(new Date)/1e3,t.props.onSubmit(a))})}},{key:"goBack",value:function(){this.props.dispatch(B.routerRedux.push({pathname:"/tableManager"}))}},{key:"render",value:function(){var e=this.props.form.getFieldDecorator,t={labelCol:{span:3},wrapperCol:{span:12}};return M.default.createElement("div",{className:"content-inner"},M.default.createElement("div",{style:{borderBottom:"1px solid #ddd",marginBottom:20,paddingBottom:10}},M.default.createElement(h.default,{style:{marginRight:10},onClick:this.goBack.bind(this)},"返回"),M.default.createElement(h.default,{type:"primary",onClick:this.onSubmit.bind(this)},"确认")),M.default.createElement(C.default,null,M.default.createElement(O,(0,p.default)({},t,{label:"模块"}),e("template",{initialValue:this.props.template,rules:[{required:!0,message:"请输入模块"}]})(M.default.createElement(m.default,{placeholder:"请输入模块"}))),M.default.createElement(O,(0,p.default)({},t,{label:"模块名称"}),e("template_name",{initialValue:this.props.template_name,rules:[{required:!0,message:"请输入模块名称"}]})(M.default.createElement(m.default,{placeholder:"请输入模块名称"}))),M.default.createElement(O,(0,p.default)({},t,{label:"状态"}),e("status",{valuePropName:"checked",initialValue:!!this.props.status})(M.default.createElement(s.default,{checkedChildren:"开",unCheckedChildren:"关"}))),M.default.createElement(O,(0,p.default)({},t,{label:"数据内容"}),e("cont",{initialValue:this.props.cont,rules:[{required:!0,message:"请输入模块数据内容"}]})(M.default.createElement(m.default,{type:"textarea",placeholder:'示例：[{"Field":"uid","Type":"int(10)","Null":"NO","Key":"PRI","Default":null,"Extra":"auto_increment"},{"Field":"name","Type":"varchar(20)","Null":"NO","Key":"UNI","Default":null,"Extra":""}]',autosize:{minRows:5,maxRows:10}})),M.default.createElement("div",{style:{color:"#666",marginTop:"10px",lineHeight:"18px"}},"示例：",(0,o.default)([{Field:"uid",Type:"int(10)",Null:"NO",Key:"PRI",Default:null,Extra:"auto_increment"},{Field:"name",Type:"varchar(20)",Null:"NO",Key:"UNI",Default:null,Extra:""}],null,2)))))}}]),t}(D.Component),u.contextTypes={router:D.PropTypes.object},u.defaultProps={template:"",cont:"",template_name:"",status:1,time:""},n);t.default=(0,R.connect)(function(e){e.tableManager;return{}})(C.default.create()(w)),e.exports=t.default}});