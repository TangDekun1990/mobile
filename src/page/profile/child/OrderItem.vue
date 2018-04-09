<template>
  <div v-on:click="onclick()">
    <img class="order-item-icon" v-bind:src="icon"/>
    <label class="item-title order-item-title">{{title}}</label>
  </div>
</template>

<script>
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
    }
  },
  methods: {
    onclick() {
      let params = {'order': this.id};
      this.$router.push({'name': this.testAttr, 'params':params});
    }
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
</style>

