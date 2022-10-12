<template>
  <el-dialog title="角色" :visible="isShow1" @close="closeEvent">
    <el-checkbox-group v-model="value">
      <el-checkbox :label="item.id" v-for="item in list" :key="item.id">
        {{item.name}}
      </el-checkbox>
    </el-checkbox-group>
    <el-button type="text" @close="closeEvent">取消</el-button>
    <el-button type="text" @click="submit">提交</el-button>
  </el-dialog>
</template>

<script>
import { sysRole } from "@/api/settings";
import { sysUser } from "@/api/user"
import { sysUserAssignRoles} from '@/api/employees'
export default {
  props: {
    isShow1: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      list: [{}],
      value: [],
      id:''
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await sysRole({
        page: 1,
        pagesize: 1000,
      });
      this.list = res.data.rows;
      console.log("角色列表111", res);
    },
    closeEvent() {
      this.$emit("update:isShow1", false);
    },
    async getUserInfo(id){
      this.id = id
      const res = await sysUser(id)
      this.value = res.data.roleIds
      console.log("用户基本信息",res);
    },
    async submit(){
      await sysUserAssignRoles(this.id,this.value)
      this.$message.success('更改角色成功')
      this.closeEvent()
    }
  },
  

};
</script>

<style></style>
