<!-- OrderNav.vue -->
<template>  
  <div class="page-navbar">   
    <mt-navbar class="page-part" v-model="selected">  
      <mt-tab-item id="1" >全部</mt-tab-item>
      <mt-tab-item id="2">待付款</mt-tab-item>
      <mt-tab-item id="3">待发货</mt-tab-item>
      <mt-tab-item id="4">待收货</mt-tab-item>
      <mt-tab-item id="5">待评价</mt-tab-item>
    </mt-navbar>  
    <mt-tab-container v-model="selected">  
      <mt-tab-container-item id="1">
        <div v-for='(item, index) in items' v-if="items.length > 0"  @click="goOrderDetail()">
          <label class="payment" v-model="selected">等待付款</label> 
            <img class="img" :src="list.product.photos[0].thumb" v-for="(list, index) in item.goods" > <br/>
          <label class="price" v-model="selected">(共计3件商品) 合计 :  AED <span>518</span></label>
          <div class="btn">
            <button>取消订单</button>
            <button class="buttonbottom">去支付</button>
          </div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container> 
    
  </div>  
</template>

<script>
import { orderList } from '../../../api/network/order-nav';
  export default {
    name:'page-navbar',
    data() {
      return {
        selected: 1,
        items: [],
      }
    },
    created() {
      this.selected = this.$route.query.order;  
      // this.getOrderList( this.selected);
    },
    watch:{
      selected: function(value){
        this.getOrderList(value);
      }
    },
    methods: {
      getOrderList(id) {
        orderList(1, 10, id).then(res =>{
          let data = res.orders;
          // debugger;
          this.items = Object.assign([],data,this.items);
        })
      },
      setIsActiveByClick(item) {
			this.currentItem = item;
		  },
      goOrderDetail(){
       this.$router.push('/OrderDetail')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .mint-navbar {
    height:44px;
    line-height: 44px;
  }
  .mint-navbar[data-v-c4f2b68c] {
    margin-bottom: 10px;
  }
 
  .mint-navbar .mint-tab-item.is-selected {
    color:#F23030;
    border-bottom: 1px solid #F23030;
  }
   img {
    width: 60px;
    height: 60px;
    margin: 17px 5px 10px;
    background-color: #fff;
  }
  .payment {
    display: flex;
    justify-content:flex-end;
    align-items:center;
    height: 44px;
    color: #48505D;
    font-size: 14px;
    background-color: #fff;
    padding: 0 15px;
  }
  .price {
    @include header;
    display: flex;
    justify-content:flex-end;
    align-items:center;
    font-size: 14px;
    border-top: 1px solid $lineColor; 
    padding: 11px 15px;
    box-sizing: border-box;
  }
  .price span {
    font-size: 19px;
    padding-left:5px;
  }
  .btn {
    height: 54px;
    display: flex;
    justify-content:flex-end;
  }
  button {
    width: 90px;
    height: 30px;
    font-size:14px;
    border-radius: 2px;
    margin: 7px 15px 7px 0px;
    background-color: #fff;
    border:1px solid #ccc;
  }
  .buttonbottom {
    color:#F23030;
    border:1px solid #F23030;
  }
</style>



