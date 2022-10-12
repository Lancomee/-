<template>
  <div class="navbar">
    <div class="navbar-icon" @click="toggleSideBar">
      <i v-if="sidebar.opened" class="el-icon-s-unfold"></i>
      <i v-else class="el-icon-s-fold"></i>
    </div>
    <div class="navbar-name">人力资源后台管理系统</div>
      <lang style="margin-right:15px;"/>
    <div class="navbar-user">
    
      <el-dropdown @command="commandEvent">
        <!-- 默认插槽 -->
        <span class="el-dropdown-link">
          <img v-imgerror="defaultImg" class="avatar" :src="userInfo.staffPhoto" alt="" />
          <span>{{userInfo.username}}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <!-- 具名插槽 -->
        <el-dropdown-menu v-slot:="dropdown">
          <el-dropdown-item command="home">首页</el-dropdown-item>
          <el-dropdown-item command="exit" divided>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import lang from '@/components/lib/lang.vue'
import { mapState, mapActions } from "vuex";
export default {
  components:{
    lang
  },
  data(){
    return{
      defaultImg:require('@/assets/common/head.jpg')
    }
  },
  computed: {
    ...mapState("app", ["sidebar"]),
    ...mapState("user", ["userInfo"]),
  },
  // 自定义指令----解决图片出错问题
  directives: {
    imgerror: {
      bind() {},
      inserted(dom, obj) {
        dom.src = dom.src || obj.value
        dom.onerror = () => {
          dom.src = obj.value
        }
      },
      update() {},
      componentUpdated(dom,obj) {
        dom.src = dom.src || obj.value
      },
      unbind(dom){
        dom.onerror = null
      }
    },
  },
  methods: {
    ...mapActions("app", ["toggleSideBar"]),
    commandEvent(command) {
      switch (command) {
        case "home":
          this.$router.push("/");
          break;

        case "exit":
          console.log("exit");
          // 弹出提示框
          this.$confirm("您确定要退出登陆吗？", "温馨提示")
            .then(() => {
              this.$store.commit("user/logout");
              this.$message.success("退出成功");
              this.$router.push("/login?redirect=" + this.$route.fullPath);
            })
            .catch(() => {});
          break;
      }
    },
      btnLang(){
      const _lang = ['zh','en']
      const  _index = 1- _lang.indexOf(this.$i18n.locale)
      this.$i18n.locale = _lang[_index]
    }
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  // width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  background-color: #3e6ef8;
  color: #fff;
  .navbar-icon {
    padding: 0 15px;
    cursor: pointer;
  }
  .navbar-name {
    // border: 1px solid #000;
    flex: 1;
  }
  .navbar-user {
    margin-right: 20px;
    .el-dropdown-link {
      cursor: pointer;
      color: #fff;
      display: flex;
      align-items: center;
      .avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
  }
}
</style>
