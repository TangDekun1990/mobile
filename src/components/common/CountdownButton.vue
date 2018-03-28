<template>
  <button class="item" v-bind:disabled="codeDisable" v-bind:class="{enable: !codeDisable, disable: codeDisable}" @click="onclick">
    <label class="title">{{codeText}}</label>
  </button>
</template>

<script>
export default {
  name: 'countdown-button',
  data() {
    return {
      timer: null,
      count: 60,
      codeText: '获取验证码',
      codeDisable: false,
    }
  },
  methods: {
    onclick() {
      this.$emit('onclick')
    },
    start() {
      this.count = 60
      this.codeText = 60 + "s后重新获取"
      this.codeDisable = true
      this.timer = setInterval(() => { 
        this.count = this.count - 1;
        this.codeText = this.count + "s后重新获取"
        if (this.count === 0) {
          this.stop()
        }
      }, 1000)
    },
    stop() {
      this.timer && clearTimeout(this.timer);
      this.codeText = '重新获取'
      this.codeDisable = false
    }
  },
}
</script>

<style lang="scss" scoped>
  .item {
    display: flex;       
    border-radius: 20px;    
    border: none; 
    vertical-align: middle;
    text-align: center;    
    &:focus {
      outline-style: none;
    }
  }
  .enable {
    background-color: #F23030;
    color: #FFFFFF;
  }
  .disable {
    background-color: #F3F3F3;
    color: #4E545D;
  }
  .title {
    flex: 1;
    border-radius: 20px;
    font-size: 13px;
    text-align: center;
  }
</style>


