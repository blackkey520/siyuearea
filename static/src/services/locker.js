import {
    request
} from "../utils";

export async function querylist({page,pageSize,body}) {
    return request({
        url: `/api/locker/getlockerlist?page=${page}&pageSize=${pageSize}`,
        method: "POST",
        data: body
    });
}
export async function updatelocker(params) {
    const lid=params.lid;
    delete params.lid;
    return request({
        url: `/api/restql/Base_Locker/${lid}`,
        method: "put",
        data: params
    });
}