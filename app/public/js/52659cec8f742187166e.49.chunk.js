webpackJsonp([49],{2335:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var l,o,i=a(973),r=n(i),d=a(115),s=n(d),p=a(455),u=n(p),c=a(10),h=n(c),g=a(991),f=n(g),b=a(218),y=n(b),m=a(5),v=n(m),M=a(15),w=n(M),k=a(7),T=n(k),R=a(6),C=n(R);a(974),a(145),a(456),a(992);var x=a(0),K=n(x),E=a(285),_=(a(59),a(3)),S=(n(_),a(144)),z=[{title:"序号",dataIndex:"id"},{title:"模块",dataIndex:"template"},{title:"模块名称",dataIndex:"template_name"},{title:"状态",dataIndex:"status"},{title:"操作",width:150}],D={display:"inline-block",padding:"0 10px",cursor:"pointer"},I=(o=l=function(e){function t(e,a){(0,v.default)(this,t);var n=(0,T.default)(this,(t.__proto__||(0,y.default)(t)).call(this,e,a)),l=z.length;return z[l-1].render=function(e,t,a){return K.default.createElement("div",null,K.default.createElement("span",{onClick:n.toTableManagerForm.bind(n,t.id),style:D},"编辑"))},z[l-2].render=function(e,t){return K.default.createElement(f.default,{checked:!!e,onChange:n.changeTableManagerState.bind(n,t),checkedChildren:"开",unCheckedChildren:"关"})},n}return(0,C.default)(t,e),(0,w.default)(t,[{key:"componentDidMount",value:function(){this.loadTableData()}},{key:"loadTableData",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10;this.props.dispatch({type:"tableManager/loadTableManager",payload:{page:e,pageSize:t}})}},{key:"tableChange",value:function(e){this.loadTableData(e.current,e.pageSize)}},{key:"selectRow",value:function(e){this.props.dispatch({type:"tableManager/selectedRowKeys",payload:{selectedRowKeys:e}})}},{key:"toTableManagerForm",value:function(e){e?this.props.dispatch(S.routerRedux.push({pathname:"/tableManager/edit/"+e})):this.props.dispatch(S.routerRedux.push({pathname:"/tableManager/create"}))}},{key:"changeTableManagerState",value:function(e){console.log("switchChange",e);var t=e.status?0:1;this.props.dispatch({type:"tableManager/updateTableManager",payload:(0,h.default)({},e,{status:t,page:this.props.pagination.current,pageSize:this.props.pagination.pageSize})})}},{key:"deleteTableManager",value:function(){var e=this;this.props.selectedRowKeys.length>0?u.default.confirm({title:"确定要删除所选数据?",content:"点击确定，数据则被删除",onOk:function(){var t=[];e.props.list.forEach(function(a,n){-1!==e.props.selectedRowKeys.indexOf(a.id)&&t.push(a.template)}),e.props.dispatch({type:"tableManager/removeTableManager",payload:{selectedRowKeys:e.props.selectedRowKeys,templateArr:t}})}}):u.default.warning({title:"未选中任何数据",content:"请选择要删除的数据"})}},{key:"render",value:function(){var e={selectedRowKeys:this.props.selectedRowKeys,onChange:this.selectRow.bind(this)},t=(0,h.default)({showTotal:function(e){return"共"+e+"条数据"}},this.props.pagination);return K.default.createElement("div",{className:"content-inner"},K.default.createElement("div",{style:{paddingBottom:10,marginBottom:20,borderBottom:"1px solid #ddd"}},K.default.createElement(s.default,{onClick:this.toTableManagerForm.bind(this,0),style:{marginRight:10}},"新增"),K.default.createElement(s.default,{onClick:this.deleteTableManager.bind(this)},"删除")),K.default.createElement(r.default,{columns:z,rowSelection:e,pagination:t,dataSource:this.props.list,rowKey:"id",loading:this.props.loading,bordered:!0,onChange:this.tableChange.bind(this)}))}}]),t}(x.Component),l.contextTypes={router:x.PropTypes.object},o);t.default=(0,E.connect)(function(e){var t=e.tableManager;return{list:t.list,loading:t.loading,total:t.total,selectedRowKeys:t.selectedRowKeys,pagination:t.pagination}})(I),e.exports=t.default}});