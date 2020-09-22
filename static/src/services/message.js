import { request } from "../utils";

export async function getmessagelist(params) {
  return request({
    url: "/api/message/findmessagelist",
    method: "POST",
    data: params
  });
}
export async function getcommentlist(params) {
  return request({
    url: "/api/message/findcomment",
    method: "POST",
    data: params
  });
}
export async function delcomment(params) {
  return request({
    url: "/api/message/delcomment",
    method: "post",
    data: params
  });
}
export async function exquisitemessage(params) {
   return request({
     url: "/api/restql/Base_Message/" + params.msgid,
     method: "PUT",
     data: {
       msgtype:1
     }
   });
}
export async function delmessage(params) {
  return request({
    url: "/api/message/delmessage",
    method: "post",
    data: params
  });
}
export async function addmessage(params) {
  return request({
    url: "/api/message/addmessage",
    method: "POST",
    data: params
  });
}
export async function addcommunity(params) {
  return request({
    url: "/api/restql/Base_Community",
    method: "POST",
    data: params
  });
}
export async function querycommunitylist(params) {
  return request({
    url: "/api/message/findcommunitylist",
    method: "POST",
    data: params
  });
}
export async function updatecommunity(params) {
  return request({
    url: `/api/restql/Base_Community/${params.communityid}`,
    method: "put",
    data: params
  });
}

 