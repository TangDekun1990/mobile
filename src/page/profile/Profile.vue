<template>
  <div class="container">
    <div class="top-wrapper">
      <div class="nav-item" id="left-nav-item" @click="goSetting">
        <img class="nav-icon" src="../../assets/change-icon/e0_setup@2x.png" />
      </div>
      <div class="nav-item" id="right-nav-item">
        <img class="nav-icon" src="../../assets/change-icon/e0_message@2x.png" />
      </div>
      <div class="top-info-wrapper">
        <div class="avatar-wrapper" @click="goProfileInfo">
        <img class="avatar" src="../../assets/change-icon/img_avatar@2x.png" />        
      </div>
      <label class="nickname" @click="goProfileInfo">{{nickname}}</label>
      </div>       
      <div class="info-wrapper">
        <div class="info-item">0积分</div>
        <div class="info-item">积分记录</div>
      </div>
    </div>
    <div class="order-header">
      <div class="order-header-item" id="order-item-left">
        <img class="order-header-icon" src="../../assets/change-icon/e0_order@2x.png" />
        <label class="item-title order-header-title">我的订单</label>
      </div>
      <div class="order-header-item" id="order-item-right">        
        <label class="order-subtitle">查看全部订单</label>
        <img class="indicator" src="../../assets/change-icon/enter@2x.png" />
      </div>
      <div class="order-header-line"></div>
    </div>
    <div class="order-wrapper">
      <div class="order-item">
        <img class="order-item-icon" src="../../assets/change-icon/e0_payment@2x.png" />
        <label class="item-title order-item-title">待付款</label>
      </div>
      <div class="order-item">
        <img class="order-item-icon" src="../../assets/change-icon/e0_delivery@2x.png" />
        <label class="item-title order-item-title">待发货</label>
      </div>
      <div class="order-item">
        <img class="order-item-icon" src="../../assets/change-icon/e0_receiving@2x.png" />
        <label class="item-title order-item-title">待收货</label>
      </div>
      <div class="order-item">
        <img class="order-item-icon" src="../../assets/change-icon/e0_evaluate@2x.png" />
        <label class="item-title order-item-title">待评价</label>
      </div>
    </div>
    <div class="info-item-wrapper section-header">
      <img class="info-item-icon" src="../../assets/change-icon/e0_favorite@2x.png" />
      <label class="item-title info-item-title">我的收藏</label>
      <img class="indicator" src="../../assets/change-icon/enter@2x.png" />
    </div>
    <div class="info-item-wrapper">
      <img class="info-item-icon" src="../../assets/change-icon/e0_address@2x.png" />
      <label class="item-title info-item-title">管理收货地址</label>
      <img class="indicator" src="../../assets/change-icon/enter@2x.png" />
    </div>
    <div class="info-item-wrapper section-footer">
      <img class="info-item-icon" src="../../assets/change-icon/e0_coupon@2x.png" />
      <label class="item-title info-item-title">优惠券</label>
      <img class="indicator" src="../../assets/change-icon/enter@2x.png" />
    </div>
    <div class="info-item-wrapper section-header">
      <img class="info-item-icon" src="../../assets/change-icon/e0_clause@2x.png" />
      <label class="item-title info-item-title">使用帮助</label>
      <img class="indicator" src="../../assets/change-icon/enter@2x.png" />
    </div>
    <div class="info-item-wrapper section-footer">
      <img class="info-item-icon" src="../../assets/change-icon/e0_phone@2x.png" />
      <label class="item-title info-item-title">客服电话</label>
      <img class="indicator" src="../../assets/change-icon/enter@2x.png" />
    </div>
    <tabbar></tabbar>
  </div>
</template>

<script>
import Tabbar from '../../components/common/Tabbar'
import { mapState } from 'vuex'
export default {
  name: 'profile',
  components: {
    Tabbar,
  },
  computed: {
    ...mapState({
      isOnline: state => state.auth.isOnline,
      user: state => state.auth.user,
    }),
    nickname: function () {
      let title = '登录/注册'
      if (this.isOnline) {
        if (this.user && typeof this.user != 'undefined' && JSON.stringify(this.user) != '{}' ) {
          title = this.user.nickname
        }        
      }
      return title
    }
  },
  methods: {
    showLogin() {
      this.$router.push('/signin')
    },
    goProfileInfo() {
      if (this.isOnline) {
        this.$router.push('/profileInfo')
      } else {
        this.showLogin()
      }
    },
    goSetting() {
      this.$router.push('setting')
    }
  },
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin.scss';
  .container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    background-color: #f0f2f5;
    .top-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;      
      align-items: center;
      height: 225px;
      @include linear-gradient( #EAD6CE, #E2E3DF);
      .top-info-wrapper {
        flex: 1;
        width: 100%;
        display: flex;
        flex-direction: column; 
        justify-content: flex-start;      
        align-items: center;     
      }
    }
    .nav-item {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 44px;
      height: 44px;      
      top: 21px;
    }
    #left-nav-item {
      left: 2px;
    }
    #right-nav-item {
      right: 2px;
    }
    .nav-icon {
      width: 24px;
      height: 24px;      
    }
    .avatar-wrapper {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      width: 76px;
      height: 76px;
      border-radius: 38px;
      background-color: #fff;
      margin-top: 50px;   
      .avatar { 
        width: 72px;
        height: 72px;
        border-radius: 36px;
      }
    } 
    .nickname {
      margin-top: 20px;
      font-size: 16px;
      color: #646464;
      text-align: center;
      margin-left: 20px;
      margin-right: 20px;
    }
    .info-wrapper {
      width: 100%;
      height: 40px;
      display: inline-flex;
      flex-direction: row;
      justify-content: flex-start;
      align-content: stretch;
      background-color: #fff;
      background-color: #000000; 
      opacity: 0.1;
    }
    .info-item {
      flex: 1;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      color: #fff;   
    }
    .order-header {
      height: 44px;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-content: stretch;
      background-color: #fff;
      border-bottom: 1px solid #E8EAED;
    }
    .order-header-item {
      flex: 1;
      display: flex;
      flex-direction: row;
      align-items: center;    
    }
    #order-item-left {
      justify-content: flex-start;
      margin-left: 10px;
    }
    #order-item-right {
      justify-content: flex-end;
    }
    .item-title {
      font-size: 14px;
      color: #4E545D;
    }
    .order-header-icon {
      width: 18px;
      height: 18px;
    }
    .order-header-title {
      margin-left: 8px;
    }
    .indicator {
      width: 7px;
      height: 12  px;
      margin-left: 10px;
      margin-right: 10px;      
    }
    .order-subtitle {
      font-size: 12px;
      color: #7C7F88;
    }    
    .order-wrapper {
      height: 88px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: stretch;
      background-color: #fff;
    }
    .order-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
    }
    .order-item-icon {
      width: 28px;
      height: 28px;
      margin-top: 19px;
    }
    .order-item-title {
      margin-top: 8px;
    }
    .info-item-wrapper {
      height: 44px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      background-color: #fff;
      border-bottom: 1px solid #E8EAED; 
    }
    .info-item-icon {
      width: 22px;
      height: 22px;
      margin-left: 21px;
    }
    .info-item-title {
      flex: 1;
      margin-left: 19px;
    }
    .section-header {
      margin-top: 15px;
    }
    .section-footer {
      border-bottom-width: 0px;
    }
  }
</style>


