<!-- OrderComment.vue -->
<template>
  <div class="container">
    <!-- header -->
    <mt-header class="header" title="评价宝贝">
      <header-item slot="left" v-bind:isBack=true v-on:onclick="goBack()">
      </header-item> 
      <header-item slot="right" title="提交" v-on:onclick="submit()">
      </header-item>        
    </mt-header>
    <!-- body -->
    <div class="order-comment-body" v-for="(item, index) in orderItem.goods" v-if="orderItem.goods.length > 0">
      <div class="body-list">
        <div class="image">
          <img v-bind:src="item.product.photos[0].thumb" v-if="item.product.photos.length > 0">
          <img src="../../../assets/image/change-icon/default_image_02@2x.png" v-if="item.product.photos.length <= 0">
        </div>
        <div class="comment">
          <span>{{item.product.name }}</span>
          <ul>
            <li class="good" v-for="(image, indexs) in item.IMAGE" v-on:click="changeImage(item, image.id, index)"> 
              <img :src="image.img" v-if="item.currentIndex != image.id">
              <img :src="image.activeImg" v-if="item.currentIndex == image.id">
              <label>{{image.name}}</label>
            </li>
          </ul>
        </div>
      </div>
      <div class="enter">
        <textarea placeholder="请在此输入评价" v-model="item.content"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import { HeaderItem } from "../../../components/common";
import { Header, Toast} from "mint-ui";
import { orderReview } from "../../../api/network/order"; //评价晒单
import { IMAGE } from '../static'
import { ENUM } from '../../../config/enum'
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      orderItem: this.$store.state.order.orderItem ? this.$store.state.order.orderItem : null,
      IMAGE: IMAGE
    };
  },
  created() {
    if(this.orderItem) {
       this.buildData();
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    submit() {
      let id = this.$route.query.order ? this.$route.query.order : "";
      this.getComment(id);
    },

    // 获取评价晒单数据
    getComment(id) {
      let data = this.getCommentData();
      if(data && data.length > 0) {
        data = JSON.stringify(data);
      } else {
        Toast('请评价商品');
        return false;
      }
      orderReview(id, data, 1).then(res => {
        if (res) {
          this.$router.push("orderSubmit");
        }
      });
    },

    getCommentData() {
      let data = this.orderItem.goods;
      let dataArray = [];
      for(let i = 0; i <= data.length-1; i++) {
        if(data[i].currentIndex !== 0 ) {
          let obj = {'goods': data[i].product.id, 'grade': data[i].currentIndex, 'content': data[i].content};
          dataArray.push(obj);
        }
      }
      return dataArray;
    },

    buildData() {
     let data = this.orderItem ? this.orderItem.goods : [];
     if(data) {
        for(let i = 0; i <= data.length-1; i++ ) {
        data[i].IMAGE = this.IMAGE;
        data[i].content = '';
        data[i].currentIndex = 3;
      }
     }     
    },

    changeImage(item, imageid, index) {
      item.currentIndex = imageid;
      this.orderItem.goods = Object.assign([], this.orderItem.goods);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  .header {
    @include header;
    border-bottom: 1px solid #e8eaed;
  }
  .order-comment-body {
    background: rgba(255, 255, 255, 1);
    height: 226px;
    padding: 15px;
    .body-list {
      display: flex;
      justify-content: left;
      align-content: center;
      align-items: center;
      padding-bottom:15px;
      border-bottom: 1px solid #E8EAED;
    }
    .image {
      width: 75px;
      height: 75px;
      flex-shrink: 0;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .comment {
      flex-basis: 100%;
      padding-left: 15px;
      span {
        font-size: 16px;
        color: #7c7f88;
        text-align: left;
      }
      ul {
        display: flex;
        justify-content: space-between;
        align-content: center;
        align-items: center;
        margin-top: 24px;
        li {
          img {
            width: 19px;
            height: 19px;
            flex-shrink: 0;
          }
          label {
            font-size: 14px;
            color: rgba(78, 84, 93, 1);
            font-weight: normal;
          }
        }
      }
    }
    .enter {
      padding-top: 15px;
      textarea {
        width: 100%;
        height: 120px;
        background: rgba(247, 249, 250, 1);
        border: 1px solid #f7f9fa;
        box-sizing: border-box;
        padding: 10px 0px 0px 10px;
        font-size: 14px;
        -webkit-appearance: none;
        outline: none;
      }
    }
  }
}
</style>



