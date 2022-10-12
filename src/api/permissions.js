import request from "@/utils/request";

// 获取所有权限点
export function sysPermissions() {
  return request({
    url: "/sys/permission",
  });
}
// 新增权限点
export function sysPermissionsPost(data) {
  return request({
    url: "/sys/permission",
    method: "post",
    data,
  });
}

// 删除权限点
export function sysPermissionsDelete(id) {
  return request({
    url: `/sys/permission/${id}`,
    method: "delete",
  });
}
// 修改权限点
export function sysPermissionsPut(data) {
  return request({
    url: "/sys/permission/" + data.id,
    method: "put",
    data,
  });
}
// 获取角色的详情
export function sysRoleId(id) {
  return request({
    url: "/sys/role/" + id,
    method: "get",
  });
}
// 修改权限点
export function sysRoleAssignprem(id, permIds) {
  return request({
    url: "/sys/role/assignPrem",
    method: "put",
    data: {
      id,
      permIds,
    },
  });
}
