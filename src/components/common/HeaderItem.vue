<template>
  <div class="container">
    <div v-if="isBack" @click="onclick">
      <img class="icon" src="../../assets/change-icon/back@2x.png" />
    </div>
    <div v-else>
      <div v-if="icon" @click="onclick">
        <img class="icon" v-bind:src="icon" />
      </div>
      <div v-else-if="title" @click="onclick">
        <label class="title">{{title}}</label>
      </div>
    </div> 
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
    isBack: {
      type: Boolean,
      default: false,
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
  .container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .icon {
    width: 20px;
    height: 20px;
    margin-left: 15px;
    margin-right: 15px;
  }
  .title {
    font-size: 16;
    color: #48505D;
    margin-left: 15px;
    margin-right: 15px;
  }
</style>


