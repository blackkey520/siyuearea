webpackJsonp([30],{1855:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r,d,l,u,o=a(878),c=n(o),i=a(159),p=n(i),s=a(49),f=n(s),m=a(1),h=n(m),g=a(239),y=n(g),v=a(2),b=n(v),E=a(6),x=n(E),_=a(4),k=n(_),C=a(3),D=n(C),M=a(294),T=n(M);a(879),a(183),a(160),a(182);var I=a(0),S=n(I),j=a(291),Y=(a(66),a(8)),w=n(Y),B=a(158),P=(a(1903),T.default.Search,(r=(0,j.connect)(function(e){var t=e.productcard,a=e.loading;return{productcardlist:t.productcardlist,productcardloading:a.effects["productcard/getproductcardlist"],pagination:t.pagination}}))((u=l=function(e){function t(e,a){(0,b.default)(this,t);var n=(0,k.default)(this,(t.__proto__||(0,y.default)(t)).call(this,e,a));return n.state={record:null},n}return(0,D.default)(t,e),(0,x.default)(t,[{key:"componentDidMount",value:function(){this.loadTableData()}},{key:"loadTableData",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10;this.props.dispatch({type:"productcard/getproductcardlist",payload:{page:e,pageSize:t}})}},{key:"tableChange",value:function(e){this.loadTableData(e.current,e.pageSize)}},{key:"render",value:function(){var e=this,t=(0,h.default)({showTotal:function(e){return"共"+e+"条数据"}},this.props.pagination),a=[{title:"优惠卡名称",dataIndex:"pcname",render:function(e){return S.default.createElement("a",{href:"javascript:;"},e)}},{title:"开始时间",dataIndex:"btime",render:function(e){return S.default.createElement("span",null,(0,w.default)(e).format("YYYY-MM-DD HH:mm:ss"))}},{title:"简述",dataIndex:"etime",render:function(e){var t=(0,w.default)(e).diff((0,w.default)(),"days",!1);return t>0?S.default.createElement("span",null,"还有",S.default.createElement("span",{style:{color:"red"}},t),"天过期"):S.default.createElement("span",{style:{color:"red"}},"已经过期")}},{title:"价格",dataIndex:"value"},{title:"状态",dataIndex:"isused",render:function(e){return S.default.createElement("span",null,0===e?"停用":"启用")}},{title:"操作",render:function(t,a,n){return S.default.createElement("div",null,S.default.createElement(p.default,{style:{marginLeft:8},onClick:function(){e.props.dispatch(B.routerRedux.push({pathname:"/productcard/edit/"+a.pcid}))}},S.default.createElement(f.default,{type:"bars"}),"编辑"))}}];return S.default.createElement("div",{className:"content-inner"},S.default.createElement("div",{style:{paddingBottom:10,marginBottom:20,borderBottom:"1px solid #ddd"}},S.default.createElement(p.default,{onClick:function(){e.props.dispatch(B.routerRedux.push({pathname:"/productcard/create"})),e.props.dispatch({type:"productcard/updateState",payload:{imglist:[]}})},style:{marginLeft:10}},"新增优惠卡")),S.default.createElement(c.default,{columns:a,pagination:t,dataSource:this.props.productcardlist,rowKey:"pcid",loading:this.props.productcardloading,bordered:!0,onChange:this.tableChange.bind(this)}))}}]),t}(I.Component),l.contextTypes={router:I.PropTypes.object},d=u))||d);t.default=P,e.exports=t.default},1903:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.mtype=["储值用户","日卡会员","周卡会员","月卡会员","季卡会员"],t.mstate=["正常","欠费","停用"],t.ostate=["预定","正在使用","使用完成","过期"],t.astate=["收入","消费"],t.atype=["普通","充值","办卡","优惠卡"]}});