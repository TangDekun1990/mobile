<template>
  <div class="container">
    <mt-header class="header" title="登录">
      <header-item slot="left" v-bind:isBack=true v-on:onclick="goBack"></header-item>
      <header-item slot="right" title="快速注册" v-on:onclick="onSignup"></header-item>
    </mt-header>
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
    <div class="bottom-wrapper" v-if="isShowAuth">
      <div class="auth-title-wrapper">
        <div class="auth-line"></div>
        <label class="auth-title">第三方登录</label>
        <div class="auth-line"></div>
      </div>
      <div class="auth-bottom-wrapper">
        <div class="auth-item" v-if="isShowWechat" @click="onWechat">
          <img class="auth-item-icon" src="../../assets/change-icon/c7_commodity_list_2@2x.png"/>      
          <label class="auth-title auth-item-title">微信</label>
        </div>
        <div class="auth-item" v-if="isShowWeibo" @click="onWeibo">
          <img class="auth-item-icon" src="../../assets/change-icon/c7_commodity_list_1@2x.png"/>      
          <label class="auth-title auth-item-title">微博</label>
        </div>
        <div class="auth-item" v-if="isShowQQ" @click="onQQ">
          <img class="auth-item-icon" src="../../assets/change-icon/c7_commodity_list_3@2x.png"/>      
          <label class="auth-title auth-item-title">QQ</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderItem from '../../components/common/HeaderItem';
import * as authBase from '../../api/auth-base'
import { Indicator, Toast, Header } from 'mint-ui'
import { mapMutations, mapActions, mapState } from 'vuex'
export default {
  name: 'Signin',
  components: {
    HeaderItem
  },
  data() {
    return {
      username: '',      
      password: '',
    }
  },
  computed: {
    ...mapState({
      config: state => state.config.config,
      feature: state => state.config.feature,
    }),
    isShowWechat: function () {
      if (this.feature['signin.qq']) {
        return true
      }
      return false
    },
    isShowWeibo: function () {
      if (this.feature['signin.weibo']) {
        return true
      }
      return false
    },
    isShowQQ: function () {
      if (this.feature['signin.qq']) {
        return true
      }
      return false
    },
    isShowAuth: function () {
      if (this.isShowWechat || this.isShowWeibo || this.isShowQQ) {
        return true
      }
      return false
    }
  },
  created: function () {
    this.fetchConfig()
  },
  methods: {
    ...mapMutations({
      saveToken: 'signin'
    }),
    ...mapActions({
      fetchConfig: 'fetchConfig'
    }),
    signin() {      
      let username = this.username
      let password = this.password
      if (username.length === 0) {
        Toast('请输入用户名/邮箱/手机号');
        return;
      } 
      // TODO: 用户名（为手机号或邮箱）校验
      if (password.length === 0) {
        Toast('请输入密码');
        return;
      }
      if (password.length < 6) {
        Toast('至少输入6位密码');
        return;
      }
      Indicator.open()
      authBase.authSignin(username, password).then(
        (response) => {
          Indicator.close()
          this.saveToken({ 'token' : response.token, 'user': response.user })
          this.goBack()
        }, (error) => {
          Indicator.close()
          Toast(error.errorMsg)
        }
      )
    },
    goBack() {
      this.$router.go(-1);
    },
    onSignup() {
      this.$router.push({ name: 'signup', params: { mode: 'signup' } });
    },
    onRetrieve() {
      this.$router.push({ name: 'signup', params: { mode: 'retrieve' } });
    },
    onWechat() {

    },
    onWeibo() {
      
    },
    onQQ() {
      
    },
  }
};
</script>

<style scoped lang='scss'>
@import 'src/style/mixin.scss';
  .container { 
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
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
  .header {
    @include header;
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
  .bottom-wrapper {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: flex-end;
    align-items: stretch;
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
    margin-bottom: 40px;
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
    margin-left: 15px;
    margin-right: 15px;
    margin-bottom: 20px;
  }  
</style>


