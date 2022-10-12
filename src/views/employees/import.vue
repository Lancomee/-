<template>
  <div class="import">
    <el-card>
      <h2 class="title" @click='changeDate'>员工导入</h2>
      <UpdateExcel :before-upload="beforeUpload" :on-success="onSuccess" />
    </el-card>
  </div>
</template>

<script>
import { sysUserBatch }from '@/api/employees'
import moment from 'moment';
export default {
  methods: {
    beforeUpload(file) {
      return true;
    },
  async onSuccess(obj) {
      const temp = {
        入职日期: "timeOfEntry", //string	非必须		入职时间
        姓名: "username", //string	非必须		姓名
        手机号: "mobile", //string	非必须		手机号
        工号: "workNumber", //string	非必须		工号
        转正日期:"correctionTime", //string	非必须		转正
      };
      const newArr = obj.results.map((item) => {
        const newObj = {};
        Object.keys(item).forEach((item2) => {
          if (item2==='入职日期'||item2==='转正日期') {
            newObj[temp[item2]] = this.changeDate(item[item2]);
          }else{
            newObj[temp[item2]] = item[item2];
          }
          
        });
        return newObj;
      });
      await sysUserBatch(newArr)
      this.$message('导入成功')
      this.$router.push('/employees')
      console.log(newArr);
    },
    changeDate(num){
      const t = new Date((num-1)*24*60*60*1000-8*60*60*1000)
      console.log(t);
      t.setFullYear(t.getFullYear()-70)
      return moment(t).format('YYYY/MM/DD')
      
    }
  },
};
</script>

<style lang="scss" scoped>
.import {
  padding: 20px;
  .title {
    text-align: center;
  }
}
</style>
