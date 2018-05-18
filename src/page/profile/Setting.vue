<template>
  <div class="container">
    <!-- header -->
    <mt-header class="header" title="设置">
      <header-item slot="left" v-bind:isBack=true v-on:onclick="goBack">
      </header-item>    
    </mt-header>
    <!-- body -->
    <div class="settings-body">
      <ul>
        <li>
          <span>展示高清图片</span>
          <mt-switch v-model ="isSwitch" v-on:change="setSwitch()"></mt-switch>
        </li>
        <!-- <li>
          <span>接收消息通知</span>
          <mt-switch v-model="index"></mt-switch>
        </li> -->
        <li v-on:click="about()">
          <span>关于我们</span>
          <img src="../../assets/image/change-icon/enter@2x.png" >
        </li>
      </ul>
    </div>
    <gk-button class="button" type="primary" v-on:click="signout" v-if="isOnline">退出登录</gk-button>
  </div>
</template>

<script>
import { HeaderItem, Button } from '../../components/common'
import { mapState, mapMutations } from 'vuex';
import { Header, MessageBox, Switch } from 'mint-ui'
export default {
  computed: {
    ...mapState({
      isOnline: state => state.auth.isOnline,
    }),
    isSwitch: {
      get:function() {
        return this.$store.state.profile.isSwitch;
      },
      set: function () {}
    }
  },

  methods: {  
    ...mapMutations({
      clearToken: 'signout',
      changeOpen: 'changeOpen'
    }),  
    goBack() {
      this.$router.go(-1) 
    },
    signout() {
      MessageBox.confirm('确认退出', '').then(action => {
        this.clearToken() 
        this.goBack() 
        let domain = window.location.protocol + '//' + window.location.host
        domain = '.wenchao.pre.geek-zoo.cn' // TODO:
        
        console.log('host is ', window.location.host)
        console.log('domain is ', domain)
        this.$cookie.delete('openid', { domain: domain })
        this.$cookie.delete('token', { domain: domain })

        let openid = this.$cookie.get('openid')
        let token = this.$cookie.get('token')       
        console.log('(openid, token) ', openid, token)
      })
    },
    about() {
      this.$router.push('/SettingAbout');
    },
    setSwitch() {
      this.changeOpen(!this.isSwitch)
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
    .header {
      @include header;
      border-bottom: 1px solid #E8EAED;
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
    .settings-body {
      width:100%;
      ul {
        li{
          height: 60px;
          display: flex;
          flex-wrap: nowrap;
          justify-content:space-between;
          align-items: center;
          padding:0px 20px;
          border-bottom:1px solid #E8EAED;
          span {
            height:16px; 
            font-size:15px;
            font-family:'PingFangSC-Regular';
            color:rgba(78,84,93,1);
            line-height:16px;
          }
          img {  
            width:7px; 
            height:11px;     
          }
        }
      }
    }
  }
  

</style>

<style>
.mint-switch-input:checked+.mint-switch-core {
  border-color: red !important;
  background-color: red !important;
}
</style>

