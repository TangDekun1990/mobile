<!-- SettingAbout.vue -->
<template>
  <div class="container">
    <!-- header -->
    <mt-header class="header" title="关于我们">
      <header-item slot="left" v-bind:isBack=true v-on:onclick="goBack">
      </header-item>     
      <header-item slot="right" :icon="require('../../../assets/image/change-icon/b0_share@2x.png')" v-on:onclick="share()">
      </header-item>  
    </mt-header>
    <!-- body -->
    <div class="about-body">
      <div class="logoimg">
        <img class="logo" src="../../../assets/image/change-icon/logo_wenchao@2x.png">
        <p>For iPhone V6.1.0</p>
        <img class="code" src="../../../assets/image/change-icon/img_qrcode@2x.png">
        <p>扫描二维码，您的朋友也可以下载温超客户端！</p>
      </div>
      <div class="introduce">
        <p>
          <span>公司简介</span> 
          <img src="../../../assets/image/change-icon/enter@2x.png" >
        </p>
        <p>
          <span>关于我们</span> 
          <img src="../../../assets/image/change-icon/enter@2x.png" >
        </p>
      </div>
      <div class="copy">
        <p>Copyright©2004-2017</p>
        <p>温超wenchao.ae版权所有</p>
      </div>
       <mt-popup v-model="popupVisible" position="bottom" class="mint-popup">
      <div class="share">
        <p>分享到</p>
        <div class="image">
          <label v-on:click="goWachat()">
            <img src="../../../assets/image/change-icon/c7_commodity_list_2@2x.png"> 
            <p>微信</p>
          </label>
          <label>
            <img src="../../../assets/image/change-icon/c7_commodity_list_3@2x.png"> 
            <p>QQ</p>
          </label>
        </div>
        <p class="cancel" v-on:click="cancelInfo()">取消</p>
      </div>     
    </mt-popup>
    </div>
  </div>
</template>

<script>
import { Actionsheet } from 'mint-ui'
  export default {
    data() {
      return {
        popupVisible: false, 
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1) 
      },
      share() {
        this.popupVisible = true;
      },
      cancelInfo() {
        this.popupVisible = false;
      },
      goWachat() {
        this.$router.push('home');
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
    }
    .about-body {
      background:rgba(240,242,245,1);
      .logoimg {
        text-align: center;
        .logo {
          width:140px;
          height:40px;
          margin-top: 14px;
        }
        .code {
          width: 150px;
          height: 150px;
          // padding:12px; 
        }
        p {
          height:17px; 
          font-size:12px;
          font-family:'PingFangSC-Regular';
          color:rgba(124,127,136,1);
          line-height:17px;
        }
      }
      .introduce {
        padding-top:30px;
        p {
          height:40px;
          background-color: #fff;
          padding:0px 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom:1px solid #E8EAED;
          span {
           height:20px; 
           font-size:14px;
           font-family:'PingFangSC-Regular';
           color:rgba(78,84,93,1);
           line-height:20px;
          }
          img {
            width:5px;
            height:10px; 

          }
        }
      }
      .copy {
        padding:207px 0px 25px 0px;
        p {
          text-align: center;
        }
      }
      .mint-popup {
        width:100%;
      }
      .share {
        width:100%;
        height:200px;
        background:rgba(240,242,245,1);
        p {
          text-align: center;
          padding-top: 15px;
          font-size: 16px; 
        }
        .image {
          display: flex;
          justify-content:space-around;
          align-items: center;
          padding-bottom:20px;
          img {
            width:60px;
            height:60px;
          }
        }
        .cancel {
          background-color: #fff;
          padding-bottom:8px;
        }
      }
    }
  }
</style>

