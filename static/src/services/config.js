import { request } from "../utils";

export async function update(params) {
  return request({
    url: `/api/restql/Base_Config/${params.cid}`,
    method: "put",
    data: params
  });
}
export async function loadsingle(params) {
  const id = params.id || 0;
  const url = `/api/restql/Base_Config/${id}`;
  return request({
    url,
    method: "get"
  });
}
export async function paytest(params){
  const url = `/api/wechat/getusr/${params.money}`;
  return request({
    url,
    method: "get"
  });
}