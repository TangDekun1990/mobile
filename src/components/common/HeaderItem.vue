<template>
  <div v-if="isBack" @click="onclick">
    <img class="icon" src="../../assets/image/change-icon/back@2x.png" />
  </div>
  <div v-else>
    <div v-if="icon" @click="onclick">
      <img class="icon" v-bind:src="icon" />
    </div>
    <div v-else-if="title" @click="onclick">
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
    titleColor: {
      type: String,
      default: '#48505D'
    }
  },
  methods: {
    onclick() {
      this.$emit('onclick');
    }
  },
}
</script>

<style scoped>
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


