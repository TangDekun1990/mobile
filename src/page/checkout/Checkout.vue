<template>
  <div class="container">
    <mt-header class="header" title="确认订单">
      <header-item slot="left" v-bind:isBack=true v-on:onclick="goBack">
      </header-item> 
      <header-item slot="right" title="联系客服" v-on:onclick="rightClick">
      </header-item>        
    </mt-header>
    <checkout-address class="address" v-on:onclick="goAddress">
    </checkout-address>
    <checkout-goods class="goods section-header" v-on:onclick="goGoodsList">
    </checkout-goods>
    <checkout-item class="item" title="配送方式" subtitle="温超物流" v-on:onclick="goShipping">
    </checkout-item>
    <checkout-item class="item section-header" title="送货时间" subtitle="3月31日[周五] 09:00-19:00" v-on:onclick="goDuration">
    </checkout-item>
    <checkout-item class="item section-header" title="发票类型" subtitle="纸质发票" v-on:onclick="goInvoice">
    </checkout-item>
    <checkout-item class="item section-header" title="优惠券" subtitle="-AED 15.00" v-on:onclick="goCouponList">
    </checkout-item>  
    <checkout-comment class="comment section-header">
    </checkout-comment>
    <div class="desc section-header section-footer">
      <checkout-desc class="desc-item" title="商品金额" subtitle="AED 518.46">
      </checkout-desc>
      <checkout-desc class="desc-item" title="税额" subtitle="AED 25.46">
      </checkout-desc>
      <checkout-desc class="desc-item" title="运费" subtitle="AED 10.46">
      </checkout-desc>
      <checkout-desc class="desc-item" title="优惠券" subtitle="-AED 18.46">
      </checkout-desc>
    </div>
    <div class="bottom-wrapper">
      <div class="amount-wrapper">
        <label class="amount">实付款: AED 518.47</label>
      </div>     
      <button class="submit">提交订单</button>
    </div>
  </div>
</template>

<script>
import { Header } from 'mint-ui'
import { HeaderItem } from '../../components/common'
import CheckoutAddress from './child/CheckoutAddress'
import CheckoutGoods from './child/CheckoutGoods'
import CheckoutItem from './child/CheckoutItem'
import CheckoutComment from './child/CheckoutComment'
import CheckoutDesc from './child/CheckoutDesc'
export default {
  components: {
    CheckoutAddress,
    CheckoutGoods,
    CheckoutItem,
    CheckoutComment,
    CheckoutDesc,
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    rightClick() {
      // TODO:
    },
    goAddress() {
      // TODO:
      this.$router.push('addressList')
    },    
    goGoodsList() {      
      this.$router.push('goodsList')
    },
    goShipping() {
      // TODO:      
    },
    goInvoice() {
      // TODO:      
    },
    goDuration() {
      // TODO:      
    },
    goCouponList() {      
      this.$router.push('couponUsable')
    },  
    chectout() {
      // TODO: 确认订单
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
  }
  .header {
    @include header;
  }
  .address {
    height: 100px;
  }
  .goods {
    height: 90px;
  }
  .item {
    height: 50px;
  }
  .section-header {
    margin-top: 8px;
  }
  .section-footer {
    margin-bottom: 8px;
  }
  .comment {
    height: 145px;
  }
  .desc {
    height: 140px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .desc-item {
    flex: 1;    
  }
  .bottom-wrapper {
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
  } 
  .amount-wrapper {    
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background-color: #fff;
  }
  .amount {
    flex: 1;    
    font-size: 16px;
    color: #E7010E;
    text-align: right;
    padding-right: 15px;
  }
  .submit {
    width: 150px;
    background-color: #F23030;
    font-size: 16px;
    color: #fff;
    text-align: center;
    border: none;
    &:focus {
      outline-style: none;
    }
  }
</style>

