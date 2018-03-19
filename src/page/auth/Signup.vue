<template>
  <div class="container">
    <header-view v-bind:title="title">
      <header-item slot="leftItem" isBack="true" v-on:onclick="onBack">
      </header-item>    
    </header-view>
    <div class="section-wrapper top-wrapper">
      <div class="input-wrapper">        
        <input v-model="username" placeholder="请输入阿联酋10位手机号">
      </div>
      <div class="input-wrapper">        
        <input class='bottom-input' v-model="code" placeholder="请输入验证码">
        <countdown-button ref="timer" class="countdown" v-on:onclick="onSendCode">
        </countdown-button>
      </div>
    </div>
    <div class="section-wrapper bottom-wrapper">
      <div class="input-wrapper">        
        <input type="password" id="username-input" v-model="password" placeholder="设置密码">
      </div>
      <div class="input-wrapper">        
        <input type="password" class='bottom-input' v-model="confirmPassword" placeholder="确认密码">
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
import HeaderView from '../../components/common/HeaderView'
import HeaderItem from '../../components/common/HeaderItem'
import CountdownButton from '../../components/common/CountdownButton'
import * as auth from '../../service/auth'
export default {
  props: {
  },
  data() {
    return {
      username: '',
      code: '',
      password: '',
      confirmPassword: '',
    }
  },
  computed: {
    title: function () {  
      let mode = this.$route.params.mode;   
      if (mode === 'signup') {
        return '快速注册'
      } else if (mode === 'bind') {
        return '绑定手机'
      } else if (mode === 'retrieve') {
        return '找回密码'
      }
    },
    confirmTitle: function () {
      let mode = this.$route.params.mode;
      if (mode === 'signup') {
        return '注册'
      } else {
        return '确认'
      } 
    },
  },
  components: {
    HeaderView,
    HeaderItem,
    CountdownButton,    
  },  
  methods: {    
    onBack() {
      this.$router.go(-1) 
    },
    onSendCode() {
      let username = this.username
      if (username.length === 0) {
        alert('请输入手机号');
        return;
      }
      auth.verifyMobile(username).then(
        (response) => {
          auth.sendCode(username).then(
            (response) => {
              this.$refs.timer.start()
            }, (error) => {
              this.$refs.timer.stop()
            }
          )
        }, 
        (error) => {

        })
    },
    check() {
      let username = this.username
      let code = this.code
      let password = this.password
      let confirmPassword = this.confirmPassword
      if (username.length === 0) {
      // this.refs.toast.show('请输入手机号');
      return;
      }
      if (code.length === 0) {
        // this.refs.toast.show('请输入验证码');
        return;
      }
      if (code.length !== 6) {
        // this.refs.toast.show('请输入6位验证码');
        return;
      }
      if (password.length === 0) {
        // this.refs.toast.show('请输入密码');
        return;
      }
      if (password.length < 6 || password.length > 20) {
        // this.refs.toast.show('请输入6-20个字符的密码');
        return;
      }
      if (confirmPassword.length === 0) {
        // this.refs.toast.show('请输入确认密码');
        return;
      }
      if (password.length !== confirmPassword.length) {
        // this.refs.toast.show('确认密码与输入密码不一致');
        return;
      }
    },
    signup() {
      this.check()
      auth.signup(this.username, this.code, this.password).then(
        (response) => {

        }, (error) => {

        }
      )
    },
    bind() {
      this.check()
      auth.bind(this.username, this.code, this.password).then(
        (response) => {

        }, (error) => {

        }
      )
    },
    retrieve() {
      this.check()
      auth.retrieve(this.username, this.code, this.password).then(
        (response) => {

        }, (error) => {

        }
      )
    },
    onSubmit() {
      let mode = this.$route.params.mode;
      if (mode === 'signup') {
        this.signup()
      } else if (mode === 'bind') {
        this.bind()
      } else if (mode === 'retrieve') {
        this.retrieve()
      }
    },
    onAgreement() {
      alert('注册协议')
    }
  }
}
</script>

<style scoped lang="scss">
@import 'src/style/mixin.scss';
  .container {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    background-color: #F0F2F5;
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
    height: 44px;
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
    width: 107px;
    height: 30px;
    margin-left: 10px;
    margin-right: 10px;
  } 
</style>