<template>
  <div class="box-card">
    <el-card>
      <div style="text-align: right">
        <el-button
          class="button"
          size="small"
          type="primary"
          @click="addClick(1, '0')"
          >添加权限</el-button
        >
      </div>
      <div>
        <el-table :data="list" style="width: 100%" row-key="id">
          <el-table-column prop="name" label="菜单名称" width="250">
          </el-table-column>
          <el-table-column prop="code" label="权限标识" width="250">
          </el-table-column>
          <el-table-column prop="description" label="描述" width="200">
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template #default="scope">
              <div>
                <el-button type="text" @click="addClick(1,scope.row.id)"
                  >添加权限页面</el-button
                >
                <el-button type="text" @click="addClick(2, scope.row.id)"
                  >添加权限按钮</el-button
                >
                <el-button type="text" @click="edit(scope.row)">修改权限</el-button>
                <el-button type="text" @click="del(scope.row.id)">删除权限</el-button>
                <el-button type="text">移除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <Add ref="add" v-model="Show" @getData="getData" />
  </div>
</template>

<script>
import { sysPermissions,sysPermissionsDelete} from "@/api/permissions";
import Add from "./components/add.vue";
export default {
  components: {
    Add,
  },
  data() {
    return {
      Show: false,
      list: [{}],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await sysPermissions();
      this.list = this.changeData(res.data, "0");

      console.log("权限", res);
    },
    changeData(arr, pid) {
      return arr.filter((item) => {
        if (item.pid === pid) {
          item.children = this.changeData(arr, item.id);
          return true;
        }
      });
    },
    addClick(type,pid) {
      this.Show = true;
      console.log(pid);
      this.$refs.add.mode='add'
      this.$refs.add.form.type = type;
      this.$refs.add.form.pid = pid;
    },
    del(id){
      this.$confirm('确定要删除该权限点吗？','提示').then(async()=>{
        await sysPermissionsDelete(id)
        this.$message.success('删除权限点成功')
        this.getData()
      
        
      })
    },
    edit(row){
      this.Show = true
      this.$refs.add.mode='edit'
      // 深拷贝当前行数据
      this.$refs.add.form = JSON.parse(JSON.stringify(row))
      console.log(row);
    }
  },
};  
</script>

<style lang="scss" scoped>
.box-card {
  margin: 10px;
}
</style>
