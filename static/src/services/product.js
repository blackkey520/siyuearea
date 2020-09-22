import { request } from "../utils";

export async function add(params) {
  return request({
    url: "/api/restql/Base_Product",
    method: "POST",
    data: params
  });
}

export async function querylist(params) {
  return request({
      url: "/api/restql/Base_Product",
      method: "GET",
      data: params
  });
}
 
export async function update(params) {
  return request({
    url: `/api/restql/Base_Product/${params.proid}`,
    method: "put",
    data: params
  });
}
export async function querygoodslist(params) {
  return request({
    url: "/api/restql/Base_Goods",
    method: "GET",
    data: params
  });
}

export async function updategoods(params) {
  return request({
    url: `/api/restql/Base_Goods/${params.gid}`,
    method: "put",
    data: params
  });
}