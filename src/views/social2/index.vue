<template>
  <div>
    <canvas ref="canvas"></canvas>
    <button @click="btn">erweima</button>
  </div>
</template>

<script>
import Qrcode from "qrcode";
export default {
  methods: {
    btn() {
      Qrcode.toCanvas(this.$refs.canvas, "http://localhost:9528/#/social2", {
        width: 300,
        height: 300,
      });
    },
  },
};
</script>

<style></style>
