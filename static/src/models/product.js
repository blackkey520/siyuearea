import {
    add,
    querylist,
    update,
} from "../services/product";

import moment from 'moment';
import { routerRedux } from "dva/router";
import {
	message,
} from "antd";
export default {
  namespace: "product",
  state: {
    checkproduct: {
      proimgdescarray: ['', '', '', '', '', '', '', '', '', '']
    },
    protype:100,
    productlist:[],
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
    *getproductlist({payload},{call,select,put}){
        const {protype} = yield select(state => state.product);
      let condition={};
      if (protype !== 100) {
        condition.protype = parseInt(protype);
      }
      const result = yield call(querylist, condition);
      if(result.success&&result.data.record.length!==0)
      {
        let productlist = result.data.record;
        productlist.map((item,key)=>{
          if (item.proimgdesc=='')
          {
            item.proimgdescarray = ['', '', '', '', '', '', '', '', '', '' ]
          }else{
            item.proimgdescarray = item.proimgdesc.split(',');
          }
        })
        yield put({
            type: "updateState",
            payload: {
              productlist
            }
          });
      }
    },
    *saveproduct({ payload }, { call, put }) { 
			if (payload.proid) {
 
				 yield call(update,{
                      ...payload,
                      createtime: moment().format('YYYY-MM-DD HH:mm:ss')
                });
			} else {
          yield call(add, {
              ...payload,
              createtime: moment().format('YYYY-MM-DD HH:mm:ss')
          }); 
      } 
      message.success("保存成功");
      yield put(routerRedux.push({ pathname: `/product`, }));
		} 
  },
}
