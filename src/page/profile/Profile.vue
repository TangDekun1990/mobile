<template>
  <div class="container">
    <div class="top-wrapper">
      <div class="nav-item" id="left-nav-item" @click="goSetting">
        <img class="nav-icon" src="../../assets/image/change-icon/e0_setup@2x.png" />
      </div>
      <div class="nav-item" id="right-nav-item" @click="goNews()">
        <img class="nav-icon" src="../../assets/image/change-icon/e0_message@2x.png" />
      </div>
      <div class="top-info-wrapper">
        <div class="avatar-wrapper" @click="goProfileInfo">
        <img class="avatar" :src="getAvatarUrl" />        
      </div>
      <label class="nickname" @click="goProfileInfo">{{nickname}}</label>
      </div>       
      <div class="info-wrapper">
        <div class="info-item">{{getScore}}积分</div>
        <div class="info-item" @click="goIntegral">积分记录</div>
      </div>
    </div>
    <div class="order-header" @click="goOrder">
      <div class="order-header-item" id="order-item-left">
        <img class="order-header-icon" src="../../assets/image/change-icon/e0_order@2x.png" />
        <label class="item-title order-header-title">我的订单</label>
      </div>
      <div class="order-header-item" id="order-item-right">        
        <label class="order-subtitle">查看全部订单</label>
        <img class="indicator" src="../../assets/image/change-icon/enter@2x.png" />
      </div>
      <!-- <div class="order-header-line"></div> -->
    </div>
    <div class="order-wrapper" > 
      <order-item 
        class="order-item" 
        testAttr = 'order'
        id='0'
        :icon="require('../../assets/image/change-icon/e0_payment@2x.png')"
        title="待付款"
        >
      </order-item> 
      <order-item 
        class="order-item" 
        testAttr = 'order'
        id='1'
        :icon="require('../../assets/image/change-icon/e0_delivery@2x.png')"
        title="待发货">
      </order-item>
      <order-item 
        class="order-item" 
        testAttr = 'order'
        id='2'
        :icon="require('../../assets/image/change-icon/e0_receiving@2x.png')"
        title="待收货">
      </order-item>
      <order-item
        class="order-item" 
        testAttr = 'order'
        id='3'
        :icon="require('../../assets/image/change-icon/e0_evaluate@2x.png')"
        title="待评价">
      </order-item>
    </div>
    <div class="bottom-wrapper">
      <info-item 
        v-on:onclick="goFavourite()"       
        class="info-item-wrapper section-header" 
        :icon="require('../../assets/image/change-icon/e0_favorite@2x.png')"
        title="我的收藏">
      </info-item>
      <info-item
        v-on:onclick="goAddress"       
        class="info-item-wrapper" 
        :icon="require('../../assets/image/change-icon/e0_address@2x.png')"
        title="管理收货地址">
      </info-item>
      <info-item 
        v-on:onclick="goCoupon"
        class="info-item-wrapper section-footer" 
        :icon="require('../../assets/image/change-icon/e0_coupon@2x.png')" 
        title="我的优惠券">
      </info-item>
      <info-item 
        v-on:onclick="goHelp()"
        class="info-item-wrapper section-header" 
        :icon="require('../../assets/image/change-icon/e0_clause@2x.png')" 
        title="使用帮助">
      </info-item>
      <info-item 
        class="info-item-wrapper section-footer" 
        :icon="require('../../assets/image/change-icon/e0_phone@2x.png')" 
        title="客服电话">
      </info-item>
    </div>    
    <tabbar></tabbar>
  </div>
</template>

<script>
import Tabbar from "../../components/common/Tabbar";
import InfoItem from "./child/InfoItem";
import OrderItem from "./child/OrderItem";
import { mapState } from "vuex";
import { userProfileGet } from "../../api/network/user";
import { scoreGet } from '../../api/network/score'
import { ENUM } from '../../config/enum'
export default {
  name: "profile",
   data() {
    return {
      orderAll: 1,
      score: 0
    };
  },
  components: {
    Tabbar,
    OrderItem,
    InfoItem
  },
  created: function() {
    if (this.isOnline) {
      userProfileGet().then(response => {}, error => {});
      scoreGet().then(
        response => {
          this.score = response.score
        }, error => {          
        });
    };     
  },
  computed: {
    ...mapState({
      isOnline: state => state.auth.isOnline,
      user: state => state.auth.user
    }),
    nickname () {
      let title = "登录/注册";
      if (this.isOnline) {
        if (this.user &&
          typeof this.user != "undefined" &&
          JSON.stringify(this.user) != "{}") {
            if (this.user.nickname) {
              title = this.user.nickname;
            } else if (this.user.username) {
              title = this.user.username
            }
        }
      }
      return title;      
    },
    getAvatarUrl () {
      let url = null
      if (this.isOnline) {
        if (this.user &&
          typeof this.user != "undefined" &&
          JSON.stringify(this.user) != "{}") {
          let avatar = this.user.avatar
          if (avatar) {
            if (avatar.large && avatar.large) {
              url = avatar.large
            } else if (avatar.thumb && avatar.thumb) {
              url = avatar.thumb
            } 
          }
        }                        
      }
      if (url === null) {
        url = require('../../assets/image/change-icon/img_avatar@2x.png')
      }
      return url
    },
    getScore () {
      let score = '0'
      if (this.isOnline) {
        score = this.score
      }       
      return score 
    }
  },
  methods: {
    showLogin() {
      this.$router.push("/signin");
    },
    goIntegral() {
      this.$router.push("/integralList");
    },
    goProfileInfo() {
      if (this.isOnline) {
        this.$router.push("/profileInfo");
      } else {
        this.showLogin();
      }
    },
    goSetting() {
      this.$router.push("setting");
    },
    goNews() {
      this.$router.push('news');
    },
    goFavourite() {
      this.$router.push('collection');     
    },
    goAddress() {      
      this.$router.push('addressManage');
    },
    goCoupon() {
      this.$router.push({ name: "couponList" });
    },
    goHelp() {
      this.$router.push("help");
    },
    goOrder() {      
      this.$router.push({ name:'order', params: {'order': ENUM.ORDER_STATUS.ALL}});
    },
    
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  background-color: $mainbgColor;
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
    border-bottom: 1px solid $lineColor;
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
    color: #4e545d;
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
    height: 12 px;
    margin-left: 10px;
    margin-right: 10px;
  }
  .order-subtitle {
    font-size: 12px;
    color: #7c7f88;
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
  }
  .bottom-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    margin-bottom: 60px;
  }
  .info-item-wrapper {
    height: 44px;
  }
  .section-header {
    margin-top: 15px;
  }
  .section-footer {
    border-bottom-width: 0px;
  }
}
</style>


