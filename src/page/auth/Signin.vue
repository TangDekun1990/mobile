<template>
  <div class="container">
    <header-view title="登录">
      <header-item slot="leftItem" isBack="true" v-on:onclick="onBack"></header-item>
      <header-item slot="rightItem" title="快速注册" v-on:onclick="onSignup"></header-item>
    </header-view>
    <div class="top-wrapper">
      <div class="input-wrapper">
        <img src="../../assets/change-icon/a0_user@2x.png"/>      
        <input v-model="username" placeholder="用户名/邮箱/手机号">         
      </div>
      <div class="input-wrapper">
        <img src="../../assets/change-icon/a0_key@2x.png"/>      
        <input type="password" class="bottom-input" v-model="password" placeholder="请输入密码">        
      </div>
    </div>    
    <div class="submit" @click="signin">
      <label class="text">登录</label>
    </div>
    <div class="retrieve-wrapper">
      <div class="retrieve-item" @click="onRetrieve">
        <label id="retrieve-title">忘记密码？</label>
      </div>      
    </div>
    <div class="bottom-wrapper">
      <div class="auth-title-wrapper">
        <div class="auth-line"></div>
        <label class="auth-title">第三方登录</label>
        <div class="auth-line"></div>
      </div>
      <div class="auth-bottom-wrapper">
        <div class="auth-item">
          <img class="auth-item-icon" src="../../assets/change-icon/c7_commodity_list_2@2x.png"/>      
          <label class="auth-title auth-item-title">微信</label>
        </div>
        <div class="auth-item">
          <img class="auth-item-icon" src="../../assets/change-icon/c7_commodity_list_1@2x.png"/>      
          <label class="auth-title auth-item-title">微博</label>
        </div>
        <div class="auth-item">
          <img class="auth-item-icon" src="../../assets/change-icon/c7_commodity_list_3@2x.png"/>      
          <label class="auth-title auth-item-title">QQ</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderView from '../../components/common/HeaderView';
import HeaderItem from '../../components/common/HeaderItem';

export default {
  name: 'Signin',
  components: {
    HeaderView,
    HeaderItem
  },
  methods: {
    signin() {},
    onBack() {
      this.$router.go(-1);
    },
    onSignup() {
      this.$router.push({ name: 'signup', params: { mode: 'signup' } });
    },
    onRetrieve() {
      this.$router.push({ name: 'signup', params: { mode: 'retrieve' } });
    }
  }
};
</script>

<style scoped lang='scss'>
@import 'src/style/mixin.scss';
  .container { 
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    background-color: #f0f2f5;
    .top-wrapper {
      margin-top: 10px;
      .input-wrapper {
        display: flex;        
        align-content: center;
        align-items: center;  
        padding-left: 10px;
        background-color: #fff;
        height: 44px;       
        img {
          width: 24px;
          height: 24px;
          margin: 0px;
          padding: 0px;
        }
        input {
          @include input;
          flex: 1;
        }
        .bottom-input {        
          border-bottom-width: 0px;
        }
      }
    }
  }
  .submit {
    border-radius: 4px;
    background-color: #f23030;
    height: 44px;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .text {
    color: #ffffff;
    font-size: 18px;
  }
  .bottom-wrapper {
    display: flex;
    /* flex: 1; */
    flex-direction: column;
    justify-content: flex-end;
    align-items: stretch;
    position: absolute;
    height: 300px;
    bottom: 0px;
    left: 0px;
    right: 0px;
  }
  .retrieve-wrapper {
    height: 40px;
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;  
  }
  .retrieve-item {      
    width: 75px;
    height: 40px;
    margin-left: 20px;
    margin-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;    
  }
  #retrieve-title {
    color: #f23030;
    font-size: 15px;
    text-align: center;
  }
  .auth-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 260px;
  }
  .auth-title-wrapper {
    height: 20px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .auth-title {
    color: #8f8e94;
    font-size: 14px;
  }
  .auth-line {
    display: flex;
    flex: 1;
    height: 1px;
    background-color: #d8d8d8;
    margin-left: 16px;
    margin-right: 16px;
  }
  .auth-item {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  .auth-item-icon {
    width: 60px;
    height: 60px;
  }
  .auth-item-title {
    margin-top: 12px;
  }
  .auth-bottom-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
</style>


