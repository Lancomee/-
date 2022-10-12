<template>
  <div class="login">
    <el-form :model="loginForm" :rules="rules" ref="loginForm" class="loginBox">
      <div class="loginForm-title">
        <h3 class="loginTitle">Login Form</h3>
      </div>

      <el-form-item prop="mobile">
        <el-input
          type="mobile"
          v-model="loginForm.mobile"
          autocomplete="off"
          placeholder="请输入手机号"
          prefix-icon="el-icon-user-solid"
        ></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          autocomplete="off"
          placeholder="请输入密码"
          prefix-icon="el-icon-lock"
          show-password
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          style="width: 100%"
          :loading="loading"
          type="primary"

          @click="submitForm('loginForm')"
          >{{ $t('login.login')}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    var validateMobile = (rule, value, callback) => {
      const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
      if (reg.test(value)) {
        callback()
      } else {
        callback(alert('手机号错误'))
      }
    }
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码错误'))
      } else if (value.length < 6) {
        callback(new Error('密码不少于6位!'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        mobile: '13800000002',
        password: '123456',
        
      },
      rules: {
        mobile: [
          { required: true, validator: validateMobile, trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePassword, trigger: 'blur' }
        ],
        // loading: false
      },
      loading: false
    }
  },
  methods: {
    submitForm (loginForm) {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          this.loading = true
          // console.log(11);
          try {
            
          await  this.$store.dispatch('user/toLogin', this.loginForm)
            this.loading = false
             // 如果有回跳地址就取回跳地址，没有就使用/
            const redirect = this.$route.query.redirect || '/'
            this.$router.push(redirect)
          } catch {
            this.loading = false
          }
        } else {
          console.log('验证失败')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background-color: #2d3a4b;
  overflow: hidden;
  .loginBox {
    width: 520px;
    /* border: 1px solid white; */
    margin: 0 auto;
    padding: 160px 35px 0;
    overflow: hidden;
    .loginForm-title {
      width: 100%;
      font-size: 20px;
      color: #eeeeee;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>

<style lang="scss" scoped>
.login {
  .el-input {
    display: inline-block;
    height: 100%;
    width: 100%;
  }
}
</style>
