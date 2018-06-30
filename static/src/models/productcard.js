import { add,querylist,update,loadsingle } from "../services/productcard";
import { addaccournt } from "../services/accournt";
import { parse } from "qs";
import { message } from "antd";
import Cookie from "../utils/js.cookie";
import moment from 'moment';
import {Toast} from 'antd-mobile';
import { routerRedux } from "dva/router";
import {mtype} from '../utils/enum';
export default {
  namespace: "productcard",
  state: {
    checkproductcard: {},
    productcardlist: [],
    imglist:[],
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
        productcardlist: actionData.data.record,
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
    *getproductcardlist({ payload }, { call, put }) {
      const data = yield call(querylist, payload);
      yield put({
        type: "loaddataSuccess",
        payload: {
          data,
          current: payload.page,
          pageSize: payload.pageSize
        }
      });
    },
    *loadproductcard({ payload }, { call, put }) {
      const data = yield call(loadsingle, payload);
      if (data && data.success) {
        let imglist=[];
        if (data.data.img!=='') {
          imglist=[{
            uid: -1,
            name: data.data.imgname,
            status: 'done',
            thumbUrl: data.data.img,
          }]
        }
        yield put({
          type: "updateState",
          payload: {
            checkproductcard: data.data,
            imglist
          }
        });
      }
    },
    *saveproductcard({ payload }, { call, put,select }) {
        let data = null,
            tableData = null;
        const callback = payload.callback;
        delete payload.callback;
        const { imglist } = yield select(state => state.productcard);
        payload.param.img = imglist.length !== 0 ? imglist[0].thumbUrl : '',
        payload.param.imgname = imglist.length !== 0 ? imglist[0].name : ''
        if (payload.param.id) {
            payload.param.pcid = payload.param.id;
            payload.param.btime = payload.param.btime.format('YYYY-MM-DD HH:mm:ss');
            payload.param.etime = payload.param.etime.format('YYYY-MM-DD HH:mm:ss');
            delete payload.param.id;
            data = yield call(update, payload.param);
        } else {
            delete payload.param.id; 
             payload.param.btime = payload.param.btime.format('YYYY-MM-DD HH:mm:ss');
             payload.param.etime = payload.param.etime.format('YYYY-MM-DD HH:mm:ss'); 
            data = yield call(add, payload.param);
        }
         yield put({
           type: "updateState",
           payload: {
             imglist: []
           }
         });
        callback && callback(data);
    }
  },
}
