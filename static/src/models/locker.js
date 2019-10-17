import {
  querylist,
  updatelocker
} from "../services/locker";
 import { addaccournt } from "../services/accournt";
import { message } from "antd"; 
import {Toast} from 'antd-mobile';
import moment from 'moment'; 
import {mtype,placelist,ltype} from '../utils/enum';

export default {
  namespace: "locker",
  state: {
    lockerlist:[],
    searchval:'',
    lstate: 100,
    mem:100,
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
  },
  subscriptions: {
  },
  effects: {
    *getlockerlist({ payload }, { call, put,select }) {
           const {searchval,lstate,mem} = yield select(state => state.locker);
           let body={};
           if(lstate!==100)
           {
             body.lstate = lstate;
           }
           if (searchval!==''){
             body.searchval = searchval;
           }
           if (mem!==100){
              body.mem=mem;
           }
        const result = yield call(querylist, {...payload,body}); 
        yield put({
            type: "updateState",
            payload: {
                lockerlist: result.data.record,
                pagination:{
                    current: payload.page,
                    pageSize: 10,
                    total: result.data.totalRecord
                }
            }
        });
    },
    *cancellocker({ payload }, { call, put,select }) {
          const {lockerdetail,memberdetail} = payload;
           
          yield call(updatelocker, {lid:lockerdetail.lid,lmember:0}); 
          yield call(addaccournt, {
            mid:memberdetail.mid,
            atype:2,
            astate:0,
            atime: moment().format('YYYY-MM-DD HH:mm:ss'),
            adesc: `手动撤销储物柜->${placelist[lockerdetail.lstate]+' '+lockerdetail.lname}`
          }); 
          yield put({
            type: "getlockerlist",
            payload: {
              page:1, pageSize:10
            }
          });
          
    },
    *assignedlocker({ payload }, { call, put,select }) {
          const {searchval,lstate,mem} = yield select(state => state.locker);
          const {lockerdetail,memberdetail} = payload;
          if (lockerdetail.lmember!==0)
          {
            message.error('此储物柜正在有人使用')
            return ;
          }
          if (memberdetail.mstate == 2 || memberdetail.mstate == 1 || moment(memberdetail.mregisttime).diff(moment(), 'days') < 0)
          {
            message.error('会员已经过期或者已经停用')
            return;
          }
          const result = yield call(querylist, {
            page: 1,
            pageSize: 10,
            body:{
              lmember:memberdetail.mid
            }
          });
          if(result.data.record.length!==0)
          {
            const checkresult = result.data.record[0];
            message.error(`该会员已经开通储物柜[${placelist[checkresult.lstate]+' '+checkresult.lname}]`)
            return;
          }
          //  if (memberdetail.member.mstate == 2 || memberdetail.member.mstate == 1 || moment(memberdetail.member.mregisttime).diff(moment(), 'days') < 0) {
          //    message.error('只有月卡以上会员才能使用储物柜')
          //    return;
          //  }
          yield call(updatelocker, {lid:lockerdetail.lid,lmember:memberdetail.mid,}); 
          yield call(addaccournt, {
            mid:memberdetail.mid,
            atype:2,
            astate:0,
            atime: moment().format('YYYY-MM-DD HH:mm:ss'),
            adesc: `手动分配储物柜->${placelist[lockerdetail.lstate]+' '+lockerdetail.lname}`
          }); 
          yield put({
            type: "getlockerlist",
            payload: {
              page:1, pageSize:10
            }
          });
          
    },
  },
}
