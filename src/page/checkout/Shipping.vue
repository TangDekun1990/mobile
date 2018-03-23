<template>
  <div class="container">
    <mt-header class="header" title="配送方式">
      <header-item slot="left" v-bind:isBack=true v-on:onclick="goBack">
      </header-item>    
    </mt-header>
    <shipping-item>
    </shipping-item>
  </div>
</template>

<script>
import { HeaderItem } from '../../components/common'
import { Header } from 'mint-ui'
import ShippingItem from './child/ShippingItem'
export default {
  components: {
    ShippingItem,
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
    background-color: $mainbgColor;
  }
  .header {
    @include header;    
  }
</style>


