import {add, querylist, updateorder, queryrecordlist,updaterecord} from "../services/order";
import {loadmemeber,update} from "../services/member";
import { updateplace } from "../services/place";
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
    orderlist:[],
    selectedmobileorder:{},
    mobileorderlist:[],
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
        mobileorderlist: actionData.data.record,
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
          ostate:1,
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
    *finishrecord({ payload }, { call, put }) {
      yield put({
            type: "updateState",
            payload: {
              errormsg:'',
            }
          });
         let errormsg='';
         let member=yield call(loadmemeber,{id:payload.record.mid});
            if(member.success)
            {
               let mem=member.data;
               if(mem.mmoney>=payload.param.money)
               {
                  mem.mmoney=mem.mmoney-payload.param.money;
                  mem.mregisttime=moment(mem.mregisttime).format('YYYY-MM-DD HH:mm:ss');
                  delete mem.nextOne;
                  delete mem.preOne;
                  const member=yield call(update,mem);
                  payload.order.ostate=2;
                  payload.order.otime=moment(payload.otime).format('YYYY-MM-DD HH:mm:ss');
                  delete payload.order.pname;
                  delete payload.order.mname;
                    delete payload.order.btime;
                    delete payload.order.discount;
                    delete payload.order.disid;
                    delete payload.order.etime;
                    delete payload.order.money;
                  const result=yield call(updateorder,payload.order);
                  
                  if(result.success)
                  {
                    payload.record.btime=moment(payload.record.btime).format('YYYY-MM-DD HH:mm:ss');
                    payload.record.etime=payload.param.etime;
                    payload.record.money=payload.param.money;
                    payload.record.pdesc=payload.param.pdesc;
                    delete payload.record.pname;
                    delete payload.record.mname;
                    const dataurecord = yield call(updaterecord, payload.record);
                    if(dataurecord.success)
                    { 
                      const data=yield call(updateplace,{pid:payload.record.pid,pstate:0});
                      if(data.success)
                      {
                        errormsg='success';
                      }
                      else{
                        errormsg='faild';
                      }
                    }else{
                      errormsg='faild';
                    }
                  }else{
                      errormsg='ordernotfound';
                  }
               }else{
                 errormsg='outofmoney';
               }
            }else{
               errormsg='usernotfound';
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
      yield put({
        type: "loaddataMobileSuccess",
        payload: {
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
          orderdetail=data.data.record[0]
        }
      }else{
        errormsg='none';
      }
      yield put({
            type: "updateState",
            payload: {
              orderdetail,
              recordsdetail,
              errormsg,
            }
          });
    },
    *saveorder({ payload }, { call, put }) {
			let data = null,
				tableData = null;
			const callback = payload.callback;
            delete payload.callback;
			if (payload.param.id!==null) {
            payload.param.oid = payload.param.id;
            delete payload.param.id;
                    data = yield call(update, payload.param);
                } else {
            delete payload.param.id;
                    data = yield call(register, payload.param);
      }
			callback && callback(data);
		}
  },
}
