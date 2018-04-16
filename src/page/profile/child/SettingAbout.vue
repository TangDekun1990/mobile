<!-- SettingAbout.vue -->
<template>
  <div class="container">
    <!-- header -->
    <mt-header class="header" title="关于我们">
      <header-item slot="left" v-bind:isBack=true v-on:onclick="goBack">
      </header-item>     
      <header-item slot="right" :icon="require('../../../assets/image/change-icon/b0_share@2x.png')">
      </header-item>        
    </mt-header>
    <!-- body -->
    <div class="about-body">
      <div class="logoimg">
        <img class="logo" src="../../../assets/image/change-icon/logo_wenchao@2x.png">
        <p>For iPhone V6.1.0</p>
        <img class="code" src="../../../assets/image/change-icon/default_image_02@2x.png">
        <p>扫描二维码，您的朋友也可以下载温超客户端！</p>
      </div>
      <div>
        <p>
          <span>公司简介</span> 
          <img src="../../../assets/image/change-icon/enter@2x.png" >
        </p>
        <p>
          <span>关于我们</span> 
          <img src="../../../assets/image/change-icon/enter@2x.png" >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      goBack() {
        this.$router.go(-1) 
      },
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
          padding:12px; 
        }
        p {
          height:17px; 
          font-size:12px;
          font-family:'PingFangSC-Regular';
          color:rgba(124,127,136,1);
          line-height:17px;
        }
      }
    }
  }
</style>

