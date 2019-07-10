import { request } from "../utils";

export async function addaccournt(params) {
  return request({
    url: "/api/restql/Base_Accounts",
    method: "POST",
    data: params
  });
}
export async function querylist(page,pageSize,body) {
  return request({
    url: `/api/accounts/getaccountslist?page=${page}&pageSize=${pageSize}`,
    method: "POST",
    data: body
  });
}
 
export async function updates(params) {
  return request({
    url: `/api/restql/Base_Accounts/${params.oid}`,
    method: "put",
    data: params
  });
}
