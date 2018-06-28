import {add, querylist, updateorder, queryrecordlist,updaterecord} from "../services/order";
import {loadmemeber,update} from "../services/member";
import { updateplace } from "../services/place";
import { addaccournt } from "../services/accournt";

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
    recordsdetail:{},
    memberdetail:{},
    orderlist:[],
    selectedmobileorder:{},
    mobileorderlist:[],
    mobilemember:{},
    errormsg:'',
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
    *addrecord({ payload }, { call, put }) {
        const param={
          pid:payload.pid,
          mid:payload.mid,
          oid:payload.oid,
          ostate:0,
          btime:moment().format('YYYY-MM-DD HH:mm:ss'),
          etime:moment().format('YYYY-MM-DD HH:mm:ss'),
          disid:1,
          discount:1,
          money:0,
          pdesc:payload.pdesc
        }
          const callback = payload.callback;
          let data={};
            delete payload.callback;
            delete payload.restate;
        payload.ostate=1;
        payload.otime=moment(payload.otime).format('YYYY-MM-DD HH:mm:ss');
        payload.pdesc='';
        delete payload.pname;
        delete payload.mname;
        delete payload.btime;
        delete payload.discount;
        delete payload.disid;
        delete payload.etime;
        delete payload.money;
        delete payload.rstate;
        const result=yield call(updateorder,payload);
        if(result.success)
        {
          const resultadd = yield call(add, param);
          if(resultadd.success)
          {
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
          let { memberdetail } = yield select(state => state.order);
            const accournt = {};
            accournt.mid = memberdetail.mid;
            const days = moment(memberdetail.etime).diff(moment(), 'days', false);
            if (memberdetail.pcname != null && days>0)
            {
               accournt.atype = 3;
               accournt.amoney = 0;
               accournt.asmoney = 0;
               accournt.adesc = memberdetail.pcname;
               payload.record.ostate = 3;
            }else{
              if (memberdetail.mtype===0)
              {
                if (memberdetail.mmoney >= payload.param.money) {
                  memberdetail.mmoney = memberdetail.mmoney - payload.param.money;
                  memberdetail.mregisttime = moment(memberdetail.mregisttime).format('YYYY-MM-DD HH:mm:ss');
                  delete memberdetail.pcname;
                  delete memberdetail.btime;
                  delete memberdetail.etime;
                  delete memberdetail.isused;
                  delete memberdetail.pcdesc;
                  delete memberdetail.value;
                  const member = yield call(update, memberdetail);
                  accournt.atype = 1;
                  accournt.amoney = payload.param.money;
                  accournt.asmoney = payload.param.money;
                  accournt.adesc = '充值消费';
                  payload.record.ostate=1;
                } else {
                  errormsg = 'outofmoney';
                }
              }
              else{
                let overtime = moment(memberdetail.mregisttime);
                if (memberdetail.mtype===1)
                {
                  overtime = overtime.add(1,'days');
                }else if(memberdetail.mtype===2)
                {
                  overtime = overtime.add(1, 'weeks');
                }else if(memberdetail.mtype===3)
                {
                  overtime = overtime.add(1, 'months');
                }else{
                  overtime = overtime.add(1, 'quarters');
                }
                const now = moment();
                const hours = now.diff(overtime, 'hours', true);
                
                if (Math.ceil(hours) > 0)
                {
                  errormsg = 'outofcardtime';
                }
                accournt.atype = 2;
                accournt.amoney = 0;
                accournt.asmoney =0;
                accournt.adesc = memberdetail.mtype===1?'日卡消费':memberdetail.mtype===2?'周卡消费':memberdetail.mtype===3?'月卡消费':'季卡消费';
                payload.record.ostate = 2;
              }
            }
          
          accournt.atime = moment().format('YYYY-MM-DD HH:mm:ss');
          accournt.astate = 1;
          if(errormsg==='')
          {
            //记账
            const accourntdata = yield call(addaccournt, accournt);
            //更改订单状态和使用记录
            payload.order.ostate = 2;
              payload.order.otime = moment(payload.otime).format('YYYY-MM-DD HH:mm:ss');
              delete payload.order.pname;
              delete payload.order.mname;
              delete payload.order.btime;
              delete payload.order.discount;
              delete payload.order.disid;
              delete payload.order.etime;
              delete payload.order.money;
              delete payload.order.rstate;
              const result = yield call(updateorder, payload.order);
              
              if (result.success) {
                payload.record.btime = moment(payload.record.btime).format('YYYY-MM-DD HH:mm:ss');
                payload.record.etime = payload.param.etime;
                payload.record.money = payload.param.money;
                payload.record.pdesc = payload.param.pdesc;
                delete payload.record.pname;
                delete payload.record.mname;
                delete payload.record.rstate;
                const dataurecord = yield call(updaterecord, payload.record);
                if (dataurecord.success) {
                  const data = yield call(updateplace, {
                    pid: payload.record.pid,
                    pstate: 0
                  });
                  if (data.success) {
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
    *getorderlist({ payload }, { call, put }) {
      const param={};
      if(payload.mid)
      {
        param.mid=payload.mid;
      }
      if(payload.ordercode)
      {
        param.ordercode=payload.ordercode;
      }
      const data = yield call(querylist, payload.page,payload.pageSize,param);
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
      const data = yield call(querylist, payload.page,payload.pageSize,{mid:payload.mid});
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
      let recordsdetail={};
      let memberdetail={};
      const data = yield call(querylist, 1,10,{oid:payload.oid});
      const record=yield call(queryrecordlist,1,10,{oid:payload.oid});
      
      if(data.data.record.length!==0)
      {
        if (data && data.success) {
          if(record&&record.success)
          { 
            if(record.data.record.length!==0)
            {
                recordsdetail=record.data.record[0];
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
              recordsdetail,
              memberdetail,
              errormsg,
            }
          });
    },
  },
}
