<template>
  <button 
    class="item" 
    v-bind:disabled="codeDisable" 
    v-bind:class="{enable: !codeDisable, disable: codeDisable}" 
    @click="onclick">
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
      screenCloseTime: 0, // 屏幕隐藏时间
      screenCloseAt: 0, // 屏幕上次隐藏时间点
    }
  },
  created () {
    this.addVisibilitychange()
  },
  methods: {
    onclick() {
      this.$emit('onclick')
    },
    start() {
      this.screenCloseTime = 0  
      this.count = 60
      this.codeText = 60 + "s后重新获取"
      this.codeDisable = true
      this.timer = setInterval(() => { 
        this.updateCount()
      }, 1000)
    },
    stop() {
      this.timer && clearTimeout(this.timer);
      this.codeText = '重新获取'
      this.codeDisable = false
    },
    updateCount () {      
      if (this.screenCloseTime > 0) {
        this.count = this.count - this.screenCloseTime
        this.screenCloseTime = 0  
      } else {
        this.count = this.count - 1
      }      
      this.codeText = this.count + "s后重新获取"
      if (this.count <= 0) {
        this.stop()
      }
    },
    addVisibilitychange: function () {
      document.addEventListener('visibilitychange', () => {
        var date = new Date();        
        if (document.visibilityState == 'hidden') {
            this.screenCloseAt = date.getTime();
        } else {
            this.screenCloseTime = Math.floor((date.getTime() - this.screenCloseAt)/1000);           
        }
      })
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


