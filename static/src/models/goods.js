import {
    querygoodslist,
    updategoods, 
} from "../services/product";

import moment from 'moment';
import { routerRedux } from "dva/router";
import {
	message,
} from "antd";
export default {
  namespace: "goods",
  state: {
 
    goodslist:[],
    isfinish: 100,
     pagination: {
       current: 1,
       pageSize: 100,
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
    *getgoodslist({payload},{call,select,put}){
        let condition={};
        
        const {isfinish} = yield select(state => state.goods);
        if (isfinish != 100) {
            condition.isfinish = isfinish;
        }
      const result = yield call(querygoodslist, condition);
    
      if(result.success)
      {
        let goodslist = result.data.record;
         
        yield put({
            type: "updateState",
            payload: {
              goodslist
            }
          });
      }
    },
    *updatelist({ payload }, { call, put }) { 
 
				 yield call(updategoods, {
                      ...payload
                });
		 
      message.success("保存成功");
      yield put({ type: "getgoodslist", payload: {  } });
		} 
  },
}
