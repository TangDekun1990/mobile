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
    <div class="order-comment-body" v-for="(item, index) in commentinfo.goods">
      <div class="body-list">
        <div class="image" >
          <img v-bind:src="item.product.photos[0].large" >
        </div>
        <div class="comment">
          <span>{{item.product.name | mySubstr(10)}}</span>
          <ul>
            <li class="good" v-for="(image, indexs) in item.IMAGE"  v-on:click="changeImage(image, indexs)"> 
              <img src="../../../assets/image/change-icon/e7_good_nor@2x.png" v-if="!image.isActive">
              <img src="../../../assets/image/change-icon/e7_good_sel@2x.png" v-if="image.isActive">
              <label>{{image.name}}</label>
            </li>
          </ul>
        </div>
      </div>
      <div class="enter">
        <textarea cols="" rows="" placeholder="请在此输入评价" v-model="item.content"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import { HeaderItem } from "../../../components/common";
import { Header } from "mint-ui";
import { orderReview } from "../../../api/network/order"; //评价晒单
import { IMAGE } from "../static";

export default {
  data() {
    return {
      commentinfo: {},
      IMAGE: IMAGE
    };
  },
  created() {
    let id = this.$route.params.order ? this.$route.params.order : "";
    this.commentinfo = id;
    this.buildData();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    submit() {
      let id = this.$route.params.order.id ? this.$route.params.order.id : "";
      this.getComment(id);
    },

    // 获取评价晒单数据
    getComment(id) {
      orderReview(
        id,
        JSON.stringify([{ goods: id, grade: "1", content: "" }]),
        1
      ).then(res => {
        if (res) {
          this.commentList = Object.assign([], this.commentList, res.order);
          this.$router.push("/orderSubmit");
        }
      });
    },

    buildData() {
     let data = this.commentinfo.goods;
     for(let i = 0; i <=data.length-1; i++ ) {
       data[i].IMAGE = this.IMAGE;
     }
     this.commentinfo.goods = Object.assign([], data);
    },

    changeImage(image, indexs) {
      // console.log(this.commentinfo.goods);
      // this.commentinfo.goods[index].isActive = true;
      // item.isActive = !item.isActive;
      image.isActive = !image.isActive;
      // this.commentinfo.goods = Object.assign([], this.commentinfo.goods, item);
      // console.log(this.commentinfo.goods);
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
    border-bottom: 1px solid #e8eaed;
    padding: 15px;
    .body-list {
      display: flex;
      justify-content: left;
      align-content: center;
      align-items: center;
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
      margin: 15px;
      textarea {
        width: 100%;
        height: 120px;
        background: rgba(247, 249, 250, 1);
        border: 1px solid #f7f9fa;
      }
    }
  }
}
</style>



