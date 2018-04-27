<!-- SettingAbout.vue -->
<template>
  <div class="container">
    <!-- header -->
    <mt-header class="header" title="关于我们">
      <header-item slot="left" v-bind:isBack=true v-on:onclick="goBack">
      </header-item>     
      <!-- <header-item slot="right" :icon="require('../../../assets/image/change-icon/b0_share@2x.png')" v-on:onclick="share()">
      </header-item>   -->
    </mt-header>
    <!-- body -->
    <div class="about-body">
      <div class="logoimg">
        <img class="logo" src="../../../assets/image/change-icon/logo_wenchao@2x.png">
        <p> V6.1.0 </p>
        <img class="code" src="../../../assets/image/change-icon/img_qrcode@2x.png">
        <p>扫描二维码，您的朋友也可以下载温超客户端！</p>
      </div>
      <div class="introduce">
        <p v-on:click="goIntroduce()">
          <span>公司简介</span> 
          <img src="../../../assets/image/change-icon/enter@2x.png" >
        </p>
        <!-- <p>
          <span>关于我们</span> 
          <img src="../../../assets/image/change-icon/enter@2x.png" >
        </p> -->
      </div>
      <div class="copy">
        <p>Copyright©2004-2017</p>
        <p>温超wenchao.ae版权所有</p>
      </div>
        <mt-popup v-model="popupVisible" position="bottom" class="mint-popup">
          <div class="share">
            <h3>分享到</h3>
            <div class="image">
              <label v-on:click="goWachat()">
                <img src="../../../assets/image/change-icon/c7_commodity_list_2@2x.png"> 
                <p>微信</p>
              </label>
              <label>
                <img src="../../../assets/image/change-icon/c7_commodity_list_1@2x.png"> 
                <p>微博</p>
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
      // 取消分享
      cancelInfo() {
        this.popupVisible = false;
      },
      // 分享到微信
      goWachat() {
        this.$router.push('home');
      },
      // 去公司简介页面
      goIntroduce(url) {
        this.$router.push({name: 'SettingIntroduce', params: {url: 'http://www.wenchao.ae/article-bangzhuzhongxin_wenchaojituan-102.html'}});
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
          width: 105px;
          height: 105px;
          margin-top: 12px;
          margin-bottom: 10px;
        }
        p {
          height:17px; 
          font-size:12px;
          color:rgba(124,127,136,1);
          line-height:17px;
        }
      }
      .introduce {
        padding-top:30px;
        p {
          height:44px;
          background-color: #fff;
          padding:0px 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          span {
           height:20px; 
           font-size:14px;
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
        position: absolute;
        bottom: 25px;
        left: 0;
        right: 0;
        p {
          text-align: center;
          color:#7C7F88;
          font-size:12px;
        }
      }
      .mint-popup {
        width:100%;
      }
      .share {
        width:100%;
        height:230px;
        background-color:#F6F6F6;
        h3 {
          text-align: center;
          padding-top: 24px;
          padding-bottom: 27px;
          font-size: 19px; 
          color:#7C7F88;
        }
        .image {
          display: flex;
          justify-content:space-around;
          align-items: center;
          img {
            width:60px;
            height:60px;
            padding-bottom: 12px;
          }
          p {
            text-align: center;
            font-size: 14px;
            color:#8F8E94;
          }
        }
        .cancel {
          background-color: #fff;
          text-align: center;
          height:44px;
          line-height:44px;
          position: absolute;
          width: 100%;
          bottom: 0;
          color:#4E545D;
          font-size:17px;
        }
      }
    }
  }
</style>

