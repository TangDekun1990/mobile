<template>
  <div class="container">
    <!-- header -->
    <mt-header class="header" title="我的收藏">
      <header-item slot="left" v-bind:isBack=true v-on:onclick="goBack()">
      </header-item>    
    </mt-header>
    <!-- body --> 
    <mt-cell-swipe v-for="(item, index) in collectionList" v-bind:key="item.id" :right="rightbottom(item.id)" >  
      <div class="collection-body" v-on:click="goOrderDetail(item.id, item.shop)" v-if="collectionList.length > 0">
        <div class="image">
          <img src="../../assets/image/change-icon/default_image_02@2x.png" v-if='item.photos <= 0'>
          <img v-bind:src="item.photos[0].thumb" v-if='item.photos.length > 0' data-src='../../../assets/image/change-icon/default_image_02@2x.png'>
          <p v-if="item.god_stock == 0">已售罄</p>
          <p v-if="item.good_stock > 0 && item.good_stock <= 10">仅剩{{item.good_stock}}件</p>
        </div>
        <div class="orderInfo">
          <p class="title">{{item.name}}</p>
          <p class="content" style="-webkit-box-orient:vertical">{{item.desc}}</p>
          <div class="price">
            <span class="now">AED{{item.current_price}}</span>
            <del class="old">AED{{utils.currencyPrice(item.price)}}</del>
          </div>
          <div class="other">
            <span v-if="item.self_employed" class="self-support">自营</span>
            <span>评论：{{item.comment_count}}</span>
            <span>收藏：{{item.collector.length}}</span>
          </div>
        </div>
      </div>
    </mt-cell-swipe>  
    <div v-if="collectionList.length <= 0" class="order-air">
        <img src="../../assets/image/change-icon/favorite_empty@2x.png">
				<p>您暂时还未收藏过任何商品</p>
				<button class="button" v-on:click="goVisit()">
					<label>随便逛逛</label>
				</button>
      </div>
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
      },
      // 随便逛逛
      goVisit() {
        this.$router.push('/home');
      },
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
      justify-content: flex-start;
      align-items: center;
      background-color:#FFF;
      border-bottom:1px solid #E8EAED;
      padding: 11px 22px 11px 10px;
      .image {
        width:110px;
        height:110px;
        margin: 0px 14px 0px 0px;
        box-sizing: border-box;
        img {
          width:83px;
          height:83px;
          padding:14px 14px 0px 14px;
        }
        p {
          text-align: center;
          color:#F23030;
          background-color: #F3F4F5;
          font-size: 14px;
        }
      }
      .orderInfo {
        .title {
          color:#4E545D;
          font-size: 16px;
          padding-bottom: 7px;
        }
        .content {
          color:#55595F;
          font-size:12px;
          margin-bottom: 9px;
          height: 12px;

          display:-moz-box;
          display:-webkit-box;
          display:box;

          -webkit-line-clamp: 1;
          -moz-line-clamp: 1;

          -moz-box-orient:vertical;
          -webkit-box-orient:vertical;
          box-orient:vertical;

          overflow: hidden;
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
          display: flex;
          align-items: center;
          span {
            color:#7C7F88;
            font-size:12px;
            padding-left:7px;
            &.self-support {
              font-size: 10px;
              color: #F34444;
              padding: 3px;
              border: 1px solid #F34444;
              border-radius: 2px;
            }
          }
        }
      }
    }
    .order-air {
			width:100%;
			vertical-align: middle;
      text-align: center;
			img {
				width:102px;
				height:102px; 
				box-sizing: border-box;
				margin:	96px auto 20px;
			}
			p {
				font-size:17px;
				color:rgba(124,127,136,1);
				line-height:17px;
				text-align: center;
				margin: 0 auto;
			}
			.button {
				width:200px;
				height:44px; 
				background:rgba(252,46,57,1);
				border-radius: 2px ; 
				padding:14px 68px;
				margin: 28px auto;
				border:none;
			}
			label {
				font-size:16px;
				color:#fff;
				display:inline-block;
				vertical-align: middle;
				height:16px;
				line-height: 16px;
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
 .mint-cell-wrapper {
   padding: 0px;
 }
</style>
