<template>
  <div class="container">
    <mt-header class="header" title="设置">
      <header-item slot="left" v-bind:isBack=true v-on:onclick="goBack">
      </header-item>    
    </mt-header>
    <div class="submit" @click="signout" v-if="isOnline">
      <label class="text">退出登录</label>
    </div>
  </div>
</template>

<script>
import { HeaderItem } from '../../components/common'
import { mapState, mapMutations } from 'vuex'
import { Header, MessageBox } from 'mint-ui'
export default {
  components: {
    // HeaderItem
  },  
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
  }
  .header {
    @include header;
  }
  .submit {
    position: absolute;
    border-radius: 4px;
    background-color: #F23030;
    height: 44px;
    left: 10px;
    right: 10px;
    bottom: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .text {
    color: #ffffff;
    font-size: 18px;
  }
</style>


