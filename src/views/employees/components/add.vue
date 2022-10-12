<template>
  <el-dialog
    title="新增员工"
    width="500px"
    :visible.sync="isShow1"
    @close="closeEvent"
  >
    <!-- 表单 -->
    <el-form label-width="100px" ref="form" :model="form" :rules="rules">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="form.mobile"></el-input>
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="form.timeOfEntry"></el-date-picker>
      </el-form-item>
      <el-form-item label="聘用形势" prop="formOfEmployment">
        <el-select v-model="form.formOfEmployment">
          <el-option
            v-for="item in employeesData.hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="form.workNumber"></el-input>
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input v-model="form.departmentName" readonly @focus="focusEvent">
        </el-input>
        <el-tree
          :data="treeData"
          v-if="treeShow"
          :props="{ label: 'name' }"
          @node-click="nodeClick"
        ></el-tree>
      </el-form-item>
      <el-form-item label="转下时间" prop="correctionTime">
        <el-date-picker v-model="form.correctionTime"></el-date-picker>
      </el-form-item>
    </el-form>
    <!-- 插槽 -->
    <template #footer>
      <div style="text-align: center">
        <el-button>取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import employeesData from "@/api/constant/employees";
import { companyDepartment } from "@/api/departments";
import { addUserrrr } from "@/api/employees";
import { validatePhone } from "@/utils/validate";
export default {
  data() {
    return {
      isShow1: false,
      employeesData,
      treeData: [],
      treeShow: false,
      form: {
        username: "", //string	非必须		姓名
        mobile: "", //string	非必须		手机号
        formOfEmployment: "", //	number	非必须		聘用形式
        workNumber: "", //string	非必须		工号
        departmentName: "", //string	非必须		组织名称
        timeOfEntry: "", //string	非必须		入职时间
        correctionTime: "", //string	非必须		转正时间
      },
      rules: {
        username: [{ required: true, message: "必填", trigger: "change" }],
        mobile: [
          { required: true, message: "必填", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              validatePhone(value)
                ? callback()
                : callback(new Error("请输入正确的手机号"));
            },
          },
        ],
        timeOfEntry: [{ required: true, message: "必填", trigger: "change" }],
        formOfEmployment: [
          { required: true, message: "必填", trigger: "change" },
        ],
        workNumber: [{ required: true, message: "必填", trigger: "change" }],
        departmentName: [
          { required: true, message: "必填", trigger: "change" },
        ],
        correctionTime: [
          { required: true, message: "必填", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    async focusEvent() {
      this.treeShow = true;
      // 获得部门数据
      const res = await companyDepartment();
      // 给数据渲染组织架构
      this.treeData = this.changeData(res.data.depts);
    },
    nodeClick(data) {
      this.treeShow = false;
      // 这里的data是指点击时拿到的组织架构中的一行
      this.form.departmentName = data.name;
    },

    changeData(arr, pid = "") {
      return arr.filter((item) => {
        if (item.pid === pid) {
          item.children = this.changeData(arr, item.id);
          return true;
        }
      });
    },
    submit() {
      console.log(1);
      this.$refs.form.validate(async (res) => {
        console.log(2);
        if (res) {
          await addUserrrr(this.form);
          this.$message("新增员工成功");
          this.$emit("getEmployeeData");
          this.isShow1 = false;
          console.log(3);
        }
      });
    },
    closeEvent() {
      this.$refs.form.resetFields();
      // 关闭弹框时手动重置表单数据
      this.form = {
        username: "", //string	非必须		姓名
        mobile: "", //string	非必须		手机号
        formOfEmployment: "", //	number	非必须		聘用形式
        workNumber: "", //string	非必须		工号
        departmentName: "", //string	非必须		组织名称
        timeOfEntry: "", //string	非必须		入职时间
        correctionTime: "", //string	非必须		转正时间
      };
    },
  },
};
</script>

<style></style>
