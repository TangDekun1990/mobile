<template>
  <div v-on:click="onclick()">
    <img class="order-item-icon" v-bind:src="icon"/>
    <label class="item-title order-item-title">{{title}}</label>
    <span class="number" v-if="quantity <= 100">{{ quantity }}</span>
		<span class="number" v-if="quantity >= 100 ">99+</span>
  </div>
</template>

<script>
import { orderList } from '../../../api/network/order';
export default {
  data() {
    return {
      quantity: 0 , //相关订单数量
    }
  },
  props: {
    icon: {
      type: String,
    },
    title: {
      type: String,
    },
    testAttr: {
      type: String,
    },
    id: {
      default: 0
    }
  },
  // created(){
	// 	this.getNumber();
	// },
  methods: {
    onclick() {
      let params = {'order': this.id};
      this.$router.push({'name': this.testAttr, 'params':params});
    },
    // 获取订单数量
    // getNumber() {
		// 	orderList().then(res => {
		// 		if (res) {
		// 			this.quantity = res;
		// 		}
		// 	})
		// },    
  }
}
</script>

<style lang="scss" scoped>
  .order-item {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  .item-title {
    font-size: 14px;
    color: #4E545D;
  }
  .order-item-icon {
    width: 28px;
    height: 28px;
    margin-top: 19px;
  }
  .order-item-title {
    margin-top: 8px;
  }
  span.number {
		width: 14px;
		height: 14px;
		line-height: 14px;
    margin-top: -55px;
    margin-left: 17px;
    background: RGBA(239, 51, 56, 1);
    border-radius: 20px;
    font-size: 10px;
    text-align: center;
    color: RGBA(255, 255, 255, 1);
    font-weight: normal;
	}
</style>

