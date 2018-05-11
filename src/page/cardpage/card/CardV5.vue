<template>
  <div class="card-v5b-container" @click="onClick"> 
    <div v-if="isTop" class="v5-content-wrapper">
      <div class="photo-wrapper" v-bind:style="getPhotoStyle">
        <img class="photo" v-bind:style="getPhotoStyle" :src="getPhotoUrl" />
        <img v-if="isShowSellOutIcon" class="sell-out" v-bind:style="getSellOutStyle" src="../../../assets/image/change-icon/b0-out@2x.png" />
        <span v-if="isShowPromoIcon" class="promos">促销</span>
      </div>    
      <div class="content-wrapper">
        <label class="title" style="-webkit-box-orient:vertical">{{getTitle}}</label>
        <div class="bottom-wrapper">
          <div class="desc-wrapper">
            <label class="subtitle" style="-webkit-box-orient:vertical">{{getSubtitle}}</label>
            <label class="desc" style="-webkit-box-orient:vertical">{{getDesc}}</label>
          </div>
          <div class="icon-wrapper" v-if="isProductItem()" @click.stop="onClickCart">
            <img src="../../../assets/image/change-icon/cart@2x.png">
          </div>
        </div> 
      </div>
    </div>
    <div v-else class="v5-content-wrapper">
      <div class="content-wrapper">
        <label class="title" style="-webkit-box-orient:vertical">{{getTitle}}</label>
        <div class="bottom-wrapper">
          <div class="desc-wrapper">
            <label class="subtitle" style="-webkit-box-orient:vertical">{{getSubtitle}}</label>
            <label class="desc" style="-webkit-box-orient:vertical">{{getDesc}}</label>
          </div>
          <div class="icon-wrapper" v-if="isProductItem()" @click.stop="onClickCart">
            <img src="../../../assets/image/change-icon/cart@2x.png">
          </div>
        </div> 
      </div>
      <div class="photo-wrapper" v-bind:style="getPhotoStyle">
        <img class="photo" v-bind:style="getPhotoStyle" :src="getPhotoUrl" />
        <img v-if="isShowSellOutIcon" class="sell-out" v-bind:style="getSellOutStyle" src="../../../assets/image/change-icon/b0-out@2x.png" />
        <span v-if="isShowPromoIcon" class="promos">促销</span>
      </div>
    </div>                         
  </div>
</template>

<script>
import Common from './Common'
import PhotoV from './PhotoV'
import { Indicator, Toast } from 'mint-ui'
import { cartAdd } from '../../../api/network/cart'
import { mapState } from 'vuex'
export default {
  name: 'CardV5',
  mixins: [ Common, PhotoV ],  
  computed: { 
    ...mapState({
      isOnline: state => state.auth.isOnline,
    }),
    isTop () {
      return this.isCardStyle('B')
    },
    isShowSellOutIcon () {
      if (this.isProductItem()) {
        if (this.item.product.good_stock && parseInt(this.item.product.good_stock) > 0) {
          return false
        } else {
          return true
        }
      } else {
        return false
      }
    },
    isShowPromoIcon () {
      if (this.isProductItem()) {
        if (this.item.product.activity && (typeof this.item.product.activity === 'object')) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
    getSubtitle: function () {  
      let subtitle = ''    
      if (this.isProductItem()) {
        let product = this.item.product
        subtitle = product ? product.current_price : ''
        subtitle = 'AED ' + this.utils.currencyPrice(subtitle)
      } else {
        subtitle = this.getItemByKey('label1') 
      }           
      return subtitle
    },
    getDesc: function () {     
      let subtitle = ''
      if (this.isProductItem()) {
        let product = this.item.product
        subtitle = product ? product.price : ''
        subtitle = 'AED ' + this.utils.currencyPrice(subtitle)
      } else {
        subtitle = this.getItemByKey('label2')     
      }           
      return subtitle    
    },
    getSellOutStyle: function () { 
      let height = 70
      let top = (this.photoHeight - height) / 2.0
      return {
        width: height + 'px',
        height: height + 'px',
        top: top + 'px',
        left: top + 'px',
      }
    } 
  },
  methods: {   
    isProductItem () {
      if (this.item && this.item.product && this.item.product.id) {        
        return true
      }
      return false
    },
    isCardStyle(item) {
      let style = this.item ? this.item.style : null          
      if (style && style.length && style.indexOf(item) >= 0) {        
        return true
      }
      return false
    },
    onClickCart () {      
      if (this.isOnline) {
         this.addToCart()
      } else {        
        // 未登录时，判断是App内打开还是App外打开
        if (window.WebViewJavascriptBridge && window.WebViewJavascriptBridge.isInApp()) {
          wenchaoApp.doLogin()
		    } else {
          this.$router.push({ name: 'signin' });
        }
      }       
    },
    addToCart () {      
      let product = this.item.product
      let productId = product.id
      let property = ''
      let amount = '1'
      if (product.stock && product.stock.length) {
        for (const stock in product.stock) {
          if (stock.is_default) {            
            if (stock.stock_number && parseInt(stock.stock_number) > 0) {
              property = stock.id
            } else {
              Toast('库存不足')
              return;
            }
          }
        }
      } else {
        if (!(product.good_stock && parseInt(product.good_stock) > 0)) {
          Toast('库存不足')
          return;
        }
      }
      Indicator.open()
      cartAdd(productId, property, amount).then(
        (response) => {
          Indicator.close()
          if (window.WebViewJavascriptBridge && window.WebViewJavascriptBridge.isInApp()) {
            wenchaoApp.addCartSucceed()
          }
        }, (error) => {
          Indicator.close()
          Toast(error.errorMsg)
        })
    }, 
  },
}
</script>

<style lang="scss" scoped>
  .card-v5b-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    background-color: $cardbgColor;
    .v5-content-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: stretch;
      .photo-wrapper {
        margin-top: 5px;
        margin-left: 5px;
        margin-right: 5px;
        position: relative;   
      }
      .photo { 
        width: auto;
      }
      .sell-out { 
        position: absolute;
        width: 60px;
        height: 60px;
        padding: 0px;
        top: 10px;
        left: 10px;
      }
      .promos {
        position: absolute;
        background: url('../../../assets/image/change-icon/label@2x.png') no-repeat;
        width: 36px;
        height: 19px;
        color: #FFFFFF;
        font-size: 10px;
        top: 0px;
        left: 0px;
        background-size: cover;
        font-weight: 100;
        line-height: 19px;
        text-align: left;
        padding-left: 5px;
      }
      .content-wrapper {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: stretch;
        .title {
          font-size: $h5;
          color: $titleTextColor;
          margin-top: 5px;
          margin-left: 9px;
          margin-right: 9px;
          @include limit-line(1); 
        }
        .bottom-wrapper {
          flex: 1;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: stretch;     
        }
        .desc-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: stretch;
          .subtitle {
            font-size: $h4;
            color: $primaryColor;
            margin-top: 10px;
            margin-left: 9px;
            margin-right: 0px;
            text-align: left;
            @include limit-line(1);
          }
          .desc {
            font-size: $h6;
            color: $descTextColor;
            margin-left: 9px;
            margin-right: 0px;
            text-align: left;
            @include limit-line(1);
            text-decoration: line-through;
          }
        }
        .icon-wrapper {
          width: 40px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: center;
          img {
            width: 24px;
            height: 24px;
            margin-bottom: 6px;
          }
        }
      }
    }            
  }   
</style>


