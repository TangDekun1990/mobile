<template>
  <div class="container" @click="onclick">    
    <div class="photo-wrapper">    
      <img src="../../../assets/image/change-icon/default_image_02@2x.png" v-for="item in items" :key="item"/>
    </div>
    <div class="right-wrapper">
      <label class="subtitle">共0件</label>
      <img class="indicator" src="../../../assets/image/change-icon/enter@2x.png" />
    </div>    
  </div>
</template>

<script>
export default {
  props: {
    subtitle: {
      type: String,
    },
  },
  data() {
    return {
      items: ['1', '2', '3', '4'] 
    }
  },
  methods: {
    onclick() {
      this.$emit('onclick')
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {    
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid $lineColor; 
    .photo-wrapper {
      flex: 1;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: stretch;
      img {
        margin-left: 10px;         
        width: 60px;
        height: 60px;     
      }
    }
    .right-wrapper {
      width: 90px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      .subtitle {
        flex: 1;
        margin-left: 20px;        
        color: #7C7F88;
        font-size: 13px;
        text-align: right;
      }
      .indicator {
        width: 7px;
        height: 12px;
        margin-left: 10px;
        margin-right: 10px;      
      }
    }
  }     
</style>


