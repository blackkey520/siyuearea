webpackJsonp([39],{1866:function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n,d,l,u,o=a(799),c=r(o),i=a(125),p=r(i),s=a(42),f=r(s),m=a(1),h=r(m),y=a(188),g=r(y),v=a(2),b=r(v),E=a(6),x=r(E),_=a(4),k=r(_),C=a(3),D=r(C),M=a(243),T=r(M);a(800),a(153),a(126),a(152);var I=a(0),S=r(I),j=a(242),Y=(a(56),a(7)),w=r(Y),B=a(124),P=(a(1895),T.default.Search,(n=(0,j.connect)(function(e){var t=e.productcard,a=e.loading;return{productcardlist:t.productcardlist,productcardloading:a.effects["productcard/getproductcardlist"],pagination:t.pagination}}))((u=l=function(e){function t(e,a){(0,b.default)(this,t);var r=(0,k.default)(this,(t.__proto__||(0,g.default)(t)).call(this,e,a));return r.state={record:null},r}return(0,D.default)(t,e),(0,x.default)(t,[{key:"componentDidMount",value:function(){this.loadTableData()}},{key:"loadTableData",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10;this.props.dispatch({type:"productcard/getproductcardlist",payload:{page:e,pageSize:t}})}},{key:"tableChange",value:function(e){this.loadTableData(e.current,e.pageSize)}},{key:"render",value:function(){var e=this,t=(0,h.default)({showTotal:function(e){return"共"+e+"条数据"}},this.props.pagination),a=[{title:"优惠卡名称",dataIndex:"pcname",render:function(e){return S.default.createElement("a",{href:"javascript:;"},e)}},{title:"开始时间",dataIndex:"btime",render:function(e){return S.default.createElement("span",null,(0,w.default)(e).format("YYYY-MM-DD HH:mm:ss"))}},{title:"简述",dataIndex:"etime",render:function(e){var t=(0,w.default)(e).diff((0,w.default)(),"days",!1);return t>0?S.default.createElement("span",null,"还有",S.default.createElement("span",{style:{color:"red"}},t),"天过期"):S.default.createElement("span",{style:{color:"red"}},"已经过期")}},{title:"价格",dataIndex:"value"},{title:"状态",dataIndex:"isused",render:function(e){return S.default.createElement("span",null,0===e?"停用":"启用")}},{title:"操作",render:function(t,a,r){return S.default.createElement("div",null,S.default.createElement(p.default,{style:{marginLeft:8},onClick:function(){e.props.dispatch(B.routerRedux.push({pathname:"/productcard/edit/"+a.pcid}))}},S.default.createElement(f.default,{type:"bars"}),"编辑"))}}];return S.default.createElement("div",{className:"content-inner"},S.default.createElement("div",{style:{paddingBottom:10,marginBottom:20,borderBottom:"1px solid #ddd"}},S.default.createElement(p.default,{onClick:function(){e.props.dispatch(B.routerRedux.push({pathname:"/productcard/create"})),e.props.dispatch({type:"productcard/updateState",payload:{imglist:[]}})},style:{marginLeft:10}},"新增优惠卡")),S.default.createElement(c.default,{columns:a,pagination:t,dataSource:this.props.productcardlist,rowKey:"pcid",loading:this.props.productcardloading,bordered:!0,onChange:this.tableChange.bind(this)}))}}]),t}(I.Component),l.contextTypes={router:I.PropTypes.object},d=u))||d);t.default=P,e.exports=t.default},1895:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.mtype=["储值用户","日卡会员","周卡会员","月卡会员","季卡会员","半年卡会员","年卡会员","周卡（周末）","月卡（周末）","季卡（周末）","周卡（作业）","月卡（作业）","季卡（作业）"],t.mstate=["正常","欠费","停用"],t.ostate=["预订","正在使用","使用完成","过期"],t.astate=["会员变更","会员使用"],t.atype=["普通","会员操作","储物柜","会员消费","开门"],t.placetype=["","中关村","大望路","001号馆"],t.odrtype=["试用","大众点评","美团","其他"],t.placelist=["","中关村","大望路","001号馆"],t.ltype=["","普通（大）","普通（小）","自助"]}});