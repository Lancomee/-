<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <h1>{{$t('el.colorpicker.clear')}}</h1>
     
    </div>
    
  </div>
</template>

<script>


export default {
  name: 'Dash',
  created(){
    console.log('$route',this.$route);
  },
  computed: {
  
  },
  methods:{
  
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
