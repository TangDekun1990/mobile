<template>
  <div v-if="isBack" @click="onclick" class="left-item">
    <img class="icon" src="../../assets/image/change-icon/back@2x.png" />
  </div>
  <div v-else>
    <div v-if="icon" @click="onclick" v-bind:class="itemStyle">
      <img class="icon" v-bind:src="icon" />
    </div>
    <div v-else-if="title" @click="onclick" v-bind:class="itemStyle">
      <label class="title" v-bind:style="{color: titleColor}">{{title}}</label>
    </div>
  </div>   
</template>

<script>
export default {
  name: 'header-item',
  props: {
    icon: {
      type: String,
    },
    title: {
      type: String,
    },
    isBack: {
      type: Boolean,
      default: false,
    },
    isLeft: {
      type: Boolean,
      default: false,
    }, 
    titleColor: {
      type: String,
      default: "#48505D"
    } 
  },
  computed: {
    itemStyle () {
      return {
        'left-item': this.isLeft,
        'right-item': !this.isLeft,
      }
    }
  },
  methods: {
    onclick() {
      this.$emit('onclick');
    }
  },
}
</script>

<style lang="scss" scoped>
  .left-item {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .right-item {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }
  .icon {
    width: 20px;
    height: 20px;
    margin-left: 5px;
    margin-right: 5px;
  }
  .title {
    font-size: 16px;
    color: #48505D;
    margin-left: 5px;
    margin-right: 5px;
  }
</style>


