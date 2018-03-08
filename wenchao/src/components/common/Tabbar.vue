<template>
  <div id="tabbar">
    <div id="top-line">
    </div>
    <section class="tabbar_item" @click="gotoPage('/home')">
      <img class="icon" src="../../assets/tabbar_home_nor.png" />
      <span class="title">首页</span>
    </section>
    <section class="tabbar_item" @click="gotoPage('/category')">
      <img class="icon" src="../../assets/tabbar_sort_nor.png" />
      <span class="title">分类</span>
    </section>
    <section class="tabbar_item" @click="gotoPage('/cart')">
      <img class="icon" src="../../assets/tabbar_cart_nor.png" />
      <span class="title">购物车</span>
    </section>
    <section class="tabbar_item" @click="gotoPage('/profile')">
      <img class="icon" src="../../assets/tabbar_profile_nor.png" />
      <span class="title">我的</span>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Tabbar',
  methods: {
    gotoPage(path) {
      this.$router.push(path)
    }
  }
}
</script>

<style scoped>
  #tabbar {
    background-color: #fff;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 50px;    
  }
  .tabbar_item {
    flex: 1;    
    width: 25%;
    display: inline-block;
  }
  .icon {
    width: 30px;
    height: 30px;  
  }
  #top-line {
    position: absolute;
    height: 1px;
    top: 0;
    left: 0;
    right: 0;
    background-color: #E8EAED;
  }
</style>

