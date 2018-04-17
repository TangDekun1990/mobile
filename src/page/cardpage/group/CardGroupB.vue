<template>
  <div class="group-b-container" v-bind:style="getContainerStyle">
    <!-- <label 
      v-for="(layoutItem, index) in getLayoutItems" 
      :key="index">
      {{getItemSizeT(layoutItem)}}
    </label>   -->
    <group-item 
      v-for="(layoutItem, index) in getLayoutItems" 
      :key="index" 
      :layoutItem="layoutItem" 
      :itemSize="getItemSize(layoutItem)"
      :containerSize="getContainerSize"
      :items="getItems"
      v-bind:style="getItemLayout(layoutItem)">
    </group-item>   
  </div>  
</template>

<script>
import { ENUM } from '../../../config/enum'
import Common from './Common'
import GroupItem from './GroupItem'
export default {
  name: 'CardGroupB',
  mixins: [ Common ],
  components: {
    GroupItem,
  },
  data() {
    return {  
      b1lItems: {
        containerRatio: 15.0 / 8.0,
        items: [          
          {
            index: '0',
            sizeRatio: {
              width: 0.4, 
              height: 1,
            },
            children: [],
          },
          {
            index: '-1',
            sizeRatio: {
              width: 0.6, 
              height: 1,
            },
            children: [
              {
                index: '1',
                sizeRatio: {
                  width: 0.6, 
                  height: 0.5,
                },
                children: [],
              },
              {
                index: '2',
                sizeRatio: {
                  width: 0.6, 
                  height: 0.5,
                },
                children: [],
              },
            ],
          },
        ],
      },
      b1rItems: {
        containerRatio: 15.0 / 8.0,
        items: [        
          {
            index: '-1',
            sizeRatio: {
              width: 0.6, 
              height: 1,
            },
            children: [
              {
                index: '0',
                sizeRatio: {
                  width: 0.6, 
                  height: 0.5,
                },
                children: [],
              },
              {
                index: '2',
                sizeRatio: {
                  width: 0.6, 
                  height: 0.5,
                },
                children: [],
              },
            ],
          },
          {
            index: '1',
            sizeRatio: {
              width: 0.4, 
              height: 1,
            },
            children: [],
          },
        ],
      },   
      b2rItems: {
        containerRatio: 15.0 / 8.0,
        items: [ 
          {
            index: '0',
            sizeRatio: {
              width: 0.4, 
              height: 1,
            },
            children: [],
          },       
          {
            index: '-1',
            sizeRatio: {
              width: 0.6, 
              height: 1,
            },
            children: [
              {
                index: '1',
                sizeRatio: {
                  width: 0.6, 
                  height: 0.5,
                },
                children: [],
              },
              {
                index: '-1',
                sizeRatio: {
                  width: 0.6, 
                  height: 0.5,
                },
                children: [
                  {
                    index: '2',
                    sizeRatio: {
                      width: 0.3, 
                      height: 0.5,
                    },
                    children: [],
                  },
                  {
                    index: '3',
                    sizeRatio: {
                      width: 0.3, 
                      height: 0.5,
                    },
                    children: [],
                  },
                ],
              },
            ],
          },        
        ],
      },
      b2rItems: {
        containerRatio: 15.0 / 8.0,
        items: [                
          {
            index: '-1',
            sizeRatio: {
              width: 0.6, 
              height: 1,
            },
            children: [
              {
                index: '0',
                sizeRatio: {
                  width: 0.6, 
                  height: 0.5,
                },
                children: [],
              },
              {
                index: '-1',
                sizeRatio: {
                  width: 0.6, 
                  height: 0.5,
                },
                children: [
                  {
                    index: '2',
                    sizeRatio: {
                      width: 0.3, 
                      height: 0.5,
                    },
                    children: [],
                  },
                  {
                    index: '3',
                    sizeRatio: {
                      width: 0.3, 
                      height: 0.5,
                    },
                    children: [],
                  },
                ],
              },
            ],
          }, 
          {
            index: '1',
            sizeRatio: {
              width: 0.4, 
              height: 1,
            },
            children: [],
          },       
        ],
      }, 
      b3lItems: {
        containerRatio: 15.0 / 8.0,
        items: [ 
          {
            index: '0',
            sizeRatio: {
              width: 0.4, 
              height: 1,
            },
            children: [],
          },       
          {
            index: '-1',
            sizeRatio: {
              width: 0.6, 
              height: 1,
            },
            children: [
              {
                index: '-1',
                sizeRatio: {
                  width: 0.6, 
                  height: 0.5,
                },
                children: [
                  {
                    index: '1',
                    sizeRatio: {
                      width: 0.3, 
                      height: 0.5,
                    },
                    children: [],
                  },
                  {
                    index: '2',
                    sizeRatio: {
                      width: 0.3, 
                      height: 0.5,
                    },
                    children: [],
                  },
                ],
              },
              {
                index: '-1',
                sizeRatio: {
                  width: 0.6, 
                  height: 0.5,
                },
                children: [
                  {
                    index: '3',
                    sizeRatio: {
                      width: 0.3, 
                      height: 0.5,
                    },
                    children: [],
                  },
                  {
                    index: '4',
                    sizeRatio: {
                      width: 0.3, 
                      height: 0.5,
                    },
                    children: [],
                  },
                ],
              },
            ],
          },        
        ],
      },
      b3rItems: {
        containerRatio: 15.0 / 8.0,
        items: [         
          {
            index: '-1',
            sizeRatio: {
              width: 0.6, 
              height: 1,
            },
            children: [
              {
                index: '-1',
                sizeRatio: {
                  width: 0.6, 
                  height: 0.5,
                },
                children: [
                  {
                    index: '0',
                    sizeRatio: {
                      width: 0.3, 
                      height: 0.5,
                    },
                    children: [],
                  },
                  {
                    index: '1',
                    sizeRatio: {
                      width: 0.3, 
                      height: 0.5,
                    },
                    children: [],
                  },
                ],
              },
              {
                index: '-1',
                sizeRatio: {
                  width: 0.6, 
                  height: 0.5,
                },
                children: [
                  {
                    index: '3',
                    sizeRatio: {
                      width: 0.3, 
                      height: 0.5,
                    },
                    children: [],
                  },
                  {
                    index: '4',
                    sizeRatio: {
                      width: 0.3, 
                      height: 0.5,
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            index: '2',
            sizeRatio: {
              width: 0.4, 
              height: 1,
            },
            children: [],
          },        
        ],
      }  
    }
  },
  created() {
    // let items = this.getLayoutItems()
    // this.calculateRatio(items, 1)
  },
  computed: {
    getItemLayout: function (item) {
      const { width, height } = this.getItemSize(item)      
      return {
        width: width + 'px',
        height: height + 'px',
      }
    },
    getContainerStyle: function () {
      const { width, height } = this.getContainerSize()
      return {
        width: width + 'px',
        height: height + 'px',
      }
    },
    getLayoutItems: function () {      
      console.log('getLayoutItems')
      let items = []
      let data = this.getLayoutData()
      if (data && data.items && data.items.length) {
        items = data.items
      }
      console.log('====================================');
      console.log('getLayoutItems is ', items);
      console.log('====================================');
      return items
    },
  },
  methods: {    
    getLayoutData() {
      let data = null      
      let layout = this.item ? this.item.layout : null      
      if (layout === ENUM.CARDGROUP_LAYOUT.B1L) {                
        data = this.b1lItems
      } else if (layout === ENUM.CARDGROUP_LAYOUT.B1R) {                
        data = this.b1rItems
      } else if (layout === ENUM.CARDGROUP_LAYOUT.B2L) {                
        data = this.b2lItems
      } else if (layout === ENUM.CARDGROUP_LAYOUT.B2R) {                
        data = this.b2rItems
      } else if (layout === ENUM.CARDGROUP_LAYOUT.B3L) {                
        data = this.b3lItems
      } else if (layout === ENUM.CARDGROUP_LAYOUT.B3R) {                
        data = this.b3rItems
      }
      console.log('====================================');
      console.log('getLayoutData ...', data);
      console.log('====================================');
      return data
    },
    calculateRatio(items, widthRatio) {
      let firstItem = items && (items.length > 0) ? items[0] : null
      let secondItem = items && (items.length > 1) ? items[1] : null
      if (firstItem && secondItem) {
       firstItem.widthRatio = (firstItem.ratio / secondItem.ratio) * widthRatio
       secondItem.widthRatio = (1 - firstItem.ratio / secondItem.ratio) * widthRatio 
       console.log('firstItem && secondItem')
       console.log('====================================');
       console.log('firstItem (widthRadio, ratio)', firstItem.widthRatio, firstItem.ratio);
       console.log('secondItem (widthRadio, ratio)', secondItem.widthRatio, secondItem.ratio);
       console.log('====================================');
       if (firstItem.children && firstItem.children.length) {
         this.calculateRatio(firstItem.children, firstItem.widthRatio)
       }
       if (secondItem.children && secondItem.children.length) {
         this.calculateRatio(secondItem.children, secondItem.widthRatio)
       }     
      } else if (firstItem) {
        firstItem.widthRatio = 1
        console.log('firstItem')
       console.log('====================================');
       console.log('firstItem (widthRadio, ratio)', firstItem.widthRatio, firstItem.ratio);
       console.log('====================================');
        if (firstItem.children && firstItem.children.length) {
         this.calculateRatio(firstItem.children, firstItem.widthRatio)
       }
      }
    },
    getItemSize(item) {
      console.log('====================================');
      console.log('item is ', item);
      console.log('====================================');
      const { width, height } = this.getContainerSize()      
      
      let itemWidth = item.sizeRatio.width * width
      let itemHeight = item.sizeRatio.height * height
      return {
        width: itemWidth,
        height: itemHeight,
      }
    },
     getItemSizeT(item) {
      console.log('====================================');
      console.log('item is ', item);
      console.log('====================================');
      return '123213231'
    },
    getContainerSize(item) {
      const { width, height } = window.screen
      let data = this.getLayoutData()
      let containerWidth = 0
      let containerHeight = 0
      if (data && data.containerRatio) {
        containerWidth = width
        containerHeight = containerWidth / data.containerRatio
      } 
      return {
        width: containerWidth,
        height: containerHeight,
      }
    }     
  },
}
</script>

<style lang="scss" scoped>
  .group-b-container {    
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
    flex-wrap: wrap;
    // background-color: $cardbgColor;
  }
</style>

