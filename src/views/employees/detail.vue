<template>
  <div class="detail">
    <el-card>
      <el-tabs>
        <el-tab-pane label="登陆账号信息">
          <el-form ref="form" label-width="100px" :model="form" :rules="rules">
            <el-form-item label="姓名" prop="username">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="form.password" show-password></el-input>
            </el-form-item>
            <el-form-item>
              <button type="primary">取消</button>
              <button type="primary" @click="submit">确定</button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="个人详情" lazy>
          <!-- <Info :user-info="initUserInfo" @setUserName="setUserName"></Info> -->
          <component
            :is="'Info'"
            :user-info="initUserInfo"
            @setUserName="setUserName"
          />
        </el-tab-pane>
        <el-tab-pane label="岗位信息" lazy>
          <component
            :is="'Job'"
         
          />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { sysUser } from "@/api/user";
import { sysUserPut } from "@/api/employees";
export default {
  components: {
    Info: () => import("./components/info.vue"),
    Job:()=> import('./components/job.vue')
  },
  data() {
    return {
      id: this.$route.params.id,
      form: {
        username: "",
        password: "",
      },
      userInfo: [],
      initUserInfo: {},
      rules: {
        username: [{ required: true, message: "必填", trigger: "change" }],
        password: [
          { required: true, message: "必填", trigger: "change" },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "change",
          },
        ],
      },
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      // 通过id获取用户的基础信息
      const res = await sysUser(this.id);
      // 用res.data替换userInfo，用res.data.username替换form里的
      this.userInfo = res.data;
      this.initUserInfo = JSON.parse(JSON.stringify(res.data));
      this.form.username = res.data.username;
      console.log("用户信息", res);
    },
    submit() {
      this.$refs.form.validate(async (res) => {
        if (res) {
          await sysUserPut({ ...this.userInfo, ...this.form });
          // 用户名修改时，要同步到初始化数据，个人详情处也需要同步
          this.initUserInfo.username = this.form.username;
          this.$message.success("修改成功");
        }
      });
    },
    setUserName(str) {
      this.form.username = str;
    },
  },
};
</script>

<style></style>
