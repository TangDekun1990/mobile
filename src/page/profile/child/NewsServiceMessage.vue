<template>
  <div class="container">
     <!-- header -->
    <mt-header class="header" title="客服消息">
      <header-item slot="left" v-bind:isBack=true v-on:onclick="goBack">
      </header-item>
    </mt-header>
    <!-- body -->
    <div class="service-Message-body">
    	<a href="https://www.sobot.com/chat/h5/index.html?sysNum=5b696ae2d5394f06b558e64ebbaf3be7&back=1&titleFlag=2&customTtile='智齿客服' ">
	      <img class="photo" src="../../../assets/image/change-icon/avatar_service.png">
	      <div class="right-wrapper">
	        <div>
	          <span class="title">温超客服</span>
	          <p class="message-number">
	            <span>6</span>
	          </p>
	        </div>
	        <p class="content">您好，我是温超机器人，请问有什么可以帮您？请联系我</p>
	      </div>
	    </a>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goService() {
      console.log("温超客服");
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  .header {
    @include header;
    border-bottom: 1px solid #e8eaed;
  }
  .service-Message-body {
    background-color: #fff;
    border-bottom: 1px solid #e8eaed;
    a {
      display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
      .photo {
        width: 50px;
        height: 50px;
        padding: 15px;
      }
      .right-wrapper {
        padding: 15px 19px 15px 0px;
        overflow: hidden;
        > div {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .title {
            color: #4e545d;
            font-size: 14px;
          }
          .message-number {
            display: block;
            top: 5px;
            right: 20px;
            width: 16px;
            height: 16px;
            background-color: #f33c3c;
            line-height: 12px;
            text-align: center;
            border-radius: 30px;
            span {
              font-size: 12px;
              color: #fff;
            }
          }
        }
        .content {
          color: #7c7f88;
          font-size: 12px;
          margin-top: 10px;

          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>


