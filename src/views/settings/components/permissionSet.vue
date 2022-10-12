<template>
  <el-dialog
    title="权限分配"
    :visible.sync="showPer"
    width="500px"
    @close="closeEvent"
  >
    <el-tree
      ref="tree"
      :data="treeData"
      show-checkbox
      node-key="id"
      check-strictly
      :default-checked-keys="defaultKeys"
      :props="{ label: 'name' }"
    ></el-tree>
    <template #footer>
      <div style="text-align: center">
        <el-button type="text" @close="closeEvent">取消</el-button>
        <el-button type="primary" @click="submit">提交</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import {
  sysPermissions,
  sysRoleId,
  sysRoleAssignprem,
} from "@/api/permissions";
import { changeData } from "@/utils/index";

export default {
  data() {
    return {
      showPer: false,
      treeData: [],
      defaultKeys: [],
      id:''
    };
  },
  created() {
    this.getData();
  },
  methods: {
    closeEvent() {
      this.showPer = false;
      // 解决回显会闪的问题
      this.$refs.tree.setCheckedKeys([]);
    },
    async getData() {
      const res = await sysPermissions();
      this.treeData = changeData(res.data, "0");
      console.log("权限列表", res);
    },
    // 获得角色详情
    async getRoleById(id) {
      this.id=id
      console.log('idd');
      const res = await sysRoleId(id);
      console.log('333333333333');
      this.$refs.tree.setCheckedKeys(res.data.permIds);
      console.log(222);
      console.log("角色详情", res);
    },
    async submit() {
      console.log("112121");
      await sysRoleAssignprem(this.id,this.$refs.tree.getCheckedKeys());
      this.$message.success('修改成功')
      this.closeEvent()
    },
  },
};
</script>

<style></style>
