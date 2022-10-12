<template>
  <div>
    <el-dropdown @command="commandEvent">
      <span style="color: #fff">
        <svg-icon
          style="width: 30px; height: 30px; color: #fff"
          icon-class="language"
        />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="zh" :disabled="$i18n.locale === 'zh'"
            >中文</el-dropdown-item
          >
          <el-dropdown-item command="en" :disabled="$i18n.locale === 'en'"
            >en</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import cookieJs from "js-cookie";
export default {
  name: "lang",
  inject: ["reload"],
  methods: {
    commandEvent(command) {
      this.$i18n.locale = command;
      cookieJs.set("lang", command);
      // 用provide和inject代替 this.$router.go(0) 可实现静默刷新 提升用户体验
      this.reload();
    },
  },
};
</script>

<style></style>
