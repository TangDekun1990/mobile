<template>
  <div class="container">
    <!-- header -->
    <mt-header class="header" title="消息中心">
      <header-item slot="left" v-bind:isBack=true v-on:onclick="goBack()">
      </header-item>    
    </mt-header>
  </div>  
</template>

<script>
  export default {
    methods: {
      goBack() {
        this.$router.go(-1) 
      },
    }
  }
</script>

<style>

</style>

