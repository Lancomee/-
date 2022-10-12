<template>
  <el-dialog
    :title="{ add: '添加权限', edit: '修改权限' }[mode]"
    width="550px"
    :visible="isShow"
    @close="closeEvent"
  >
    <el-form ref="form" :model="form" label-width="100px" :rules="rules">
      <el-form-item label="权限名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="权限标识" prop="code">
        <el-input v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item label="权限描述" prop="description">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="企业可见" prop="enVisible">
        <el-switch v-model="form.enVisible"></el-switch>
      </el-form-item>
    </el-form>
    <template #footer>
      <div>
        <el-button @click="closeEvent">取消</el-button>
        <el-button @click="addEvent()">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { sysPermissionsPost, sysPermissionsPut } from "@/api/permissions";
export default {
  model: {
    prop: "isShow",
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      mode: "add",
      form: {
        name: "", //string
        type: "", //number
        code: "", //string
        description: "", //string
        pid: "", //string
        enVisible: "", //Fstring
        id: "", //string
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "change" },
        ],
        code: [
          { required: true, message: "请输入活动名称", trigger: "change" },
        ],
        description: [
          { required: true, message: "请输入活动名称", trigger: "change" },
        ],
        enVisible: [
          { required: true, message: "请输入活动名称", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    addEvent() {
      this.$refs.form.validate(async (res) => {
        if (res) {
          if (this.mode === "add") {
            await sysPermissionsPost(this.form);
            this.$message.success("新增权限点成功");
          } else if (this.mode === "edit") {
            await sysPermissionsPut(this.form);
            this.$message.success("修改权限点成功");
          }
          this.closeEvent();
          this.$emit("getData");
   
        }
      });
    },

    closeEvent() {
      this.$emit("input", false);
      this.$refs.form.resetFields();
      this.form = {
        name: "", //string
        type: "", //number
        code: "", //string
        description: "", //string
        pid: "", //string
        enVisible: "", //Fstring
        id: "", //string
      };
    },
  },
};
</script>

<style></style>
