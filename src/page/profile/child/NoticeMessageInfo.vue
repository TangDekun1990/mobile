<template>
  <div class="container">
    <!-- header -->
    <div class="header">
      <img src="../../../assets/image/change-icon/back@2x.png" class="back" @click="goBack()">
      <img src="../../../assets/image/change-icon/b2_cart@2x.png" class="cart" v-on:click='goCart()'>       
      <span class="cart-number" v-if="quantity <= 100">{{ quantity }}</span>
			<span class="cart-number" v-if="quantity >= 100 ">99+</span>
    </div>

    <webview :url.asyc="getLink">
    </webview>
  </div>
</template>

<script>
import { Webview } from '../../../components/common'
import { cartQuantity } from '../../../api/network/cart';
  export default {
    data() {
      return {
        quantity: 0  //购物车数量
      }
    },
    computed: {
      getLink: function () {
        let link = this.$route.params.link;
        return link 
      },
    },
    created(){
			this.getCarNumber();
		},
    methods: {
      goBack() {
        this.$router.go(-1) 
      },
      // 跳转购物车列表
      goCart() {
        this.$router.push({'name': 'cart'})
      },

      // 购物车数量显示
      getCarNumber() {
				cartQuantity().then(res => {
					if (res) {
						this.quantity = res.quantity;
					}
				})
			},
    } 
  }
</script>

<style lang="scss" scoped>
 .container {
    .header {
      @include header;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0px 13px;
      .back, .cart {
        width: 20px;
        height: 20px;
        margin-left: 5px;
        margin-right: 5px;
      }
      .cart-number {
        top: 5px;
        right: 15px;
      }
    }
 }  
</style>

