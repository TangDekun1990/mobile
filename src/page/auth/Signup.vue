<template>
  <div class="container">
    <header-view title="快速注册">
      <header-item slot="leftItem" isBack="true" v-on:onclick="onBack">
      </header-item>    
      <!-- <header-item slot="rightItem" title=""> -->
      <!-- </header-item>   -->
    </header-view>
    <div class="section-wrapper top-wrapper">
      <div class="input-wrapper">        
        <input class="input-item" v-model="username" placeholder="请输入阿联酋10位手机号">
      </div>
      <div class="input-wrapper">        
        <input class="input-item" v-model="code" placeholder="请输入验证码">
      </div>
    </div>
    <div class="section-wrapper bottom-wrapper">
      <div class="input-wrapper">        
        <input class="input-item" id="username-input" v-model="password" placeholder="设置密码">
      </div>
      <div class="input-wrapper">        
        <input class="input-item" v-model="confirmPassword" placeholder="确认密码">
      </div>
    </div>    
    <label class="tips">6-20位数字/字母/符号</label>
    <div class="submit" @click="onBack">
      <label class="text">注册</label>
    </div>
  </div>
</template>

<script>
import HeaderView from '../../components/common/HeaderView'
import HeaderItem from '../../components/common/HeaderItem'
export default {
  props: {
    type: {
      type: String,
      default: 'signup', // signup(注册)、bind(绑定手机号)、retrieve(找回密码)
    }
  },
  components: {
    HeaderView,
    HeaderItem,
  },  
  methods: {    
    onBack() {
      this.$router.go(-1) 
    },
    signup() {

    },
    bind() {

    },
    retrieve() {

    }
  }
}
</script>

<style scoped>
  .container {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    background-color: #F0F2F5;
  }
  .header {
    height: 44px;
  }
  .section-wrapper {       
    display: flex;    
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    background-color: #FFFFFF;
  }
  .top-wrapper { 
    height: 88px;
    margin-top: 10px;      
  }
  .bottom-wrapper { 
    height: 88px;
    margin-top: 10px;      
  }
  .input-wrapper {  
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: flex-start;   
    align-items: stretch;
  }
  .input-icon {
    width: 24px;
    height: 24px;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 10px;
  }
  .input-item {
    display: flex;
    flex: 1;    
    margin-left: 18px;
    margin-right: 0px;
    border: none;   
  }
  .tips {
    color: #BABFC6;
    font-size: 12px;
    margin-left: 18px;
    margin-top: 10px;
    text-align: left;
  }
  .submit {
    border-radius: 4px;
    background-color: #F23030;
    height: 44px;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .text {
    color: #ffffff;
    font-size: 18px;
  }
</style>
