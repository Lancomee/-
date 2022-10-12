import request from '@/utils/request'

export function companyDepartment() {
  return request({
    url: "/company/department",
    method: "get",
  });
}
export function delDepartment(id) {
  return request({
    url: "/company/department/" + id,
    method: "DELETE",
   
  });
}
// 获取员工简单列表
export function getSimpleUser() {
  return request({
    url: "/sys/user/simple",
    method: "get",
  });
}
// 新增部门
export function addDepartment(data) {
  return request({
    url: "/company/department",
    method: "post",
    data
  });
}
// 编辑部门
export function editDepartment(data) {
  return request({
    url: "/company/department/" + data.id,
    method: "put",
    data
  });
}