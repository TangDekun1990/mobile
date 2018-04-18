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
import { Header, Indicator, Toast } from 'mint-ui'
import { HeaderItem } from '../../components/common'
import GoodsItem from './child/GoodsItem'
import * as cart from '../../api/network/cart'
export default {
  computed: {
    countDesc: function () {
      let count = (this.cartGoods && this.cartGoods.length) ? this.cartGoods.length : 0
      return '共' + count + '件'
    }
  },
  data() {
    return {
      cartGoods: [],
    }
  },
  components: {
    GoodsItem,
  },
  created() {
    this.fetchCartList()
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    fetchCartList(){
      Indicator.open()
      cart.cartGet().then((response) => {
        Indicator.close()
        if (response && response.goods_groups.length > 0) {
          this.cartGoods = Object.assign([], response.goods_groups[0].goods);
        }
      }, (error) => {
        Indicator.close()
        Toast(error.errorMsg)
      })
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

