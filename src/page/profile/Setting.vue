<template>
  <div class="container">
    <header-view title="设置">
      <header-item slot="leftItem" isBack="true" v-on:onclick="onBack">
      </header-item>    
    </header-view>
    <div class="submit" @click="signout">
      <label class="text">退出登录</label>
    </div>
  </div>
</template>

<script>
import HeaderView from '../../components/common/HeaderView'
import HeaderItem from '../../components/common/HeaderItem'
export default {
  components: {
    HeaderView,
    HeaderItem
  },
  methods: {    
    onBack() {
      this.$router.go(-1) 
    },
    signout() {

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


