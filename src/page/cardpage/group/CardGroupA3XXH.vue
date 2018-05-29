<template>
  <div class="group-a3xxh-container" id="list">    
    <card-item 
      v-bind:style="getItemStyle" 
      v-for="(item, index) in getItems" 
      :key="index" 
      :item="item">
    </card-item> 
  </div>
</template>

<script>
import CardItem from '../card/CardItem'
import { ENUM } from '../../../config/enum'
import Common from './Common'
export default {
  name: 'CardGroupA3XXH',
  mixins: [ Common ],
  components: {
    CardItem,
  },
  data () {
    return {
      timer: null,
    }
  },
  computed: {
    getItemStyle: function () {
      const { width, height } = window.screen
      let itemWidth = 0
      let itemHeight = 0
      let columnCount = 1 // 每行的列数；默认只有一列
      let ratio = 1 // 每个item的宽高比
      
      columnCount = 3
      ratio = 2.0 / 3.0

      let seperatorWidth = (columnCount - 0) * 1 // 分割线宽度
      itemWidth = (width - seperatorWidth) / columnCount  
      itemHeight = itemWidth / ratio
      return {
        'width': itemWidth + 'px',
        'height': itemHeight + 'px',
        'border-right': '1px solid #E8EAED',
        'flex-shrink': '0',
        'flex-basis': itemWidth + 'px',              
      }     
    },
  }, 
  mounted () {
    this.start()    

    var element = this.$el;      
    element.addEventListener('touchmove', (event) => {      
      this.doOnTouchMove(event);
    });
  },
  destroyed () {
    this.stop()
  },
  methods: {
    start () {
      this.timer = setInterval(() => {
        this.autoScrollList()
      }, 40)
    },
    stop () {
      this.timer && clearTimeout(this.timer)
    },
    autoScrollList () {      
      let element = document.getElementById('list')
      element.scrollLeft += 1
      let scrollWidth = element.scrollWidth - window.screen.width
      if (element.scrollLeft >= scrollWidth) {
        this.stop()
      }      
    },
    doOnTouchMove(event) {
      console.log('touchmove');
      this.stop()
    },
  },
}
</script>

<style lang="scss" scoped>
  .group-a3xxh-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
    background-color: $cardbgColor;  
    overflow: auto;
  }
  .item {
    width: 124px;
    height: 186px;
  }
</style>


