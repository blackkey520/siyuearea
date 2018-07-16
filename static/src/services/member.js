import { request } from "../utils";

export async function register(params) {
  return request({
    url: "/api/restql/Base_Member",
    method: "POST",
    data: params
  });
}

export async function querylist(params) {
  return request({
    url: "/api/member/getmemberlist",
    method: "POST",
    data: params
  });
}
export async function loadmemeber(params) {
  const id = params.id || 0;
  const url = `/api/member/getsinglemember/${id}`;
  return request({
    url,
    method: "get"
  });
}
export async function loadmemberbyphone(params) {
  return request({
    url: "/api/restql/Base_Member",
    method: "GET",
    data: params
  });
}
export async function update(params) {
  return request({
    url: `/api/restql/Base_Member/${params.mid}`,
    method: "put",
    data: params
  });
}
export async function getusrmsg(params) {
  return request({
    url: `/api/wechat/getusr/${params.code}`,
    method: "get",
  });
}
export async function paymoney(params){
  return request({
    url: `/requestpayment/${params.openid}/${params.money}/${params.ptype}/${params.otype}`,
    method: "get",
  });
}