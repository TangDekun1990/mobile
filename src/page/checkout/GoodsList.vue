<template>
  <div class="container">
    <mt-header class="header" title="商品清单">
      <header-item slot="left" v-bind:isBack=true v-on:onclick="goBack">
      </header-item> 
      <header-item slot="right" :title="countDesc">
      </header-item>    
    </mt-header>
    <goods-item class="item" v-for="(item, index) in cartGoods" :key="index" :item="item"></goods-item>
  </div>
</template>

<script>
import { Header } from 'mint-ui'
import { HeaderItem } from '../../components/common'
import GoodsItem from './child/GoodsItem'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      cartGoods: state => state.cart.saveCartList,
    }),
    countDesc: function () {
      let count = (this.cartGoods && this.cartGoods.length) ? this.cartGoods.length : 0
      return '共' + count + '件'
    }
  },
  components: {
    GoodsItem,
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },    
  }
}
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;    
  }
  .header {
    @include header;
  }
  .item {
    height: 110px;
    background-color: #fff;
  }
</style>

