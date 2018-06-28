import { request } from "../utils";

export async function add(params) {
  return request({
    url: "/api/restql/Base_ProductCard",
    method: "POST",
    data: params
  });
}
export async function querylist(params) {
  return request({
    url: "/api/restql/Base_ProductCard",
    method: "GET",
    data: params
  });
}
export async function update(params) {
  return request({
    url: `/api/restql/Base_ProductCard/${params.pcid}`,
    method: "put",
    data: params
  });
}
export async function loadsingle(params) {
  const id = params.id || 0;
  const url = `/api/restql/Base_ProductCard/${id}`;
  return request({
    url,
    method: "get"
  });
}