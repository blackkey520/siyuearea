webpackJsonp([55],{2339:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var s,u,l,i,o=a(974),r=n(o),d=a(10),g=n(d),c=a(218),f=n(c),p=a(5),h=n(p),v=a(15),m=n(v),b=a(7),y=n(b),_=a(6),D=n(_);a(975);var T=a(0),k=n(T),x=a(285),M=(a(60),a(3)),C=n(M),E=(a(144),(s=(0,x.connect)(function(e){var t=e.suggest,a=e.loading;return{suggestlist:t.suggestlist,suggestloading:a.effects["suggest/getsuggestlist"],pagination:t.pagination}}))((i=l=function(e){function t(e,a){(0,h.default)(this,t);var n=(0,y.default)(this,(t.__proto__||(0,f.default)(t)).call(this,e,a));return n.state={record:null},n}return(0,D.default)(t,e),(0,m.default)(t,[{key:"componentDidMount",value:function(){this.loadTableData()}},{key:"loadTableData",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10;this.props.dispatch({type:"suggest/getsuggestlist",payload:{page:e,pageSize:t}})}},{key:"tableChange",value:function(e){this.loadTableData(e.current,e.pageSize)}},{key:"render",value:function(){var e=(0,g.default)({showTotal:function(e){return"共"+e+"条数据"}},this.props.pagination),t=[{title:"姓名",dataIndex:"mname",render:function(e){return k.default.createElement("a",{href:"javascript:;"},e)}},{title:"建议时间",dataIndex:"stime",render:function(e){return k.default.createElement("span",null,(0,C.default)(e).format("YYYY-MM-DD HH:mm:ss"))}},{title:"建议内容",dataIndex:"sdesc"}];return k.default.createElement("div",{className:"content-inner"},k.default.createElement(r.default,{columns:t,pagination:e,dataSource:this.props.suggestlist,rowKey:"pcid",loading:this.props.suggestloading,bordered:!0,onChange:this.tableChange.bind(this)}))}}]),t}(T.Component),l.contextTypes={router:T.PropTypes.object},u=i))||u);t.default=E,e.exports=t.default}});