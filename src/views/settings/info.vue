<template>
  <div class="company">
    <el-form label-width="100px" >
      <el-form-item label="公司名称">
        <el-input v-model="companyInfo.name" disabled></el-input>
      </el-form-item>
      <el-form-item label="公司地址">
        <el-input  v-model="companyInfo.companyAddress" disabled></el-input>
      </el-form-item>
      <el-form-item label="公司邮箱">
        <el-input v-model="companyInfo.mailbox" disabled></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="companyInfo.remarks" disabled></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {companyByID} from '@/api/settings'
export default {
data(){
  return {
    companyInfo:{},
    initList:'', //存储最原始的角色列表
  }
},
created(){
  this.getCompanyInfo()
},
methods:{
  async getCompanyInfo(){
    const res = await companyByID()
    console.log('公司信息',res);
    this.companyInfo = res.data
  }
}
}
</script>

<style>

</style>