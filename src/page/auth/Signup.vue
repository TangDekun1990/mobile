<template>
  <div class="container">
    <mt-header class="header" v-bind:title="title">
      <header-item slot="left" v-bind:isBack=true v-on:onclick="goBack">
      </header-item>    
    </mt-header>
    <div class="section-wrapper top-wrapper">
      <div class="input-wrapper">        
        <input v-model="username" placeholder="请输入阿联酋10位手机号">
      </div>
      <div class="input-wrapper">        
        <input class='bottom-input' v-model="code" placeholder="请输入验证码" maxlength="6">
        <countdown-button ref="timer" class="countdown" v-on:onclick="onVerify">
        </countdown-button>
      </div>
    </div>
    <div class="section-wrapper bottom-wrapper">
      <div class="input-wrapper">        
        <input type="password" id="username-input" v-model="password" placeholder="设置密码" maxlength="20">
      </div>
      <div class="input-wrapper">        
        <input type="password" class='bottom-input' v-model="confirmPassword" placeholder="确认密码" maxlength="20">
      </div>
    </div>    
    <label class="tips">6-20位数字/字母/符号</label>
    <div class="submit" @click="onSubmit">
      <label class="text">{{confirmTitle}}</label>
    </div> 
    <div class="link-wrapper">
      <span class="left-text">点击注册表示同意</span>
      <span class="right-text" @click="onAgreement">《温超商城用户协议》</span>
    </div>
  </div>
</template>

<script>
import { HeaderItem, CountdownButton } from '../../components/common'
import { Indicator, Toast, Header } from 'mint-ui'
import { mapMutations } from 'vuex'
import * as authMobile from '../../api/network/auth-mobile'
import * as site from '../../api/network/site'
import { authMobileVerify } from '../../api/network/auth-mobile';
export default {
  props: {
  },
  data() {
    return {
      username: '',
      code: '',
      password: '',
      confirmPassword: '',
      aggrementUrl: '',
    }
  },
  computed: {
    getMode: function () {
      let mode = this.$route.params.mode
      if (mode === undefined) {
        mode = 'signup'
      }
      return mode
    },
    title: function () {  
      let mode = this.getMode;   
      if (mode === 'signup') {
        return '快速注册'
      } else if (mode === 'bind') {
        return '绑定手机'
      } else if (mode === 'retrieve') {
        return '找回密码'
      }
    },
    confirmTitle: function () {
      let mode = this.getMode;
      if (mode === 'signup') {
        return '注册'
      } else {
        return '确认'
      } 
    },
  },
  created: function () {
    let mode = this.getMode;   
      if (mode === 'signup') {
        site.siteGet().then(
          (response) => { 
            if (response && response.site_info) {
              this.aggrementUrl = response.site_info.terms_url  
            }
        }, 
        (error) => {
        })        
      }
  },    
  methods: {  
    ...mapMutations({
      saveToken: 'signin'
    }),  
    goBack() {
      this.$router.go(-1) 
    },
    goProfile() {
      this.$router.go(-2) 
    },    
    onVerify() {
      let username = this.username
      if (username.length === 0) {
        Toast('请输入手机号');
        return;
      }
      Indicator.open()
      let mode = this.getMode;
      // 注册时需要先验证手机号是否已存在
      if (mode === 'signup') {
        authMobile.authMobileVerify(username).then(
        (response) => {                    
          this.onSendCode(username)
        }, 
        (error) => {
          Indicator.close()
          Toast(error.errorMsg)
        })
      } else {
        this.onSendCode(username)
      }      
    },
    onSendCode(username) {
      authMobile.authMobileSend(username).then(
        (response) => {
          Indicator.close()
          this.$refs.timer.start()
        }, (error) => {
          Indicator.close()
          Toast(error.errorMsg)
          this.$refs.timer.stop()
        }
      )
    },
    check() {
      let username = this.username
      let code = this.code
      let password = this.password
      let confirmPassword = this.confirmPassword
      if (username.length === 0) {
        Toast('请输入手机号');
        return false;
      }
      if (code.length === 0) {
        Toast('请输入验证码');
        return false;
      }
      if (code.length !== 6) {
        Toast('请输入6位验证码');
        return false;
      }
      if (password.length === 0) {
        Toast('请输入密码');
        return false;
      }
      if (password.length < 6 || password.length > 20) {
        Toast('请输入6-20个字符的密码');
        return false;
      }
      if (confirmPassword.length === 0) {
        Toast('请输入确认密码');
        return false;
      }
      if (password.length !== confirmPassword.length) {
        Toast('确认密码与输入密码不一致');
        return false;
      }
      if (password !== confirmPassword) {
        Toast('确认密码与输入密码不一致');
        return false;
      }
      return true;
    },
    signup() {
      if (!this.check()) {
        return;
      }
      Indicator.open()
      authMobile.authMobileSignup(this.username, this.code, this.password).then(
        (response) => {
          this.saveToken({ 'token' : response.token, 'user': response.user })
          Indicator.close()
          this.goProfile()
        }, (error) => {
          Indicator.close()
          Toast(error.errorMsg)
        }
      )
    },
    bind() {
      if (!this.check()) {
        return;
      }
      Indicator.open()
      authMobile.authMobileBinding(this.username, this.code, this.password).then(
        (response) => {
          Indicator.close()
        }, (error) => {
          Indicator.close()
          Toast(error.errorMsg)
        }
      )
    },
    retrieve() {
      if (!this.check()) {
        return;
      }
      Indicator.open()
      authMobile.authMobileReset(this.username, this.code, this.password).then(
        (response) => {
          Indicator.close()
          Toast('密码找回成功，请重新登录')
          setTimeout(() => {
            this.goBack()
          }, 2000)          
        }, (error) => {
          Indicator.close()
          Toast(error.errorMsg)
        }
      )
    },
    onSubmit() {
      let mode = this.getMode;
      if (mode === 'signup') {
        this.signup()
      } else if (mode === 'bind') {
        this.bind()
      } else if (mode === 'retrieve') {
        this.retrieve()
      }
    },
    onAgreement() {
      this.$router.push({ name: 'agreement', params: {'url': this.aggrementUrl}})
    }
  }
}
</script>

<style scoped lang="scss">
  .container {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    background-color: $mainbgColor;
    .section-wrapper {       
      display: flex;    
      flex-direction: column;
      justify-content: flex-start;
      align-items: stretch;
      background-color: #FFFFFF;
      .input-wrapper {  
        display: flex;       
        flex-direction: row;
        align-content: flex-start;
        align-items: center;
        background-color: #fff;
        height: 44px;
        padding-left: 10px;
        input {
          @include input;   
          flex: 1; 
        }
        .bottom-input {
          border-bottom-width: 0px;
        }
      }
    }
    .link-wrapper {
      height: 44px;
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      justify-content: center; 
      align-items: stretch;
      span {
        font-size: 14px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;  
      }
      .left-text {  
        color: #5B636F;
      }
      .right-text {
        color: #F23030;
      }
    }    
  }
  .header {
    @include header;
  }
  .top-wrapper { 
    margin-top: 10px;      
  }
  .bottom-wrapper { 
    margin-top: 10px;      
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
  .countdown {
    width: 112px;
    height: 30px;
    margin-left: 10px;
    margin-right: 10px;
  } 
</style>
