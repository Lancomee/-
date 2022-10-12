<template>
  <div class="uploadImg">
    <el-upload
      class="avatar-uploader"
      action="#"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :http-request="httpRequest"
    >
      <img
        v-if="value"
        :src="value"
        class="avatar"
        @click.stop.prevent="isShow = true"
      />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <!-- 删除按钮 -->
    <div class="del" v-if="value" @click="del">×</div>
    <!-- 图片预览 -->
    <el-dialog title="图片预览" width="500px" :visible.sync="isShow">
      <img :src="value" alt="" />
    </el-dialog>

    <!-- 进度条 -->
    <el-progress v-if="loading" :percentage="percentage"></el-progress>
  </div>
</template>

<script>
import COS from "cos-js-sdk-v5";
const cos = new COS({
  SecretId: "AKIDiKn4Xu8EE3fEh19GTUL7rTuAIbmmZYO3",
  SecretKey: "iFdoncHtJgv33sXFqJfqsmW8bt3173nV",
});
export default {
  name: "uploadImg",
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      // imageUrl: "",
      loading: false,
      isShow: false,
      percentage: 0,
    };
  },
  methods: {
    beforeAvatarUpload(file) {
      return true;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.loading = true;
    },
    httpRequest(res) {
      this.loading = true;
      this.percentage = 0;
      cos.putObject(
        {
          Bucket: "hr77-1314019285" /* 必须 */,
          Region: "ap-guangzhou" /* 存储桶所在地域，必须字段 */,
          Key: res.file.uid + "" /* 必须 */,
          StorageClass: "STANDARD",
          Body: res.file, // 上传文件对象
          onProgress: (progressData) => {
            this.percentage = progressData.percent * 100;
            if (progressData.percent === 1) {
              setTimeout(() => {
                this.loading = false;
              }, 1000);
            }
            console.log(JSON.stringify(progressData));
          },
        },
        (err, data) => {
          console.log(err || data);
          // this.imageUrl = "http://" + data.Location;
          this.$emit("input", "http://" + data.Location);
        }
      );
    },
    del() {
      this.$emit("input", "");
    },
  },
};
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.uploadImg {
  position: relative;
  width: 178px;
  &:hover {
    .del {
      display: block;
    }
  }
  .del {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    display: none;
  }
}
</style>
