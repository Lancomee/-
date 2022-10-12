<template>
  <div class="departments">
    <el-card class="card">
      <template #header>
        <div>组织结构</div>
      </template>

      <div class="other-content">
        <Tree-item :item="topInfo" style="width: 100%" :istop="true" />
        <hr />

        <el-tree :data="treeData" :props="{ label: 'name' }" default-expand-all>
          <template v-slot="{ data }">
            <Tree-item
              :item="data"
              style="width: 100%"
              @getDepartmentsData="getDepartmentsData"
            />
          </template>
        </el-tree>
      </div>
    </el-card>
    <Add :initList='initList' @getDepartmentsData='getDepartmentsData'/>
  </div>
</template>

<script>
import TreeItem from "./components/TreeItem.vue";
import Add from "./components/Add.vue";
import { companyDepartment } from "@/api/departments";

export default {
  components: {
    TreeItem,
    Add,
  },
  data() {
    return {
      topInfo: {
        name: "组织架构",
        manager: "负责人",
        id:""
      },
      treeData: [{}],
      initList:[] //存储最原始的组织架构列表结构
    };
  },
  async created() {
    this.getDepartmentsData();
  },
  methods: {
    async getDepartmentsData() {
      const res = await companyDepartment();
      this.initList= res.data.depts
      this.treeData = this.changeData(res.data.depts, "");
      this.topInfo.name = res.data.companyName;
      console.log(res);
    },
    changeData(arr, pid = "") {
      return arr.filter((item) => {
        if (item.pid === pid) {
          item.children = this.changeData(arr, item.id);
          return true;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.departments {
  margin: 20px;
  .card {
    padding: 70px;
  }
}
</style>
