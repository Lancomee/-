<template>
  <el-dialog :title="title" width="500px" :visible="show" @close="closeEvent">
    <!--
  el-dialog
     props:['visible']
     this.$emit('update:visible',false)
 -->
    <el-form ref="form" label-width="100px" :model="form" :rules="rules">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="角色描述" prop="description">
        <el-input v-model="form.description" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div style="text-align: center">
        <el-button @click="closeEvent">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script>
import { addRolesss,editSysRole } from '@/api/settings.js'
export default {
  // model: {
  //   prop: 'show',
  //   event: 'input'
  // },
  props: ['show'],
  data() {
    return {
      // isShow: false
      mode: 'add', // add:新增   edit:编辑
      form: {
        name: '', //	string	必须		角色名称
        description: '' //	string	必须		角色描述
      },
      rules: {
        name: [
          {
            required: true,
            message: '必填',
            trigger: 'change'
          },
          {
            min: 1,
            max: 10,
            message: '请输入1-10位内的字符',
            trigger: 'change'
          }
        ], //	string	必须		角色名称
        description: [
          {
            required: true,
            message: '必填',
            trigger: 'change'
          },
          {
            min: 1,
            max: 100,
            message: '请输入1-100位内的字符',
            trigger: 'change'
          }
        ] //	string	必须		角色描述
      }
    }
  },
  computed: {
    title() {
      return { add: '新增角色', edit: '编辑角色' }[this.mode]
    }
  },
  methods: {
    closeEvent() {
      // this.isShow = false
      // this.$emit('input', false)
      this.$emit('update:show', false)
      this.$refs.form.resetFields()
      this.form = {
        name: '', //	string	必须		角色名称
        description: '' //	string	必须		角色描述
      }
    },
    // 确定按钮点击
    submit() {
      this.$refs.form.validate(async(result) => {
        if (result) {
          if (this.mode === 'add') {
            await addRolesss(this.form)
            console.log(2);
            this.$message.success('新增成功')
          } else if (this.mode === 'edit') {
            await editSysRole(this.form)
            this.$message.success('编辑成功')
          }
          this.closeEvent()
          this.$emit('getRoleData')
          console.log(33);
        }
      })
    }
  }
}
</script>
<style></style>
