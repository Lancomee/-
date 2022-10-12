<template>
  <div v-if="bol" id="app">
    <router-view /> 
    
  </div>
</template>

<script>

export default {
  name: 'App',
  provide(){
      return {
        reload:this.reload
      }
  },
  created(){
    console.log('$router',this.$router);
  },
  data(){
    return {
      bol:true
    }
  },
  methods:{
    reload(){
      this.bol= false
      this.$nextTick(()=>{
        this.bol= true
      })
    }
  }
}
</script>
