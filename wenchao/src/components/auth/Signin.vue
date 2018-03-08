<template>
  <div id="signin">
    <div class="input-wrapper" id="username-input">
      <div class="input-icon">
        <img id="username-icon" src="../../assets/a1_phone.png"/>
      </div>      
      <input class="input-item" v-model="username" placeholder="用户名/邮箱/手机号">
    </div>
    <div class="input-wrapper" id="password-input">
      <div class="input-icon">
        <img id="password-icon" src="../../assets/a1_password.png"/>
      </div>      
      <input class="input-item" v-model="password" placeholder="请输入密码">
    </div>
    <div class="submit" @click="signin">
      <label class="text">登录</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Signin',
  methods: {
    signin() {
      alert('登录');
    }
  }
}
</script>

<style scoped>
  #signin {
    width: 100%;
    height: 100%;
    background-color: #F0F2F5;
    .input-wrapper {
      border: 1px solid red;
    }
  }
  .input-wrapper {
    height: 44px;  
    -webkit-display: flex;
    -moz-display: flex;
    justify-content: flex-start;   
    align-items: center;
    background-color: #fff;
  }
  .input-icon {
    width: 44px;
    height: 44px;
    display: flex;
    justify-content: center;
    align-content: center;
  }
  #username-icon {
    width: 16px;
    height: 17px;
  }
  #password-icon {
    width: 12px;
    height: 22px;
  }
  .input-item {
    flex: 1;
    height: 44px;
    margin-left: 0px;
    margin-right: 0px;
    border: none;
  }
  #username-input {
    margin-top: 10px;  
    border-bottom-width: 1px;
    border-bottom-color: #E8EAED  
  }
  #password-input {
    margin-top: 0px;    
  }
  .submit {
    border-radius: 4px;
    background-color: #F23030;
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
</style>


