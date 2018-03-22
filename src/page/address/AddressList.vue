<template>
  <div class="container">
    <mt-header class="header" title="收货地址">
      <header-item slot="left" v-bind:isBack=true v-on:onclick="goBack">
      </header-item> 
      <header-item slot="right" title="管理" v-on:onclick="goManage">
      </header-item>    
    </mt-header>
  </div>
</template>

<script>
import { Header } from 'mint-ui'
import { HeaderItem } from '../../components/common'
export default {
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    goManage() {
      // TODO:
    }
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

