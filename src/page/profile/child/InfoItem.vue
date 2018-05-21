<template>
  <div class="info-item-wrapper" @click="onclick">
    <img class="info-item-icon" v-bind:src="icon" />
    <label class="item-title info-item-title">{{title}}</label>
    <img class="indicator" src="../../../assets/image/change-icon/enter@2x.png" />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    icon: {
      type: String,
    },
  },
  methods: {
    onclick() {
      this.$emit('onclick')
    }
  }
}
</script>

<style lang="scss" scoped>
  .info-item-wrapper {    
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background-color: #fff; 
	  @include thin-border();
  }
  .item-title {
    font-size: 14px;
    color: #4E545D;
  }
  .info-item-icon {
    width: 28px;
    height: 28px;
    margin-left: 18px;
  }
  .info-item-title {
    flex: 1;
    margin-left: 16px;
  }
  .indicator {
    width: 7px;
    height: 12px;
    margin-left: 10px;
    margin-right: 10px;      
  }
</style>


