<template>
  <div class="containers">
    <!-- header -->
    <mt-header class="header" :title="getTitle">
      <header-item slot="left" v-bind:isBack=true v-on:onclick="goBack"></header-item>  
      <mt-button slot="right" icon="more" v-on:click="getRefresh()"></mt-button>   
    </mt-header>
    <!-- body -->
    <div class="bullet" v-show="isShow">
      <div class="refresh">
        <img src="../../../assets/image/change-icon/enter@2x.png">
        <span>刷新</span>
      </div>
      <div class="shares" v-on:click="getShare()">
        <img src="../../../assets/image/change-icon/enter@2x.png">
        <span>分享</span>
      </div>
    </div>
    <mt-popup v-model="popupVisible" position="bottom" class="mint-popup">
      <div class="share">
            <h4>分享到</h4>
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
    <webview :url.asyc="getUrl">
    </webview>
  </div>
</template>

<script>
import { HeaderItem, Webview } from '../../../components/common'
import { Header } from 'mint-ui'
export default {
  data() {
    return {
       isShow:false,
       popupVisible: false,
    }
  },
  computed: {
    getUrl: function () {
      let url = this.$route.params.url;
      return url 
    },
    getTitle: function() {
      let title = this.$route.params.title;
      return title
    }
  },
  methods: {   
    goBack() {
      this.$router.go(-1) 
    },   
    getRefresh() {
      this.isShow = !this.isShow               
    },
    getShare() {
      this.popupVisible = true;
    },
    goWachat() {
      this.$router.push('home');
    }
  }
}
</script>

<style lang="scss" scoped>
  .containers {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    background-color: $mainbgColor;
    .header {
      @include header;
      padding:0;
    }
    .bullet {
      background-color: rgba(68,68,68,0.9);
      width: 90px;
      height: 80px;
      position: absolute;
      top: 50px;
      right: 0px;
      .refresh, .shares {
        display: flex;
        justify-content: space-between;
        padding:10px 15px;
        border-bottom:1px solid #E8EAED;
        img {
          width:20px;
          height:20px;
        }
        span {
          color:#f9f9f9;
        }
      }
       
    }
    .share {
        width:100%;
        height:230px;
        background-color:#F6F6F6;
        h4 {
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
  
</style>