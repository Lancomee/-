<template>
  <div class="box-card">
    <el-card>
      <div class="btn">
        <el-button
          size="small"
          type="primary"
          @click="importClick"
          v-if="$store.state.user.userInfo.roles.points.includes('employees_importBtn')"
          >导入</el-button
        >
        <el-button size="small" type="primary" @click="exportClick"
        v-if="$store.state.user.userInfo.roles.points.includes('employees_outputBtn')"
          >导出</el-button
        >

        <el-button size="small" type="danger" @click="addEvent"
          >新增员工</el-button
        >
      </div>
    </el-card>
    <el-card style="margin-top: 20px">
      <el-table :data="list" border style="width: 100%">
        <el-table-column label="序号" width="100">
          <template v-slot="{ $index }">
            <div>{{ (page.page - 1) * page.size + $index + 1 }}</div>
            <!-- <div>{{ 1}}</div> -->
          </template>
        </el-table-column>
        <el-table-column prop="username" label="姓名" sortable />
        <el-table-column prop="staffPhoto" label="相片" width="100" sortable>
          <template #scope="{ rows }">
            <img
              :src="rows.staffPhoto"
              class="avatar"
              alt=""
              v-imgerror="defaultImg"
              @click="imgBtn(rows.staffPhoto)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="mobile" label="手机号" sortable width="130" />
        <el-table-column prop="workNumber" label="工号" width="100" sortable />
        <!-- 聘用形式 elementUI 里有formatter格式化方法-->
        <el-table-column
          prop="formOfEmployment"
          :formatter="formatter"
          label="聘用形式"
          width="120"
          sortable
        />
        <el-table-column
          prop="departmentName"
          label="部门"
          width="100"
          sortable
        />
        <el-table-column
          prop="timeOfEntry"
          label="入职时间"
          width="130"
          sortable
        />
        <el-table-column prop="enableState" label="状态" width="100" sortable />
        <el-table-column fixed="right" label="操作" width="260" sortable>
          <template #default="scope">
            <div>
              <el-button type="text" @click="goDetail(scope.row.id)"
                >查看</el-button
              >
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="addRole(scope.row.id)"
                >角色</el-button
              >
              <el-button type="text" size="small" @click="del(scope.row.id)"
                >删除</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="total,sizes,prev, pager, next,jumper"
        :total="page.total"
        :current-page="page.page"
        :page-sizes="[1, 10, 50, 100]"
        :page-size="page.size"
        @size-change="sizeChange"
        @current-change="pageChange"
      />
    </el-card>
    <!-- 添加 -->
    <Add ref="add" @getEmployeeData="getEmployeeData" />
    <!-- 二维码生成组件 -->
    <el-dialog title="生成二维码" width="500px" :visible.sync="show">
      <div style="text-align: center">
        <canvas ref="canvas"></canvas>
      </div>
    </el-dialog>
    <!-- 角色组件 -->
    <Role :is-show1.sync="isShow1" ref="role" />
  </div>
</template>

<script>
import employeesData from "@/api/constant/employees";
import { sysUser, delEmployeesUser } from "@/api/employees";
import Add from "./components/add.vue";
import Role from "./components/role.vue";
import moment from "moment";
import cookieJs from "js-cookie";
import Qrcode from "qrcode";
export default {
  components: {
    Add,
    Role,
  },
  data() {
    return {
      show: false,
      defaultImg: require("@/assets/common/head.jpg"),
      isShow1: false,
      // 导入枚举数据
      employeesData,
      list: [{}],
      page: {
        total: 100,
        page: 1,
        size: +cookieJs.get("size") || 5,
      },
    };
  },
  created() {
    this.getEmployeeData();
  },
  methods: {
    async getEmployeeData() {
      const res = await sysUser(this.page);
      // 复杂数据类型，使用该数据的地方只要有一个地方改了，使用该引用的地方都会变
      res.data.rows.forEach((item) => {
        const result = employeesData.hireType.find((item2) => {
          return item2.id === +item.formOfEmployment;
        });
        const resultStr = result ? result.value : "-";
        item.formOfEmployment = resultStr;
        item.timeOfEntry = moment(item.timeOfEntry).format("YYYY-MM-DD");
      });

      this.list = res.data.rows;
      this.page.total = res.data.total;
      console.log(res);
    },

    // 叶容量
    sizeChange(size) {
      this.page.size = 1;
      cookieJs.set("size", size);
      this.page.page = 1;
      this.getEmployeeData();
    },
    // 页码改变
    pageChange(page) {
      this.page.page = page;
      this.getEmployeeData();
    },
    // 格式化聘用形式
    formatter(row, colum, cellValue, index) {
      const result = employeesData.hireType.find((item) => {
        return (item.id = cellValue);
      });
      return result ? result.value : "-";
    },
    addEvent() {
      this.$refs.add.isShow1 = true;
    },
    del(id) {
      this.$confirm("您确定删除该角色吗", "提示").then(async () => {
        await delEmployeesUser(id);
        console.log(1);
        this.$message.success("删除成功");
        this.getEmployeeData();
        this.page.page = 1;
      });
    },
    importClick() {
      this.$router.push("/employees/import");
    },
    goDetail(id) {
      console.log("dadsa");
      console.log(id);
      this.$router.push("/employees/detail/" + id);
    },
    async exportClick() {
      const header = {
        // 定义数据转换规则
        手机号: "mobile", //	string	非必须		手机号
        姓名: "username", //	string	非必须		姓名
        聘用形式: "formOfEmployment", //number	非必须		聘用形式
        工号: "workNumber", //	string	非必须		工号
        组织名称: "departmentName", //	string	非必须		组织名称
        入职时间: "timeOfEntry", //	string	非必须		入职时间
        转正时间: "correctionTime", //	string	非必须
      };
      // 拿到所有数据
      const res = await sysUser({
        page: 1,
        size: 1000,
      });
      res.data.rows.forEach((item) => {
        const result = employeesData.hireType.find((item2) => {
          return item2.id === +item.formOfEmployment;
        });
        console.log("result", result);
        const resultStr = result ? result.value : "-";
        item.formOfEmployment = resultStr;
        item.timeOfEntry = moment(item.timeOfEntry).format("YYYY-MM-DD");
      });

      const data = res.data.rows.map((item) => {
        return Object.keys(header).map((item2) => {
          return item[header[item2]];
        });
      });
      import("@/vendor/Export2Excel")
        .then((res) => {
          res.export_json_to_excel({
            header: Object.keys(header),
            data,
            filename: "用户列表",
          });
          console.log(res);
        })
        .catch(() => {});
    },
    imgBtn(url) {
      if (!url) {
        return;
      }
      this.show = true;
      this.$nextTick(() => {
        Qrcode.toCanvas(this.$refs.canvas, url, {
          width: 300,
          height: 300,
        });
      });
    },
    // 角色
    addRole(id) {
      this.isShow1 = true;
      console.log(11);
      this.$refs.role.getUserInfo(id);

      console.log(33);
    },
  },
};
</script>

<style lang="scss" scoped>
.box-card {
  margin: 20px;
}
</style>
