import { request } from "../utils";

export async function querylist(params) {
    return request({
        url: "/api/suggest/getsuggestlist",
        method: "POST",
        data: params
    });
}
export async function updatesuggest(params) {
  return request({
    url: `/api/restql/Base_Suggust/${params.sid}`,
    method: "put",
    data: params
  });
}