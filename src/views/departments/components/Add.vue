<template>
  <div>
    <el-dialog
      :title="{ add: '新增部门', edit: '编辑部门' }[mode]"
      width="500px"
      :visible.sync="isShow"
      @close="closeEvent"
    >
      <!-- 表单 -->
      <el-form label-width="100px" :rules="rules" ref="form" :model="form">
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="部门编码" prop="code">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item label="部门负责人">
          <el-select v-model="form.manager" @focus="focusEvent">
            <el-option
              v-for="i in managerList"
              :key="i.id"
              :label="i.username"
              :value="i.username"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门介绍" prop="introduce">
          <el-input v-model="form.introduce"></el-input>
        </el-form-item>
      </el-form>
      <!-- 插槽 -->
      <template #footer>
        <div style="text-align: center">
          <el-button @click="cancelEvent">取消</el-button>
          <el-button type="primary" @click="submit">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {
  getSimpleUser,
  addDepartment,
  editDepartment,
} from "@/api/departments";
export default {
  props: {
    initList: {
      type: Array,
      default: () => {},
    },
  },
  data() {
    return {
      mode: "add", //场景：add  edit
      isShow: false,
      form: {
        name: "",
        code: "",
        manager: "",
        introduce: "",
        pid: "", //父级部门ID
      },
      managerList: [],
      item: "",
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "change" },
          {
            min: 1,
            max: 50,
            message: "长度在 1 到 50 个字符",
            trigger: "change",
          },
          {
            validator: (rule, value, callback) => {
              let resultArr = [];
              // 新增场景 add
              if (this.mode === "add") {
                resultArr = this.initList.filter((i) => {
                  if (i.pid === this.item.id) {
                    return true;
                  }
                });
              } else if (this.mode === "edit") {
                resultArr = this.initList.filter((i) => {
                  if (i.pid === this.item.pid && i.id !== this.item.id) {
                    return true;
                  }
                });
              }
              const bol = resultArr.some((i) => {
                return i.name === value;
              });
              bol
                ? callback(new Error("请不要输入重复名称：" + value))
                : callback();

              // 编辑场景 edit
            },
          },
        ],
        code: [
          { required: true, message: "请输入邮编", trigger: "change" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 50 个字符",
            trigger: "change",
          },
          {
            validator: (rule, value, callback) => {
              let bol = false;
              if (this.mode === "add") {
                bol = this.initList.some((i) => {
                  return i.code === value;
                });
              } else if (this.mode === "edit") {
                bol = this.initList.some((i) => {
                  return i.code === value && i.id !== this.item.id;
                });
              }
              bol ? callback(new Error("请不要输入重复邮编")) : callback();
            },
          },
        ],
        introduce: [
          { required: true, message: "请输入邮编", trigger: "change" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 50 个字符",
            trigger: "change",
          },
        ],
        manager: [
          { required: true, message: "请输入负责人", trigger: "change" },
        ],
      },
    };
  },
  mounted() {
    this.$bus.$on("addEvent", (show, item, mode) => {
      this.isShow = show;
      this.item = item;
      console.log(this.item);
      this.mode = mode;
      if (mode === "edit") {
        console.log("edit");
        this.form = JSON.parse(JSON.stringify(item));
      }
    });
  },
  beforeDestroy() {
    this.$bus.$off("addEvent");
  },
  methods: {
    cancelEvent() {
      this.isShow = false;
    },
    // 获取员工列表
    async focusEvent() {
      const res = await getSimpleUser();
      this.managerList = res.data;
      console.log("员工列表", res);
    },
    submit() {
      this.$refs.form.validate(async (res) => {
        if (res) {

          if (this.mode==='add') {
            // 将当前点击的id赋值pid 
          this.form.pid = this.item.id;
          await addDepartment(this.form);
          this.$message.success("添加子部门成功");
          // console.log('submit',res);
          }else if(this.mode==='edit'){
            await editDepartment(this.form)
             this.$message.success("编辑成功");
          }
          // 关闭弹框
           this.isShow = false;
          // 刷新父级列表数据，触发父级方法
          this.$emit("getDepartmentsData");
        }
      });
    },
    closeEvent() {
      this.$refs.form.resetFields();
      // 关闭弹框时手动重置表单数据
      this.form={
        name: "",
        code: "",
        manager: "",
        introduce: "",
        pid: "", //父级部门ID
      }
    },
  },
};
</script>

<style></style>
