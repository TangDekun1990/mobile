<template>
  <div class="group-c3s-container" v-bind:style="getContainerStyle">
    <img class="icon" src="../../../assets/image/change-icon/b0_activty@2x.png" />
    <div class="line">
    </div>
    <swiper 
      ref='swiper'
      :options="swiperOption" 
      @click.native="slideClicked()" 
      v-bind:style="getItemStyle">
      <swiper-slide v-for="(item, index) in getItems" :key="index" >
        <card-item 
          class="item" 
          v-bind:style="getItemStyle"                     
          :item="item">
        </card-item>
      </swiper-slide>
    </swiper>         
  </div>
</template>

<script>
import CardItem from '../card/CardItem'
import { ENUM } from '../../../config/enum'
import Common from './Common'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { openLink } from '../deeplink'
export default {
  name: 'CardGroupC3',
  mixins: [ Common ],
  components: {
    CardItem,
    swiper,
    swiperSlide
  },
  data () {
    return {
      activeIndex: 0,
      swiperOption: {
        direction: 'vertical',
        loop: true,
        loopAdditionalSlides : this.getItems?this.getItems.length:0,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },      
      }
    }
  },
  computed: {  
    getContainerStyle: function () {
      const { width, height } = window.screen
      let itemWidth = 0
      let itemHeight = 0      
      itemWidth = width
      itemHeight = width * (1.0 / 9.0)
      return {
        width: itemWidth + 'px',
        height: itemHeight + 'px'
      }
    },   
    getItemStyle: function () {
      const { width, height } = window.screen
      let itemWidth = 0
      let itemHeight = 0      
      itemWidth = width - 32  
      itemHeight = width * (1.0 / 9.0)
      return {
        width: itemWidth + 'px',
        height: itemHeight + 'px'
      }
    },
    top() {
      return - this.activeIndex * 50 + 'px';
    },
  },
  mounted() {
    setInterval( () => {
      if(this.activeIndex < this.getItems.length) {
        this.activeIndex += 1;
      } else {
        this.activeIndex = 0;
      }
    }, 1000);    
  },
  methods: {
    slideClicked () {
      let index = this.$refs.swiper._data.swiper.activeIndex - 1
      let items = this.getItems
      if (items && items.length && index === items.length ) {
        index = 0
      } 
      let item = items[index]     
      let link = item.link
      if (window.WebViewJavascriptBridge && window.WebViewJavascriptBridge.isInApp()) {
        wenchaoApp.openLink(link)
      } else {
        openLink(this.$router, link)
      }
    }, 
  }
}
</script>

<style lang="scss" scoped>
  .group-c3s-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background-color: $cardbgColor;
  }
  .icon {
    width: 24px;
    height: 24px;
    margin-left: 6px;
    margin-right: 6px;
  }
  .line {
    height: 20px;
    width: 1px;
    background-color: $lineColor;
    margin-right: 2px;
  }
</style>


