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
        <div class="image" >
          <img v-bind:src="item.product.photos[0].large" >
        </div>
        <div class="comment">
          <span>{{item.product.name | mySubstr(10)}}</span>
          <ul>
            <li class="good"> 
              <!-- v-on:click="changeImage(item.grade)" v-if="item.grade" -->
              <img src="../../../assets/image/change-icon/e7_good_nor@2x.png" v-bind:class="{'active':item.isActive}" v-on:click="changeImage(index)">
              <label>好评</label>
            </li>
            <li class="normal">
              <img src="../../../assets/image/change-icon/e7_good_nor@2x.png">
              <label>中评</label>
            </li>
            <li class="bad">
              <img src="../../../assets/image/change-icon/e7_bad_nor@2x.png">
              <label>差评</label> 
            </li>
          </ul>
        </div>
        <div class="enter">
          <textarea cols="" rows="" placeholder="请在此输入评价" v-model="item.content"></textarea>
        </div>
    </div>
  </div>
</template>

<script>
import { HeaderItem } from '../../../components/common'
import { Header } from 'mint-ui'
import { orderReview } from '../../../api/network/order' //评价晒单
export default { 
  data() {
    return {
      commentinfo: {},
    }
  },
  created() {
    let id = this.$route.params.order ?  this.$route.params.order : '';
    this.commentinfo = id;
    console.log(id);
  },
  methods: {  
    goBack() {
      this.$router.go(-1); 
    },
    submit() {
      let id = this.$route.params.order.id ?  this.$route.params.order.id : '';
      this.getComment(id);
    },

    // 获取评价晒单数据
		getComment(id) {
			orderReview(id, JSON.stringify([{goods:id,grade:'1',content:''}]), 1).then(res => {
				if(res) {
          this.commentList = Object.assign([],this.commentList, res.order);
          this.$router.push('/orderSubmit');
				}
			})
    },
    
    changeImage(data){
      console.log(11111111);
      this.commentinfo.goods.forEach(function(obj){
        obj.isActive = false;
      });
        data.isActive = !data.isActive;        
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
    .header {
      @include header;
      border-bottom:1px solid #E8EAED;
    }
    .order-comment-body {
      height:256px; 
      background:rgba(255,255,255,1);
      box-shadow: 0px -0.5px 0px 0px rgba(232,234,237,1);
      .image {
        float: left;
        img {
          width:75px;
          height:75px;
          padding:15px 14px 15px 13px;
        }
      }
      .comment {
        border-bottom: 1px solid #E8EAED;
        padding: 15px 0px;
        span {
          height:16px; 
          font-size:16px;
          font-family:'PingFangSC-Regular';
          color:rgba(124,127,136,1);
          line-height:16px;
          position: absolute;
          padding: 9px 107px 24px 0px;
          vertical-align:middle;
          }
          ul {
            display: flex;
            justify-content: space-between;
            padding: 26px 4px 26px 0px;
            li {
              float: left;
              margin-right: 38px;
              // cursor: pointer;
              img {
                width:19px;
                height:19px; 
                vertical-align: text-bottom;
                &:active {
                  background-color:rgba(242,48,48,1);
                }
              }
              label {
                height:14px; 
                font-size:14px;
                font-family:'PingFangSC-Regular';
                color:rgba(78,84,93,1);
                line-height:14px;
                display: inline-block;
                vertical-align: middle;
                overflow: hidden;
              }
            }
          }
        }
        p {
          width:100%;
          height:1px;
          background-color: #E8EAED;
          margin-top: 26px;
        }
        .enter {
          margin: 15px;
          textarea {
            width:100%;
            height:120px; 
            background:rgba(247,249,250,1);
            border:1px solid #F7F9FA;
          }
        }
      }
    } 
</style>



