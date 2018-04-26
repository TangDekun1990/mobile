<template>
  <div class="container">
    <!-- header -->
    <mt-header class="header" title="我的收藏">
      <header-item slot="left" v-bind:isBack=true v-on:onclick="goBack()">
      </header-item>    
    </mt-header>
    <!-- body --> 
    <mt-cell-swipe v-for="(item, index) in collectionList" v-bind:key="item.id" :right="rightbottom(item.id)" >  
      <div class="collection-body" v-on:click="goOrderDetail(item.id, item.shop)" >
        <div class="image">
          <img :src="item.photos[0].large ">
          <p>仅剩{{item.good_stock}}件</p>
        </div>
        <div class="orderInfo">
          <p class="title">{{item.name}}</p>
          <p class="content">{{item.desc}}</p>
          <div class="price">
            <span class="now">AED{{item.current_price}}</span>
            <del class="old">AED{{item.price}}</del>
          </div>
          <div class="other">
            <input type="submit" :value="item.self_employed == 1? '自营':'不自营'">
            <span>评论：{{item.comment_count}}</span>
            <span>收藏：{{item.collector.length}}</span>
          </div>
        </div>
      </div>
    </mt-cell-swipe>  
  </div>  

</template>

<script>
import { CellSwipe, MessageBox  } from 'mint-ui';
import { productLikedList, productUnlike } from '../../api/network/product' //已收藏商品 //取消收藏商品
  export default {
    data() {
      return {
        collectionList: [],
        orderListParams: {'page':1, 'per_page': 10},
      }
    },
    created() {  
      this.orderCollection();
    },  
    methods: {
      rightbottom(productId){
        return [   
          {  
            content: '删除',  
            style: { background: 'red', color: '#fff', },  
            handler: () => MessageBox({
              title: '确认删除',
              message: '是否要删除此商品？',
              showCancelButton: true,
            }).then(actiob =>{
              this.getCancelCollection(productId);
              
            })
          }  
        ];  
      },
      goBack() {
        this.$router.go(-1);
      },
      // 获取已收藏商品数据
      orderCollection() {
        let data = this.orderListParams;
        productLikedList(data.page, data.per_page).then(res => {
          if(res) {
            this.collectionList = Object.assign([], res.products);
          }
        }) 
      },      
      // 去商品详情
      goOrderDetail(orderId) {  
        this.$router.push({name: 'detail', params:{id: orderId}})
      },
      // 取消收藏商品数据
      getCancelCollection(productId) {
        productUnlike(productId).then(res => {
          if(res) {
            this.CancelCollection = res;
            this.orderCollection();
          }
        })
      }
    }
  }
</script>

<style lang='scss' scoped>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    .header {
      @include header;
      border-bottom: 1px solid #E8EAED;
    }
    .collection-body {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color:#FFF;
      border-bottom:1px solid #E8EAED;
      padding-bottom:11px;
      .image {
        width:110px;
        height:110px;
        padding: 11px 14px 10px 10px;
        box-sizing: border-box;
        img {
          width:88px;
          height:88px;
        }
        p {
          text-align: center;
          color:#F23030;
          background-color: #F3F4F5;
          font-size: 14px;
        }
      }
      .orderInfo {
        padding: 11px 22px 0px 0px;
        overflow: hidden;
        .title {
          color:#4E545D;
          font-size: 16px;
          padding-bottom: 7px;
        }
        .content {
          color:#55595F;
          font-size:12px;
          padding-bottom: 9px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .price {
          padding-bottom:10px;
          .now {
            color:#F23030;
            font-size:16px;
            padding-right:6px;
          }
          .old {
            color:#A4AAB3;
            font-size: 12px;
          }
        }
        .other {
          input {
            color:#F34444;
            font-size:10px;
            border:1px solid #F34444;
            background-color: #fff;
            
          }
          span {
            color:#7C7F88;
            font-size:12px;
            padding-left:7px;
          }
        }
      }
    }
  }  
</style>

 <!--Cell Swipe样式覆盖 -->
<style>
.mint-cell-swipe-button {
  padding: 50% 0px;
  width: 90px;
  text-align: center;
  font-size:14px;
  box-sizing: border-box;
}

</style>
