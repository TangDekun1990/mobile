<!-- OrderItem -->
<template>
  <div class="container">
    <img class="photo" src="../../../assets/image/change-icon/default_image_02@2x.png">
    <div class="right-wrapper">
      <label class="title">泰国生态青椒 500g 限时促销</label>
      <label class="subtitle">花色</label>
      <div class="desc-wrapper">
        <label class="price">￥550</label>
        <label class="count">x12</label>
      </div>
    </div>
  </div>  
</template>

<script>
export default {
  props: {
    item: {
      type: Object
    }
  },
  // computed: {
  //   url() {
  //     let imgUrl = null;
  //     return imgUrl
  //   }
  // }
}
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
    background-color: #fff;
  }
  .photo {
    width: 90px;
    height: 90px;
    margin-left: 10px;
    margin-top: 10px;
    margin-right: 10px;
  }
  .right-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
  }
  .title {
    margin-top: 8px;
    color: #4E545D;
    font-size: 14px;  
    margin-right: 10px;    
  }
  .subtitle {
    margin-top: 6px;
    color: #7C7F88;
    font-size: 13px; 
    margin-right: 8px;  
  }
  .desc-wrapper {
    height: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    margin-right: 10px;
  }
  .price {
    color: #4E545D;
    font-size: 17px;
    margin-left: 0px;
  }
  .count {
    color: #7C7F88;
    font-size: 16px;
    margin-right: 10px;
  }
</style>