webpackJsonp([0],{2066:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.mtype=["储值用户","日卡会员","周卡会员","月卡会员","季卡会员"],t.mstate=["正常","欠费","停用"],t.ostate=["预定","正在使用","使用完成","过期"],t.astate=["收入","消费"],t.atype=["普通","充值","办卡","优惠卡"]},2103:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.updates=t.querylist=t.addaccournt=void 0;var n=r(194),u=a(n),s=r(389),c=a(s),d=(t.addaccournt=function(){var e=(0,c.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,d.request)({url:"/api/restql/Base_Accounts",method:"POST",data:t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.querylist=function(){var e=(0,c.default)(u.default.mark(function e(t,r,a){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,d.request)({url:"/api/accounts/getaccountslist?page="+t+"&pageSize="+r,method:"POST",data:a}));case 1:case"end":return e.stop()}},e,this)}));return function(t,r,a){return e.apply(this,arguments)}}(),t.updates=function(){var e=(0,c.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,d.request)({url:"/api/restql/Base_Accounts/"+t.oid,method:"put",data:t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),r(92))},2155:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.loadsingle=t.update=void 0;var n=r(194),u=a(n),s=r(389),c=a(s),d=(t.update=function(){var e=(0,c.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,d.request)({url:"/api/restql/Base_Config/"+t.cid,method:"put",data:t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.loadsingle=function(){var e=(0,c.default)(u.default.mark(function e(t){var r,a;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.id||0,a="/api/restql/Base_Config/"+r,e.abrupt("return",(0,d.request)({url:a,method:"get"}));case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),r(92))},2156:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.getusrmsg=t.update=t.loadmemberbyphone=t.loadmemeber=t.querylist=t.register=void 0;var n=r(194),u=a(n),s=r(389),c=a(s),d=(t.register=function(){var e=(0,c.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,d.request)({url:"/api/restql/Base_Member",method:"POST",data:t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.querylist=function(){var e=(0,c.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,d.request)({url:"/api/member/getmemberlist",method:"POST",data:t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.loadmemeber=function(){var e=(0,c.default)(u.default.mark(function e(t){var r,a;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.id||0,a="/api/member/getsinglemember/"+r,e.abrupt("return",(0,d.request)({url:a,method:"get"}));case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.loadmemberbyphone=function(){var e=(0,c.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,d.request)({url:"/api/restql/Base_Member",method:"GET",data:t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.update=function(){var e=(0,c.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,d.request)({url:"/api/restql/Base_Member/"+t.mid,method:"put",data:t}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.getusrmsg=function(){var e=(0,c.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,d.request)({url:"/api/wechat/getusr/"+t.code,method:"get"}));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),r(92))},51:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=r(194),u=a(n),s=r(4),c=a(s),d=r(2156),o=r(2103),i=r(2155),p=(r(399),r(58),r(255)),l=(a(p),r(9)),m=a(l),f=r(836),h=r(127),b=r(2066);t.default={namespace:"member",state:{mobilemsg:"",loginuser:{},checkmember:{},memberlist:[],resultmsg:"您还不是我们的会员，请到店体验吧！我们的位置：北京市海淀区北四环西路68号6层。",pagination:{current:1,pageSize:10,total:0}},reducers:{updateState:function(e,t){var r=t.payload;return(0,c.default)({},e,r)},loaddataSuccess:function(e,t){var r=t.payload.data;return(0,c.default)({},e,{memberlist:r.data.record,pagination:{current:t.payload.current,pageSize:t.payload.pageSize,total:r.data.totalRecord||0}})}},subscriptions:{},effects:{getusrbyphone:u.default.mark(function e(t,r){var a,n=t.payload,s=r.call,c=(r.out,r.put);return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s(d.querylist,{phonenum:n.phone});case 2:if(a=e.sent,!a.success||0===a.data.record.length){e.next=10;break}return e.next=6,c({type:"updateState",payload:{loginuser:{member:a.data.record[0]}}});case 6:return e.next=8,c(h.routerRedux.push({pathname:"/mobile/"+n.routerid}));case 8:e.next=12;break;case 10:return e.next=12,c(h.routerRedux.push({pathname:"/mobile/result/false/认证失败"}));case 12:case"end":return e.stop()}},e,this)}),getusrmsg:u.default.mark(function e(t,r){var a,n=t.payload,s=r.call,c=r.put;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s(d.getusrmsg,n);case 2:if(a=e.sent,!a.success){e.next=11;break}return e.next=6,c({type:"updateState",payload:{loginuser:a.data}});case 6:if(!a.data.ismember){e.next=9;break}return e.next=9,c(h.routerRedux.push({pathname:"/mobile/"+n.routerid}));case 9:e.next=12;break;case 11:mobilemsg="系统出现问题，请稍后再试";case 12:case"end":return e.stop()}},e,this)}),register:u.default.mark(function e(t,r){var a,n,s,c,o,i,p,l=t.payload,b=r.call,y=r.put,g=r.select;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g(function(e){return e.member});case 2:return a=e.sent,n=a.loginuser,s=null,e.next=7,b(d.loadmemberbyphone,{phonenum:l.phone});case 7:if(c=e.sent,0===c.data.record.length){e.next=18;break}return o=c.data.record[0],o.memberopenid=l.userInfo.openid,o.mregisttime=(0,m.default)(o.mregisttime).format("YYYY-MM-DD HH:mm:ss"),e.next=14,b(d.update,o);case 14:s=e.sent,n.member=o,e.next=26;break;case 18:return i={membercode:Math.random().toString(20).substr(2),memberopenid:l.userInfo.openid,mpd:0,mname:l.userInfo.nickname,phonenum:l.phone,mstate:0,mregisttime:(0,m.default)().format("YYYY-MM-DD HH:mm:ss"),mtype:0,mdesc:"",mmoney:0},e.next=21,b(d.register,i);case 21:return s=e.sent,e.next=24,b(d.loadmemberbyphone,{phonenum:l.phone});case 24:p=e.sent,n.member=p.data.record[0];case 26:if(!s.success){e.next=34;break}return e.next=29,y({type:"updateState",payload:{loginuser:n}});case 29:return f.Toast.info("注册成功",1),e.next=32,y(h.routerRedux.push({pathname:"/mobile/"+l.routerid}));case 32:e.next=35;break;case 34:f.Toast.info("注册失败，请稍后再试",1);case 35:case"end":return e.stop()}},e,this)}),getmemberlist:u.default.mark(function e(t,r){var a,n=t.payload,s=r.call,c=r.put;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s(d.querylist,n);case 2:return a=e.sent,e.next=5,c({type:"loaddataSuccess",payload:{data:a,current:n.page,pageSize:n.pageSize}});case 5:case"end":return e.stop()}},e,this)}),loadmember:u.default.mark(function e(t,r){var a,n=t.payload,s=r.call,c=r.put;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s(d.loadmemeber,n);case 2:if(!(a=e.sent)||!a.success){e.next=6;break}return e.next=6,c({type:"updateState",payload:{checkmember:a.data}});case 6:case"end":return e.stop()}},e,this)}),recharge:u.default.mark(function e(t,r){var a,n,s,c,p,l,f,h,y,g,v,x=t.payload,k=r.call,w=(r.put,r.select);return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=null,e.next=3,w(function(e){return e.member});case 3:return n=e.sent,s=n.checkmember,e.next=7,w(function(e){return e.productcard});case 7:return c=e.sent,p=c.productcardlist,l=x.callback,f={},e.next=13,k(i.loadsingle,{id:1});case 13:return h=e.sent,f.mid=s.mid,"1"===x.rechargetype?(y=parseInt(x.rechargevalue),y>1e3&&y<=2e3&&(y+=100),y>2e3&&y<=5e3&&(y+=200),y>5e3&&(y+=500),s.mtype=0,s.mregisttime=(0,m.default)().format("YYYY-MM-DD HH:mm:ss"),s.mmoney=parseInt(s.mmoney)+y,f.atype=1,f.amoney=parseInt(x.rechargevalue)*h.data.rechargedis,f.asmoney=parseInt(x.rechargevalue)*h.data.rechargedis,f.adesc="会员充值"):"2"===x.rechargetype?(s.mregisttime=x.cardusedate,s.mtype=parseInt(x.cardtype),f.atype=2,f.amoney="1"===x.cardtype?h.data.dayvalue:"2"===x.cardtype?h.data.weekvalue:"3"===x.cardtype?h.data.monthvalue:h.data.sessionvalue,f.asmoney="1"===x.cardtype?h.data.dayvalue:"2"===x.cardtype?h.data.weekvalue:"3"===x.cardtype?h.data.monthvalue:h.data.sessionvalue,f.adesc=b.mtype[x.cardtype]):(g=p.find(function(e){return e.pcid===parseInt(x.pctype)}),s.mpd=g.pcid,s.mregisttime=(0,m.default)(s.mregisttime).format("YYYY-MM-DD HH:mm:ss"),f.atype=3,f.amoney=g.value,f.asmoney=g.value,f.adesc=g.pcname),f.atime=(0,m.default)().format("YYYY-MM-DD HH:mm:ss"),f.astate=0,delete s.pcname,delete s.btime,delete s.etime,delete s.isused,delete s.pcdesc,delete s.value,e.next=26,k(d.update,s);case 26:return a=e.sent,e.next=29,k(o.addaccournt,f);case 29:v=e.sent,l&&l(a);case 31:case"end":return e.stop()}},e,this)}),savemember:u.default.mark(function e(t,r){var a,n,s,c=t.payload,o=r.call;r.put;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(a=null,n=null,s=c.callback,delete c.callback,c.param.mpd=0,!c.param.id){e.next=13;break}return c.param.mid=c.param.id,c.param.mregisttime=(0,m.default)(c.param.mregisttime).format("YYYY-MM-DD HH:mm:ss"),delete c.param.id,e.next=10,o(d.update,c.param);case 10:a=e.sent,e.next=19;break;case 13:return c.param.membercode=Math.random().toString(20).substr(2),c.param.memberopenid="-",delete c.param.id,e.next=18,o(d.register,c.param);case 18:a=e.sent;case 19:s&&s(a);case 20:case"end":return e.stop()}},e,this)})}},e.exports=t.default}});