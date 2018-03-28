<template>
  <div class="container">
    <mt-header class="header" title="用户协议">
      <header-item slot="left" v-bind:isBack=true v-on:onclick="goBack">
      </header-item>    
    </mt-header>
    <webview :url.asyc="getUrl">
    </webview>
  </div>
</template>

<script>
import { HeaderItem, Webview } from '../../components/common'
import { Header, MessageBox } from 'mint-ui'
export default {
  computed: {
    getUrl: function () {
      let url = this.$route.params.url;
      return url 
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
    background-color: $mainbgColor;
  }
  .header {
    @include header;
  }
</style>


