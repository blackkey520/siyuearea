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