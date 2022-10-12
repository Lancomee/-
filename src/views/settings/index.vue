<template>
  <div class="settings">
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="one" lazy>
          <el-button
            type="primary"
            style="margin-left: 10px"
            size="small"
            @click="addEvent"
            >新增角色</el-button
          >

          <el-table :data="list" border style="margin: 10px" stripe>
            <el-table-column label="序号">
              <template v-slot="{ $index }">
                <div>{{ (page.page - 1) * page.pageSize + $index + 1 }}</div>
              </template>
            </el-table-column>
            <el-table-column label="角色" prop="name" />
            <el-table-column label="描述" prop="description" />
            <el-table-column label="操作">
              <template v-slot="{ row }">
                <div>
                  <el-button
                    type="success"
                    size="small"
                    @click="setClick(row.id)"
                    >分配权限</el-button
                  >
                  <el-button type="primary" size="small" @click="edit(row)"
                    >修改</el-button
                  >
                  <el-button type="danger" size="small" @click="del(row.id)"
                    >删除</el-button
                  >
                </div>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <div class="page">
            <el-pagination
              layout="total,sizes,prev, pager, next,jumper"
              :total="page.total"
              :current-page="page.page"
              :page-sizes="[1, 10]"
              :page-size="page.pageSize"
              @size-change="sizeChange"
              @current-change="pageChange"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane label="公司管理" name="second" lazy><info /></el-tab-pane>
      </el-tabs>
    </el-card>
    <Add ref="add" :show.sync="show" @getRoleData="getRoleData" />
    <!-- 分配权限组件 -->
    <PermissionSet ref="permission" />
  </div>
</template>

<script>
import Add from "./components/add.vue";
import info from "./info.vue";
import { sysRole, delSysRole } from "@/api/settings";
import PermissionSet from "./components/permissionSet.vue";
export default {
  components: {
    info,
    Add,
    PermissionSet,
  },
  data() {
    return {
      showPer: false,
      show: false,
      list: [{}],
      page: {
        total: 100,
        page: 1,
        pageSize: 1,
      },
      activeName: "one",
    };
  },
  created() {
    this.getRoleData();
  },

  methods: {
    async getRoleData() {
      const res = await sysRole();
      this.list = res.data.rows;
      this.page.total = res.data.total;
      console.log(res);
    },
    // 叶容量
    sizeChange(sizes) {
      this.page.pageSize = sizes;
      this.page.page = 1;
      this.getRoleData();
    },
    // 页码改变
    pageChange(page) {
      this.page.page = page;
      this.getRoleData();
    },
    addEvent() {
      this.show = true;
      this.$refs.add.mode = "add";
    },
    del(id) {
      this.$confirm("您确定删除该角色吗", "提示").then(async () => {
        await delSysRole(id);
        this.$message.success("删除成功");
        this.getRoleData();
        this.page.page = 1;
      });
    },
    edit(row) {
      this.$refs.add.mode = "edit";
      this.show = true;
      //深拷贝当前数据
      this.$refs.add.form = JSON.parse(JSON.stringify(row));
    },
    // 分配权限
    setClick(id) {
      console.log('jue');
      this.$refs.permission.showPer = true;
      this.$refs.permission.getRoleById(id);
    },
  },
};
</script>

<style lang="scss" scoped>
.settings {
  padding: 15px;
}
</style>
