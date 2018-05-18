<template>
  <div class="container">
     <!-- header -->
    <mt-header class="header" title="客服消息">
      <header-item slot="left" v-bind:isBack=true v-on:onclick="goBack">
      </header-item>
    </mt-header>
    <!-- body -->
    <div class="service-Message-body zhiCustomBtns">
	      <img class="photo" src="../../../assets/image/change-icon/avatar_service.png">
	      <div class="right-wrapper">
	        <div>
	          <span class="title" v-if="!key">温超客服</span>
            <span class="title" v-if="key">{{ key.data[0].customName }}</span>
	        </div>
	        <p class="content" v-if="!key">您好，我是温超机器人，请问有什么可以帮您？请联系我</p>
          <p class="content" v-if="key">{{ key.data[0].content }}</p>
	      </div>
        <!-- <p class="message-number" v-if="!key" v-show="false"></p>
        <p class="message-number" v-if="key" v-show="true"></p> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      key: ""
    };
  },
  created() {
    let value = this.utils.openZhichiManager();
    this.utils.getunreadCount(value, this, "key");
  },
  methods: {
    goBack() {
      this.$router.go(-1);
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
    // .message-number {
    //   width: 6px;
    //   height: 6px;
    //   background-color: #f33c3c;
    //   line-height: 12px;
    //   text-align: center;
    //   border-radius: 50%;
    //   margin: auto 15px;
    // }
  }
}
</style>


