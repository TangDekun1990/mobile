<template>
  <div class="container">
    <mt-header class="header" title="设置">
      <header-item slot="left" v-bind:isBack=true v-on:onclick="goBack">
      </header-item>    
    </mt-header>
    <gk-button class="button" type="primary" v-on:click="signout" v-if="isOnline">退出登录</gk-button>
  </div>
</template>

<script>
import { HeaderItem, Button } from '../../components/common'
import { mapState, mapMutations } from 'vuex'
import { Header, MessageBox } from 'mint-ui'
export default {
  computed: {
    ...mapState({
      isOnline: state => state.auth.isOnline
    }),
  },
  methods: {  
    ...mapMutations({
      clearToken: 'signout'
    }),  
    goBack() {
      this.$router.go(-1) 
    },
    signout() {
      MessageBox.confirm('确认退出').then(action => {
        this.clearToken() 
        this.goBack() 
      })
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
    background-color: #fff;
  }
  .header {
    @include header;
  }
  .button {
    @include button;    
    position: absolute; 
    width: 90%;    
    left: 5%;
    right: 5%;
    bottom: 36px; 
    margin: 0px;
  }
  .text {
    color: #ffffff;
    font-size: 18px;
  }
</style>


