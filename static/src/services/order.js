import { request } from "../utils";
export async function addorder(params) {
  return request({
    url: "/api/restql/Base_Order",
    method: "POST",
    data: params
  });
}
export async function add(params) {
  return request({
    url: "/api/restql/Base_Record",
    method: "POST",
    data: params
  });
}
export async function queryorderlist(page,pageSize,body) {
  return request({
    url: `/api/order/getorderlist?page=${page}&pageSize=${pageSize}`,
    method: "POST",
    data: body
  });
}
export async function loadmemeber(params) {
  const id = params.id || 0;
  const url = `/api/restql/Base_Order/${id}`;
  return request({
    url,
    method: "get"
  });
}
export async function queryrecordlist(page,pageSize,body){
  return request({
    url: `/api/order/getrecordlist?page=${page}&pageSize=${pageSize}`,
    method: "POST",
    data: body
  });
}
export async function updateorder(params) {
  return request({
    url: `/api/restql/Base_Order/${params.oid}`,
    method: "put",
    data: params
  });
}
export async function updaterecord(params) {
  return request({
    url: `/api/restql/Base_Record/${params.rid}`,
    method: "put",
    data: params
  });
}