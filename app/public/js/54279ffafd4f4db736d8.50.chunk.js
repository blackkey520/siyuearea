webpackJsonp([50],{2334:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var s,l,i,u,o=a(455),d=n(o),r=a(289),c=n(r),g=a(973),f=n(g),p=a(115),h=n(p),m=a(10),b=n(m),v=a(218),k=n(v),y=a(5),w=n(y),C=a(15),x=n(C),S=a(7),T=n(S),_=a(6),D=n(_),E=a(287),M=n(E);a(456),a(290),a(974),a(145),a(286);var I=a(0),Y=n(I),j=a(285),z=(a(59),a(3)),H=n(z),O=(a(144),M.default.TextArea),P=(s=(0,j.connect)(function(e){var t=e.suggest,a=e.loading;return{suggestlist:t.suggestlist,suggestloading:a.effects["suggest/getsuggestlist"],pagination:t.pagination}}))((u=i=function(e){function t(e,a){(0,w.default)(this,t);var n=(0,T.default)(this,(t.__proto__||(0,k.default)(t)).call(this,e,a));return n.handleCancel=function(){n.setState({isshowsuggest:!1,selectitem:null})},n.state={record:null,isshowsuggest:!1,selectitem:null,feedback:""},n}return(0,D.default)(t,e),(0,x.default)(t,[{key:"componentDidMount",value:function(){this.loadTableData()}},{key:"loadTableData",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10;this.props.dispatch({type:"suggest/getsuggestlist",payload:{page:e,pageSize:t}})}},{key:"tableChange",value:function(e){this.loadTableData(e.current,e.pageSize)}},{key:"render",value:function(){var e=this,t=(0,b.default)({showTotal:function(e){return"共"+e+"条数据"}},this.props.pagination),a=[{title:"姓名",dataIndex:"mname",render:function(e){return Y.default.createElement("a",{href:"javascript:;"},e)}},{title:"建议时间",dataIndex:"stime",render:function(e){return Y.default.createElement("span",null,(0,H.default)(e).format("YYYY-MM-DD HH:mm:ss"))}},{title:"建议内容",dataIndex:"sdesc"},{title:"回复内容",dataIndex:"feedback"},{title:"操作",fixed:"right",width:150,render:function(t,a,n){return Y.default.createElement(h.default,{type:"primary",onClick:function(){e.setState({isshowsuggest:!0,selectitem:a})}},"回复")}}];return Y.default.createElement("div",{className:"content-inner"},Y.default.createElement(f.default,{columns:a,pagination:t,dataSource:this.props.suggestlist,rowKey:"pcid",loading:this.props.suggestloading,bordered:!0,onChange:this.tableChange.bind(this)}),Y.default.createElement(d.default,{title:"意见回复",width:"1000",onOk:function(){var t=c.default.loading("正在保存...",0);e.props.dispatch({type:"suggest/feedbackmsg",payload:{sid:e.state.selectitem.sid,feedback:e.state.feedback,callback:function(a){t(),a&&a.success?(e.loadTableData(e.props.pagination.current,e.props.pagination.pageSize),c.default.success("保存成功")):c.default.error("保存失败"),e.setState({selectitem:null,feedback:"",isshowsuggest:!1})}}})},visible:this.state.isshowsuggest,onCancel:this.handleCancel},Y.default.createElement(O,{value:this.state.feedback,onChange:function(t){e.setState({feedback:t.target.value})},rows:4})))}}]),t}(I.Component),i.contextTypes={router:I.PropTypes.object},l=u))||l;t.default=P,e.exports=t.default}});