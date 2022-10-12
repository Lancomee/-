import request from "@/utils/request";

export function sysLogin(data) {
  return request({
    url: "/sys/login",
    method: "post",
    data,
  });
}

export function sysProfile() {
  return request({
    url:"/sys/profile",
    method:"post",
  });
}
export function sysUser(id) {
  return request({
    url:`/sys/user/${id}`,
  })
}