import request from "@/utils/request";
// 获取员工列表
export function sysUser() {
  return request({
    url: "/sys/user",
    method: "get",
  });
}
// 新增员工
export function addUserrrr(data) {
  return request({
    url: "/sys/user",
    method: "post",
    data,
  });
}
// 删除员工
export function delEmployeesUser(id) {
  return request({
    url: `/sys/user/${id}`,
    method: "delete",
  });
}
//
export function sysUserBatch(data) {
  return request({
    url: "/sys/user/batch",
    method: "POST",
    data,
  });
}
// 保存员工基本信息
export function sysUserPut(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: "put",
    data,
  });
}
// 获取员工个人详情信息
export function employeesPersonalInfo(id) {
  return request({
    url: `/employees/${id}/personalInfo`,
    method: "get",
  });
}
// 修改员工个人信息
export function employeesPersonalInfoPut(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: "put",
    data,
  });
}
// 获取员工岗位详情
export function employeesJobs(id) {
  return request({
    url: `/employees/${id}/jobs`,
    method: "get",
  });
}
// 修改员工岗位
export function employeesJobPut(data) {
  return request({
    url: `/employees/${data.userId}/jobs`,
    method: "put",
    data,
  });
}
// 分配角色api
export function sysUserAssignRoles(id, roleIds) {
  return request({
    url: "/sys/user/assignRoles",
    method: "put",
    data: {
      id,
      roleIds,
    },
  });
}
