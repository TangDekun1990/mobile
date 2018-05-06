<template>
  <div class="container">
    <mt-header class="header" title="我的优惠券">
      <header-item slot="left" v-bind:isBack=true v-on:onclick="goBack">
      </header-item>          
    </mt-header>
    <div class="tips-wrapper">
      <label class="tips">可使用优惠券{{total}}张</label>
    </div>    
    <div class="empty-wrapper" v-if="isEmpty">
      <img class="photo" src="../../assets/image/change-icon/coupons_empty@2x.png">
      <label class="title">您暂时没有任何优惠券</label>
    </div>
    <div class="list">
      <coupon-item
        v-for="item in items" 
        :key="item.id" 
        :item="item" 
        :isSelected="isSelected(item)"
        v-on:onclick="onclick(item)">
      </coupon-item>      
    </div>       
    <div class="submit" @click="unselect">
      <label class="text">不使用优惠券</label>
    </div>
  </div>
</template>

<script>
import { Header } from 'mint-ui'
import { HeaderItem } from '../../components/common'
import CouponItem from './child/CouponItem'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  components: {
    CouponItem,
  },
  computed: {
    ...mapState({
      total: state => state.coupon.total,
      items: state => state.coupon.items,
      selectedItem: state => state.coupon.selectedItem
    }),    
    isEmpty: function () {
      if (this.items && this.items.length === 0) {
        return true
      }
      return false
    }
  },
  methods: {
    ...mapMutations({
      selectCouponItem: 'selectCouponItem',
      unselectCouponItem: 'unselectCouponItem',
    }),
    ...mapActions({
      fetchCouponUsable: 'fetchCouponUsable'
    }),
    goBack() {
      this.$router.go(-1)
    }, 
    isSelected(item) {
      let selectedItem = this.selectedItem
      if (selectedItem && item && selectedItem.id === item.id) {
        return true
      }
      return false
    },
    onclick(item) {
      this.selectCouponItem(item)
      this.goBack()
    },   
    unselect() {
      this.unselectCouponItem()
      this.goBack()
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
    background-color: $mainbgColor;
  }
  .header {
    @include header;
  }  
  .tips-wrapper {
    height: 26px;
    background-color: #E8EAED;
    display: flex;    
    justify-content: center;
    align-items: center;
  }
  .tips {     
    font-size: 12px;
    color: #55595F;
    text-align: center;    
  }
  .list {
    flex: 1;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    margin-bottom: 54px;
  }
  .submit {    
    position: fixed;       
    height: 44px;
    left: 0px;
    right: 0px;
    bottom: 0px;    
    background-color: #fff;    
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .text {
    color: #4E545D;
    font-size: 16px;
  }
  .empty-wrapper {
    margin-top: 40px;
    height: 260px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  .photo {
    width: 112px;
    height: 112px;
  }
  .title {
    font-size: 16px;
    color: #8F8E94;
    text-align: center;
    margin-top: 30px;
  }
</style>

