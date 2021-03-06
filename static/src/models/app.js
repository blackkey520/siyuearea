import { login, userInfo, logout, updatePassword,getqrcode } from "../services/app";
import { parse } from "qs";
import { message } from "antd";
import Cookie from "../utils/js.cookie";
import { routerRedux } from "dva/router";
export default {
  namespace: "app",
  state: {
    login: false,
    selecttab:'',
    user: {
      name: "",
      uid: ""
    },
    loginButtonLoading: false,
    menuPopoverVisible: false,
    siderFold: localStorage.getItem("antdAdminSiderFold") === "true",
    darkTheme: localStorage.getItem("antdAdminDarkTheme") !== "false",
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: JSON.parse(localStorage.getItem("navOpenKeys") || "[]"),
    passwordModalVisible: false
  },
  subscriptions: {
    setup({ dispatch }) {
      window.onresize = () => {
        dispatch({ type: "changeNavbar" });
      };
      if (Cookie.get("SESSION_NP")) {
        let temparr = Cookie.get("SESSION_NP");
        temparr = atob(temparr);
        temparr = temparr.split("###");
        dispatch({
          type: "app/login",
          payload: { name: temparr[0], pass: temparr[1] }
        });
      }
    }
  },
  effects: {
    *login({ payload }, { call, put }) {
      yield put({ type: "showLoginButtonLoading" });
      const data = yield call(login, parse(payload));
      if (data.success) {
        yield put({
          type: "loginSuccess",
          payload: {
            user: {
              name: (data.user && data.user.name) || "",
              uid: (data.user && data.user.uid) || 0
            }
          }
        });
      } else {
        message.error(data.message);
        yield put({
          type: "loginFail"
        });
      }
    },
    *selecttab({ payload }, { call, put }) {
        yield put(routerRedux.push({ pathname: `/mobile/${payload.tab}`, }));
    },
    *queryUser({ payload }, { call, put }) {
      const data = yield call(userInfo, parse(payload));
      if (data.success) {
        yield put({
          type: "loginSuccess",
          payload: {
            user: {
              name: data.user.name,
              uid: data.user.uid
            }
          }
        });
      }
    },
    *switchSider({ payload }, { put }) {
      yield put({
        type: "handleSwitchSider"
      });
    },
    *changeTheme({ payload }, { put }) {
      yield put({
        type: "handleChangeTheme"
      });
    },
    *changeNavbar({ payload }, { put }) {
      if (document.body.clientWidth < 769) {
        yield put({ type: "showNavbar" });
      } else {
        yield put({ type: "hideNavbar" });
      }
    },
    *switchMenuPopver({ payload }, { put }) {
      yield put({
        type: "handleSwitchMenuPopver"
      });
    },

    //修改密码
    *changePassword({ payload }, { call, put }) {
      const { callback, ...params } = payload;
      const data = yield call(updatePassword, params);
      if (data && data.success) {
        yield put({ type: "hidePasswordModal" });
      }
      callback(data);
    }
  },
  reducers: {
    loginSuccess(state, action) {
      return {
        ...state,
        ...action.payload,
        login: true,
        loginButtonLoading: false
      };
    },
    loginFail(state) {
      return {
        ...state,
        login: false,
        loginButtonLoading: false
      };
    },
    showLoginButtonLoading(state) {
      return {
        ...state,
        loginButtonLoading: true
      };
    },
    handleSwitchSider(state) {
      localStorage.setItem("antdAdminSiderFold", !state.siderFold);
      return {
        ...state,
        siderFold: !state.siderFold
      };
    },
    handleChangeTheme(state) {
      localStorage.setItem("antdAdminDarkTheme", !state.darkTheme);
      return {
        ...state,
        darkTheme: !state.darkTheme
      };
    },
    showNavbar(state) {
      return {
        ...state,
        isNavbar: true
      };
    },
    hideNavbar(state) {
      return {
        ...state,
        isNavbar: false
      };
    },
    handleSwitchMenuPopver(state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible
      };
    },
    handleNavOpenKeys(state, action) {
      return {
        ...state,
        ...action.payload
      };
    },
    changetab(state,action){
       return { ...state, selecttab: action.payload.tab };
    },
    showPasswordModal(state) {
      return { ...state, passwordModalVisible: true };
    },

    hidePasswordModal(state) {
      return { ...state, passwordModalVisible: false };
    }
  }
};
