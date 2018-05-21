<template>
  <div class="card-z4-container" @click="onClick">
    <img v-bind:style="getPhotoStyle" :src="getPhotoUrl" />
    <div ref="content" class="content-wrapper" v-bind:style="getContentStyle">
      <label class="title" style="-webkit-box-orient:vertical">{{getTitle}}</label>
      <div class="tips-wrapper">        
        <label class="tips" style="-webkit-box-orient:vertical">{{tips}}</label>
      </div>
    </div>    
  </div>
</template>

<script>
import Common from './Common'
import { Toast } from 'mint-ui'
export default {
  name: 'CardZ4',
  mixins: [ Common ],  
  data () {
    return {
      count: 0, // 活动倒计时
      timer: null,
      tips: '',
      screenCloseTime: 0, // 屏幕隐藏时间
      screenCloseAt: 0, // 屏幕上次隐藏时间点
    }
  },
  computed: {    
    getPhotoStyle: function () {      
      return {
        width: this.photoWidth + 'px',
        height: this.photoHeight + 'px'
      }
    },
    getContentStyle: function () { 
      let width = (this.photoWidth < 180) ? this.photoWidth : 180
      let height = 66
      let top = (this.photoHeight - height) / 2.0
      let left = (this.photoWidth - width) / 2.0 
      return {
        width: width + 'px',
        height: height + 'px',
        top: top + 'px',
        left: left + 'px',
        overflow: 'hidden'
      }
    },     
  },
  created () {
    this.addVisibilitychange()
  },
  mounted() {
    this.$nextTick(() => {
      this.photoWidth = this.$el.clientWidth
      this.photoHeight = this.$el.clientHeight
    })

    this.getTips()
  },
  methods: { 
    getTips() {     
      let startAt = this.item ? this.item.start_at : null
      let endAt = this.item ? this.item.end_at : null      
      if (startAt && endAt) {
        switch (this.utils.activityStatus(startAt, endAt)) {
          case 0: // 未开始
            {
              this.tips = '敬请期待!'              
            }
            break;
          case 1: // 进行中
            {
              let timestamp = Date.parse(new Date()) / 1000
              this.count = endAt - timestamp              
              this.start()
            }
            break;
          case 2: // 已结束
            {
              this.tips = '已结束'
            }
            break;
        
          default:
            break;
        }
      } else {
        this.tips = '已结束'
      }
    },
    start () {   
      this.screenCloseTime = 0     
      this.timer = setInterval(() => {
        this.updateCount()                
      }, 1000)
    },
    stop () {
      this.timer && clearTimeout(this.timer); 
      this.tips = '已结束'    
    },
    updateCount () {        
      if (this.screenCloseTime > 0) {
        this.count = this.count - this.screenCloseTime                
        this.screenCloseTime = 0  
      } else {
        this.count = this.count - 1
      }
      
      if (this.count <= 0) {
        this.stop()
      } else {
        this.tips = this.utils.formatTimeInterval(this.count)
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
  .card-z4-container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    background-color: $cardbgColor; 
    .content-wrapper {
      background-color: #fff;
      opacity: 0.85;
      position: absolute;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      .title {
        font-size: $h1;
        color: $titleTextColor;
        margin-top: 6px;  
        margin-left: 4px;
        margin-right: 4px;
        text-align: center;
        @include limit-line(1);  
      }
      .tips-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 120px;
        height: 20px;
        background-color: $primaryColor;
        margin-top: 2px;
        .tips {
          font-size: $h6;
          color: #fff;          
          text-align: center;
        }
      } 
    }           
  }  
</style>


