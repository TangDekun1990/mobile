<template>
  <div class="container">    
    <label class="title">{{title}}</label>
    <label class="subtitle">{{subtitle}}</label>    
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
  },  
}
</script>

<style lang="scss" scoped>
  .container {    
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background-color: #fff; 
  }
  .title {
    width: 100px;
    font-size: 14px;
    color: #4E545D;
    margin-left: 17px;
  }
  .subtitle {
    flex: 1;
    margin-left: 20px;
    margin-right: 15px;
    color: #E6342F;
    font-size: 15px;
    text-align: right;
  }
</style>


