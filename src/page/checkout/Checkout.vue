<template>
  <div class="container">
    <mt-header class="header" title="确认订单">
      <header-item slot="left" v-bind:isBack=true v-on:onclick="goBack">
      </header-item> 
      <header-item slot="right" title="联系客服" v-on:onclick="rightClick">
      </header-item>        
    </mt-header>
    <checkout-address class="address" v-on:onclick="goAddress" v-bind:item="getSelectedAddress">
    </checkout-address>
    <checkout-goods class="goods section-header" v-on:onclick="goGoodsList">
    </checkout-goods>
    <checkout-item class="item" title="配送方式" :subtitle="getShippingName" v-on:onclick="goShipping">
    </checkout-item>
    <checkout-item class="item section-header" title="送货时间" :subtitle="getSelectedDateStr" v-on:onclick="goDuration">
    </checkout-item>
    <checkout-item class="item section-header" title="发票类型" :subtitle="getInoviceTitle" v-on:onclick="goInvoice">
    </checkout-item>
    <checkout-item class="item section-header" title="优惠券" :subtitle="getCouponName" :tips="getCouponTips" v-on:onclick="goCouponList">
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
    <delivery-time 
      ref="timePicker"  
      v-on:onClickDate="onClickDate"
      v-on:onClickTime="onClickTime">
    </delivery-time>
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
import DeliveryTime from './DeliveryTime'
import { mapState, mapMutations, mapActions } from 'vuex'
import * as consignee from '../../api/network/consignee'
import { Toast } from 'mint-ui'
export default {
  components: {
    CheckoutAddress,
    CheckoutGoods,
    CheckoutItem,
    CheckoutComment,
    CheckoutDesc,
    DeliveryTime,
  },
  computed: {
    ...mapState({
      defaultAddress: state => state.address.defaultItem,
      selectedAddress: state => state.address.selectedItem,
      addressItems: state => state.address.items,
      selectedShipping: state => state.shipping.selectedItem,
      couponTotal: state => state.coupon.total,
      selectedCoupon: state => state.coupon.selectedItem,
      invoice: state => state.invoice,
      selectedDate: state => state.delivery.selectedDate,
      selectedTime: state => state.delivery.selectedTime,
    }),
    getSelectedAddress: function() {
      let item = this.selectedAddress
      if (item === null) {
        // 没有默认地址时，第一个地址为当前选中的地址       
        if (this.defaultAddress === null) {
          let items = this.addressItems
          if (items && items.length) {
            this.selectAddressItem(items[0])
          }          
        } else {
          this.selectAddressItem(this.defaultAddress)
        }
      }      
      return this.selectedAddress    
    },
    getShippingName: function () {
      let name = ''
      let item = this.selectedShipping
      if (item && item.name) {
        name = item.name
      }
      return name
    },
    getCouponName: function () {
      let name = ''
      let coupon = this.selectedCoupon
      if (coupon && coupon.name) {
        name = coupon.name 
      } else {
        name = '未使用'
      }
      return name
    },
    getCouponTips: function () {
      let tips = ''
      let coupon = this.selectedCoupon
      if (coupon) {        
        tips = '已选1张'
      } else {
        let total = this.couponTotal
        tips = total + '张可用'        
      }  
      return tips   
    },  
    getInoviceTitle: function () {
      let title = ''
      if (this.invoice.isSave) {
        if (!this.getInoviceToggle) {
          if (this.invoice.type && this.invoice.type.name) {
            title = this.invoice.type.name
          }
        } else {
          title = '不要发票'
        }
      } else {
        title = '请选择发票类型'
      }       
      return title
    },
    getInoviceToggle: function () {
      return this.invoice.toggle
    }, 
    getSelectedDateStr: function () {
      let str = ''
      let date = this.selectedDate
      let time = this.selectedTime
      if (date && time) {
        str = date + ' ' +time
      } 
      return str
    },
    getSelectedDateValue: function () {
      let str = ''
      let date = this.selectedDate
      let time = this.selectedTime
      if (date && time) {
        str = date + '/' +time
      } 
      return str
    } 
  },
  watch: {
    selectedAddress: function () {
      // TODO:  
    this.fetchShippingList({
      'shop': '1',
      'products': null,
      'address': this.getSelectedAddress.id
    }) 
    }
  },
  created: function() {    
    consignee.consigneeList().then(
      (response) => {       
        let items = response.consignees        
        // 保存地址列表
        this.saveAddressItems(items)
      }, (error) => {
        Toast(error.errorMsg)
      }) 
    this.fetchCouponUsable({ page: 1, per_page: 10, shop: 1, total_price:1000 })  
    this.fetchDeliveryList()      
  },
  methods: {
    ...mapMutations({
      saveAddressItems: 'saveAddressItems',
      selectAddressItem: 'selectAddressItem',      
    }),
    ...mapActions({
      fetchShippingList: 'fetchShippingList',
      fetchCouponUsable: 'fetchCouponUsable', 
      fetchDeliveryList: 'fetchDeliveryList',     
    }),
    goBack() {
      this.$router.go(-1)
    },
    rightClick() {
      // TODO:
    },
    goAddress() {      
      if (this.addressItems && this.addressItems.length) {
        this.$router.push('addressList')
      } else {
        this.$router.push({ name: 'addressEdit', params: { mode: 'add', item: null } })
      }       
    },    
    goGoodsList() {      
      this.$router.push('goodsList')
    },
    goShipping() {
      this.$router.push('shipping')
    },
    goInvoice() {
      let title = this.invoice ? this.invoice.title : ''
      this.$router.push({ name: 'invoice', params: { title: title} })
    },
    goDuration() {
      this.$refs.timePicker.open()      
    },
    onClickDate(date) {

    },
    onClickTime(time) {
      
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

