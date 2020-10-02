import {
    getmessagelist,
    addmessage,
    addcommunity,
    updatecommunity,
    querycommunitylist,
    getcommentlist,
    delcomment,
    delmessage,
    exquisitemessage
} from "../services/message";
import {mlevel} from '../utils/enum';
import moment from 'moment';
import { routerRedux } from "dva/router";
import {
  message,
} from "antd";
import {guid} from '../utils/index';
export default {
  namespace: "message",
  state: {
    messagedetail:{},
    commentlist:[],
    messagelist:[],
    checkcommunity: {},
    communitylist:[],
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
        memberlist: actionData.data.record,
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
      *getcommentlist({payload},{call,select,put}){ 

           const {messagedetail} = yield select(state => state.message);
            const result = yield call(getcommentlist, {
              msgid: messagedetail.msgid
            });  
            let commentlist = result.data;
            
            commentlist.map((item, key) => {

              item.level = mlevel[item.mpd];
              // item.likemidb = item.likemid == member.mid ?'text-red':''; 
              item.comtime = moment(item.comtime).fromNow()
            })
            yield put({
                type: "updateState",
                payload: {
                  commentlist
                }
            }); 
        },
        *exquisite({payload},{call,select,put}){ 
            const result = yield call(exquisitemessage, {
              msgid: payload.msgid
            }); 
            
           yield put(routerRedux.push({
             pathname: `/discus`,
           }));
        },
         *delcomment({payload},{call,select,put}){ 
            const result = yield call(delcomment, {
              comid: payload.comid
            }); 
            yield put({
            type: "getcommentlist",
            payload: {}
          }); 
           
        },
         *delmessage({payload},{call,select,put}){ 
            const result = yield call(delmessage, {
              msgid: payload.msgid
            }); 
            yield put(routerRedux.push({
              pathname: `/discus`,
            }));
           
        },
     *getcommunitylist({payload},{call,select,put}){ 
            const result = yield call(querycommunitylist, {
            }); 
            
            if(result.success&&result.data.record.length!==0)
            {
                
                yield put({
                    type: "updateState",
                    payload: {
                      communitylist: result.data.record,
                      pagination: {
                        current: 1,
                        pageSize: 10,
                        total: 0
                      }
                    }
                });
            }
        },
          *addcommunity({payload},{call,out,put,select}){
            	if (payload.communityid) {

            	  yield call(updatecommunity, {
            	    ...payload,
            	  });
            	} else {
            	  yield call(addcommunity, {
            	    ...payload,
            	  });
            	}
            	message.success("保存成功");
            	yield put(routerRedux.push({
            	  pathname: `/discus`,
            	}));
            
        },
        *getmessagelist({payload},{call,select,put}){
           const {messagelist,pagination} = yield select(state => state.message);
            
            const result = yield call(getmessagelist, {
                ...payload,
                likemid:-1,
            }); 
            if(result.success&&result.data.record.length!==0)
            {
                let premsglist = [];
                let page = payload.page;
                let newlist = result.data.record;
                newlist.map((item, key) => {
                  item.msgimg = item.msgimg.split(',');
                  let newimg = [];
                  item.msgimg.map((imgitem, imgindex) => {
                    if (imgitem != '')
                      newimg[imgindex] = `/public/upload/${imgitem}`;
                  });
                  item.newimg = newimg;
                  item.level = mlevel[item.mpd]; 
                  item.msgtime = moment(item.msgtime).fromNow()
                })
                if (payload.page == 1) {
                  premsglist = newlist;
                } else {
                  if (result.data.record.length>0)
                  {
                    premsglist = messagelist.concat(newlist);
                  }else[
                    page = page-1
                  ]
                }
                
                yield put({
                    type: "updateState",
                    payload: {
                      messagelist: premsglist,
                      pagination: {
                        current: page,
                        pageSize: 10,
                        total: 0
                      }
                    }
                });
            }else{
               yield put({
                 type: "updateState",
                 payload: {
                   messagelist: [],
                   pagination: {
                     current: 1,
                     pageSize: 10,
                     total: 0
                   }
                 }
               });
            }
        },
         *addmessage({payload},{call,out,put,select}){
            const {pagination} = yield select(state => state.message);
           
            yield call(addmessage, {
                msgtype: payload.msgtype,
                msgcontent: payload.msgcontent,
                mid: 286,
                msgid: guid(),
                msgtime: moment().format('YYYY-MM-DD HH:mm:ss'),
                room:1
            });
            yield put({
                type: 'getmessagelist',
                payload: {
                    page: pagination.current,
                    pageSize: pagination.pageSize,
                }
            })
        },
    }
}
