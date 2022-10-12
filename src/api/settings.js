import request from '@/utils/request'
// 获取所有角色列表
export function sysRole(params) {
  return request({
    url: "/sys/role",
    method: "get",
    params
  });
}

// 根据id获取企业信息
export function companyByID(id) {
  return request({
    url: `/company/${id}`,
    method: "get",
  });
}
// 新增角色
export function addRolesss(data) {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}
// 根据ID删除角色
export function delSysRole(id) {
  return request({
    url: '/sys/role/' + id,
    method: "delete",
  });
}
// 根据ID编辑角色
export function editSysRole(data) {
  return request({
    url: '/sys/role/'+data.id,
    method: "put",
    data
  });
}