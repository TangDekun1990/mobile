<template>
  <div v-on:click="onclick()">
    <img class="order-item-icon" v-bind:src="icon"/>
    <label class="item-title order-item-title">{{title}}</label>
    <span class="number" v-if="orderNumber == 0 ? '': orderNumber && isEmpty == false ? '': orderNumber">{{ orderNumber }}</span>
  </div>
</template>

<script>
import { orderList, orderSubtotal } from '../../../api/network/order';
import { mapState, mapMutations } from 'vuex';

export default {
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
    },
    orderNumber: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      isEmpty: false
    }
  },
  computed: mapState({
			height: state => state.cart.height,  
			isOnline: state => state.auth.isOnline
		}),
  created() {
    this.isSignin();
  },
  methods: {
    onclick() {      
      // Code Review: 去掉testAttr
      this.$router.push({name: this.testAttr, params: {order: this.id}});
    },
    // 是否登录
    isSignin() {
				if (this.isOnline) {
					this.isEmpty = true;
				}else {
					this.isEmpty = false;
				}
			},
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
    font-size: 12px;
    text-align: center;
    color: RGBA(255, 255, 255, 1);
    font-weight: normal;
	}
</style>

