<template>
  <div class="container">
    <!-- header -->
    <mt-header class="header" title="通知消息">
      <header-item slot="left" v-bind:isBack=true v-on:onclick="goBack">
      </header-item>    
    </mt-header>
    <!-- body -->
    <div class="notice-message-body" v-for="(item, index) in NoticeMessage" :key="index" v-on:click="goNotice(item.link)" :disabled= "!isClick">
      <p>{{item.created_at * 1000 | convertTime }}</p>
      <div class="notice-track">
        <span>{{item.title}}</span>
        <div class="notice-status"> 
          <p>{{item.content}}</p>
          <div class="arrow-right">
            <img src="../../../assets/image/change-icon/enter@2x.png">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { HeaderItem } from '../../../components/common'
import { Header } from 'mint-ui'
import { messageSystemList } from '../../../api/network/message' //通知消息
import { openLink } from '../../cardpage/deeplink'
export default { 
  data() {
    return {
      NoticeMessage: [],
      isClick: ''
    }
  },
  created() {
    this.getmessageSystemList();
  },
  methods: {  
    goBack() {
      this.$router.go(-1) 
    },
    // 获取通知消息数据
    getmessageSystemList() {
      messageSystemList(1, 10).then( res => {
        if(res) {
          this.NoticeMessage = res.messages;
        }
      })
    },
    // 去到通知消息详情页面
    goNotice(link) {            
      if (link && link.length) { 
        openLink(this.$router, link)
      }
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
    .header {
      @include header;
    }
     .notice-message-body {
      width:100%;
      height: 100%;
      >p {
        text-align: center;
        margin-top:20px;
        margin-bottom:10px;
        font-size:12px;
        color: #7C7F88;
      }
      .notice-track {
        height:100%; 
        background:rgba(255,255,255,1);
        border-radius: 2px ; 
        margin: 0px 10px;
        span {
          display: inline-block;
          margin:12px 0px 14px 15px;
          font-size:14px;
          color:rgba(78,84,93,1);
        }
        .notice-status {
          display: flex;
          justify-content: space-between;
          align-items: center;
          p {
            font-size: 13px;
            color:rgba(124,127,136,1);
            width:100%;
            height:100%;
            padding:0px 30px 14px 15px;
          }
          .arrow-right {
            img {
              width:5px;
              height:10px;
              padding-right:12px;
              padding-left:13px;
              padding-bottom:43px;
            }
          }
        }
      }
    }
  }

</style>


