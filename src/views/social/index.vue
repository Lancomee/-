<template>
  <div>
    <h2>上传的地址：{{ imgUrl }}</h2>

    <uploadImg v-model="imgUrl"></uploadImg>  

    <el-upload
      class="avatar-uploader"
      action="#"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :http-request="httpRequest"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import COS from "cos-js-sdk-v5";
const cos = new COS({
  SecretId: "AKIDiKn4Xu8EE3fEh19GTUL7rTuAIbmmZYO3",
  SecretKey: "iFdoncHtJgv33sXFqJfqsmW8bt3173nV",
});
export default {
  data() {
    return {
      imgUrl: "",
      imageUrl: "",
    };
  },
  methods: {
    btn() {
      Qrcode.toCanvas(this.$refs.canvas, "this.imgUrl", {
        width: 300,
        height: 300,
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      return isJPG;
    },
    // /自定义上传
    httpRequest(res) {
      console.log("自定义", res);
      cos.putObject(
        {
          Bucket: "hr77-1314019285" /* 必须 */,
          Region: "ap-guangzhou" /* 存储桶所在地域，必须字段 */,
          Key: res.file.uid + "" /* 必须 */,
          StorageClass: "STANDARD",
          Body: res.file, // 上传文件对象
          onProgress: (progressData) => {
            console.log(JSON.stringify(progressData));
          },
        },
        (err, data) => {
          console.log(err || data);
          this.imageUrl = "http://" + data.Location;
        }
      );
    },
  },
};
</script>

<style>
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
</style>
