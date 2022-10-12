<template>
  <div class="top">
    <div class="name">{{ item.name }}</div>
    <div class="manager">{{ item.manager }}</div>
    <el-dropdown @command="commandEvent">
      <!-- 默认插槽 -->
      <div class="other">
        <span>操作</span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
      <!-- 具名插槽 -->
      <el-dropdown-menu v-slot:="dropdown">
        <el-dropdown-item command="add">添加子部门</el-dropdown-item>
        <el-dropdown-item command="look" v-if="!istop"
          >查看部门</el-dropdown-item
        >
        <el-dropdown-item command="delete" v-if="!istop"
          >删除部门</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>

  </div>
</template>

<script>

import { delDepartment } from "@/api/departments"
export default {
 
  props: {
    item: {
      type: Object,
      default: () => {
        return {};
      },
    },
    istop: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    commandEvent(command) {
      switch (command) {
        case "add":
         this.$bus.$emit("addEvent", true,this.item,'add');
          break;

        case "look":
           this.$bus.$emit("addEvent", true,this.item,'edit');
          break;

        case "delete":
          this.$confirm('你确定删除该部门吗','提示',)
          .then(async ()=>{
            await delDepartment(this.item.id)
            this.$message.success('删除成功')
            console.log('del');
            this.$emit('getDepartmentsData')
          })
          .catch(()=>{})

          break;
        default:
          break;
      }
    },

  },
};
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  justify-content: center;
  align-items: center;
  .name {
    flex: 1;
  }
  .manager {
    width: 80px;
    margin-right: 20px;
  }
}
</style>
