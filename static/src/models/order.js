import {add,addorder, queryorderlist, updateorder, queryrecordlist,updaterecord,getrecordcount} from "../services/order";
import {loadmemeber,update,loadmemeberdetail,updatememberdetail} from "../services/member";
import {
  updateplace,
  closelight,
  openlight
} from "../services/place";
import { addaccournt } from "../services/accournt";
import {
  mtype,
  memberlevelupdate,
  discount,
  mlevel
} from '../utils/enum';
import { parse } from "qs";
import { message } from "antd";
import Cookie from "../utils/js.cookie";
import moment from 'moment';
import {ListView} from 'antd-mobile';
const DataSource = ListView.DataSource;

export default {
  namespace: "order",
  state: {
    usestate:0,
    orderdetail:{},
    recorddetail:{},
    memberdetail:{},
    orderlist:[],
    selectedmobileorder:{},
    mobileorderlist:[],
    mobilemember:{},
    errormsg:'',
    pname:'',
    storetype:100,
    ostate:100,
    btime: moment(moment().add(-3, 'days').format('YYYY-MM-DD 00:00:00')),
    etime: moment(moment().format('YYYY-MM-DD 23:59:59')),
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0
    }
  },
  reducers: {
    updateState(state,{payload}) {
      return { ...state, ...payload };
    },
    loaddataSuccess(state, action) {
      const actionData = action.payload.data;
      return {
        ...state,
        orderlist: actionData.data.record,
        pagination: {
          current: action.payload.current,
          pageSize: action.payload.pageSize,
          total: actionData.data.totalRecord || 0
        }
      };
    },
    loaddataMobileSuccess(state, action) {
      const actionData = action.payload.data;
      return {
        ...state,
        mobileorderlist: action.payload.current !== 1 ? state.mobileorderlist.concat(actionData.data.record) : actionData.data.record,
        pagination: {
          current: action.payload.current,
          pageSize: action.payload.pageSize,
          total: actionData.data.totalRecord || 0
        }
      };
    }
  },
  subscriptions: {
  },
  effects: {
    *maddrecord({ payload }, { call, put }) { 
        const callback = payload.callback;
        const orderr=yield call(addorder,{
          pid: 1,
            ordercode: Math.random().toString(20).substr(2),
            mid: payload.mid,
            ostate:2,
            otime: moment().format('YYYY-MM-DD HH:mm:ss'),
            pdesc:'管理员手动添加订单'
        }); 
          const resultadd = yield call(add, {pid:1,
          mid:payload.mid,
          oid: orderr.data.uid,
          ostate:2,
          btime:moment().format('YYYY-MM-DD HH:mm:ss'),
          etime:moment().format('YYYY-MM-DD HH:mm:ss'),
          disid:1,
          discount:1,
          money:0,
          pdesc:'管理员手动添加订单'}); 
          const accournt = {};
          accournt.mid = payload.mid;
            accournt.atype = 1;
            accournt.amoney = 0;
            accournt.asmoney = 0;
            accournt.adesc = `管理员创建订单-学习卡消费`;
            if(payload.param.mtype>=7)
            {
              let begintime = moment(payload.param.mregisttime).add(-12, 'months').format('YYYY-MM-DD HH:mm:ss');
              let endtime = moment(payload.param.mregisttime).format('YYYY-MM-DD HH:mm:ss');
              let times=0;
              if (payload.param.mtype === 7) {
                times=2;
                begintime = moment(payload.param.mregisttime).add(-7,'days').format('YYYY-MM-DD HH:mm:ss');
                endtime = moment(payload.param.mregisttime).format('YYYY-MM-DD HH:mm:ss');
              }
              if (payload.param.mtype === 8) {
                times = 10;
              }
              if (payload.param.mtype === 9) {
                times = 20;
              }
              if (payload.param.mtype === 10) {
                times = 30;
              }
              if (payload.param.mtype === 11) {
                times = 50;
              }

                const data=yield call(getrecordcount,{
                  mid: payload.param.mid,btime:begintime,etime:endtime
                }); 
               accournt.adesc = `管理员创建订单-学习卡消费-已经使用${data.data.total+1}次，剩余${times-(data.data.total+1)}。`;
            }
            
              accournt.atime = moment().format('YYYY-MM-DD HH:mm:ss');
              accournt.astate = 1;
                    //记账
                    const accourntdata = yield call(addaccournt, accournt); 
        callback && callback(accourntdata);
    },
    *addrecord({ payload }, { call, put }) {
        const param={
          pid:payload.pid,
          mid:payload.mid,
          oid:payload.oid,
          ostate:0,
          btime:moment().format('YYYY-MM-DD HH:mm:ss'),
          etime:moment().format('YYYY-MM-DD HH:mm:ss'),
          disid:0,
          discount:1,
          money:0,
          pdesc:payload.pdesc
        }
        const callback = payload.callback;
        let data={};
        
         
        const result=yield call(updateorder,{
          oid:payload.oid,
          ostate:1
        });
        if(result.success)
        {
          const resultadd = yield call(add, param);
          if(resultadd.success)
          {
            yield call(openlight, payload);
             data=yield call(updateplace,{pid:payload.pid,pstate:2});
          }else{
            data.success=false;
          }
        }else{
          data.success=false;
        }
         callback && callback(data);
        yield put({
          type:'loadorder',
          payload:{
            oid:payload.oid
          }
        })
        
    },
    *finishrecord({ payload }, { call, put,select }) {
      yield put({
            type: "updateState",
            payload: {
              errormsg:'',
            }
          });
         let errormsg='';
         let disid=0;
          let { memberdetail } = yield select(state => state.order);
            const accournt = {};
            accournt.mid = memberdetail.mid;
             payload.param.money = payload.param.money * discount[memberdetail.mpd];
            const days = moment(memberdetail.mregisttime).diff(moment(), 'days', false);
             if (memberdetail.mtype > 0 && days > 0) {
              accournt.atype = 1;
              accournt.amoney = 0;
              accournt.asmoney = 0;
              accournt.adesc = `管理员结束订单-> ${ mtype[memberdetail.mtype]}学习卡消费`;
              disid=1;
              if(memberdetail.mtype>=7){
                 let begintime = moment(memberdetail.mregisttime).add(-12, 'months').format('YYYY-MM-DD HH:mm:ss');
                let endtime = moment(memberdetail.mregisttime).format('YYYY-MM-DD HH:mm:ss');
                let times=0;
                if (memberdetail.mtype === 7) {
                  times=2;
                  begintime = moment(memberdetail.mregisttime).add(-7,'days').format('YYYY-MM-DD HH:mm:ss');
                  endtime = moment(memberdetail.mregisttime).format('YYYY-MM-DD HH:mm:ss');
                }
                if (memberdetail.mtype === 8) {
                  times = 10;
                }
                if (memberdetail.mtype === 9) {
                  times = 20;
                }
                if (memberdetail.mtype === 10) {
                  times = 30;
                }
                if (memberdetail.mtype === 11) {
                  times = 50;
                }  
               const dataurecord = yield call(getrecordcount, {
                  mid: memberdetail.mid,btime:begintime,etime:endtime
                });
                debugger;
                accournt.adesc+=`已经使用${dataurecord.data.total+1}次，剩余${times-(dataurecord.data.total+1)}。`
              }
             }else{ 
              if (memberdetail.mmoney >= payload.param.money) {
                accournt.atype = 1;
                accournt.amoney = memberdetail.mmoney;
                accournt.asmoney = parseFloat(memberdetail.mmoney) - parseFloat(payload.param.money);
                accournt.adesc = `管理员结束订单->肆阅币消费 ${payload.param.money} 元，会员等级${mlevel[memberdetail.mpd]},会员折扣${discount[memberdetail.mpd]}`;
 
                yield call(update, {
                  mid: memberdetail.mid,
                  mmoney: parseFloat(memberdetail.mmoney) - parseFloat(payload.param.money)
                });
                //需要在这增加积分逻辑了
                const mddata = yield call(loadmemeberdetail, {
                  id: memberdetail.mid,
                });
                if (mddata.data.record.length>0)
                {
                  let mdresult={};
                  mdresult = mddata.data.record[0];
                  const credit = parseFloat(mdresult.credit) + parseFloat(payload.param.money);

                  yield call(updatememberdetail, {
                    mdid: mdresult.mdid,
                    credit
                  });

                  const newlevel = memberlevelupdate.find((item) => {
                    return item.cridit >= credit
                  })
                  if (newlevel && memberdetail.mpd != newlevel.level && memberdetail.mpd != 0) {
                    yield call(update, {
                      mid: memberdetail.mid,
                      mpd: newlevel.level
                    });
                  }
                }
                
              } else {
                errormsg = 'outofmoney';
              }
             }
               
          payload.record.ostate = 2;
          accournt.atime = moment().format('YYYY-MM-DD HH:mm:ss');
          accournt.astate = 1;
          if(errormsg==='')
          {
            
            //记账
            const accourntdata = yield call(addaccournt, accournt);
            //更改订单状态和使用记录
              const result = yield call(updateorder, {
                oid :payload.order.oid,
                ostate: 2
              });
              
              if (result.success) {
                const dataurecord = yield call(updaterecord, {
                  rid: payload.record.rid,
                  ostate: payload.record.ostate,
                  money: payload.param.money,
                  etime: moment().format('YYYY-MM-DD HH:mm:ss'),
                  disid,
                  discount: discount[memberdetail.mpd]
                });
                if (dataurecord.success) {
                  const data = yield call(updateplace, {
                    pid: payload.record.pid,
                    pstate: 0
                  });
                  if (data.success) {
                    yield call(closelight, payload.record);
                    errormsg = 'success';
                  } else {
                    errormsg = 'faild';
                  }
                } else {
                  errormsg = 'faild';
                }
              } else {
                errormsg = 'ordernotfound';
              }
          }
        yield put({
              type: "updateState",
              payload: {
                errormsg
              }
        });
        payload.callback(errormsg)
    },
    *getorderlist({ payload }, { call, put,select }) {
      let { pname,storetype,ostate,btime,etime } = yield select(state => state.order);
      const param={};
      if(payload.mid)
      {
        param.mid=payload.mid;
      }
      if (pname && pname !== '')
      {
        param.pname = pname;
      }
      if (storetype && storetype !== 100) {
        param.storetype = storetype;
      }
      if (ostate && ostate !== 100) {
        param.ostate = ostate;
      }
      param.btime = btime.format('YYYY-MM-DD HH:mm:ss');
      param.etime = etime.format('YYYY-MM-DD HH:mm:ss');
      const data = yield call(queryorderlist, payload.page, payload.pageSize, param);
 
      yield put({
        type: "loaddataSuccess",
        payload: {
          data,
          current: payload.page,
          pageSize: payload.pageSize
        }
      });
    },
     *getmobileorderlist({ payload }, { call, put }) {
      const data = yield call(queryorderlist, payload.page, payload.pageSize, {
        mid: payload.mid
      });
       const member=yield call(loadmemeber,{id:payload.mid});
      yield put({
        type: "loaddataMobileSuccess",
        payload: {
          mobilemember: member.data,
          data,
          current: payload.page,
          pageSize: payload.pageSize
        }
      });
    },
    *loadorder({ payload }, { call, put }) {
      yield put({
            type: "updateState",
            payload: {
              errormsg:'',
            }
          });
      let errormsg='';
      let orderdetail={};
      let recorddetail={};
      let memberdetail={};
      const data = yield call(queryorderlist, 1,10,{oid:payload.oid});
      const record=yield call(queryrecordlist,1,10,{oid:payload.oid});
      
      if(data.data.record.length!==0)
      {
        if (data && data.success) {
          if(record&&record.success)
          { 
            if(record.data.record.length!==0)
            {
                recorddetail=record.data.record[0];
            }else{
               if(data.data.record[0].ostate===1||data.data.record[0].ostate===2)
               {
                 errormsg='err';
               }
            }
          }
          orderdetail=data.data.record[0];
          const member=yield call(loadmemeber,{id:data.data.record[0].mid});
          if (member && member.success) {
            memberdetail = member.data;
          }
        }
      }else{
        errormsg='none';
      }
      yield put({
            type: "updateState",
            payload: {
              orderdetail,
              recorddetail,
              memberdetail,
              errormsg,
            }
          });
    },
  },
}
