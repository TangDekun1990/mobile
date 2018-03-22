<template>
  <div class="container">
    <mt-header class="header" title="商品清单">
      <header-item slot="left" v-bind:isBack=true v-on:onclick="goBack">
      </header-item> 
      <header-item slot="right" :title="countDesc">
      </header-item>    
    </mt-header>
  </div>
</template>

<script>
import { Header } from 'mint-ui'
import { HeaderItem } from '../../components/common'
export default {
  data() {
    return {
      count: 0,
    }
  },
  computed: {
    countDesc() {
      return '共' + this.count + '件'
    }
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
</style>

