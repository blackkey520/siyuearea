import { request } from "../utils";

export async function querylist(params) {
    return request({
        url: "/api/suggest/getsuggestlist",
        method: "POST",
        data: params
    });
}``