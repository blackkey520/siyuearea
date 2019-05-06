import { request } from "../utils";

export async function querylist(params) {
  return request({
    url: "/api/restql/Base_Place",
    method: "GET",
    data: params
  });
}
export async function updateplace(params) {
  return request({
    url: `/api/restql/Base_Place/${params.pid}`,
    method: "put",
    data: params
  });
}
export async function querysinglerecord(params) {
  return request({
    url: "/api/restql/Base_OpenDeskRecord",
    method: "GET",
    data: params
  });
}
export async function addsinglerecord(params) {
   return request({
     url: "/api/restql/Base_OpenDeskRecord",
     method: "POST",
     data: params
   });
}
export async function updatesinglerecord(params) {
  return request({
    url: `/api/restql/Base_OpenDeskRecord/${params.odrid}`,
    method: "put",
    data: params
  });
}
export async function openlight(params) {
  return request({
    url: `/socket/${params.pid}/openlight`,
    method: "get",
  });
}
export async function closelight(params) {
  return request({
    url: `/socket/${params.pid}/closelight`,
    method: "get",
  });
}
 
export async function querytraillist(page, pageSize, body) {
  return request({
    url: `/api/trail/gettraillist?page=${page}&pageSize=${pageSize}`,
    method: "POST",
    data: body
  });
}