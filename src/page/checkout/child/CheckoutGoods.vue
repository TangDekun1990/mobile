<template>
  <div class="container" @click="onclick">    
    <div class="photo-wrapper">    
      <img :src="getPhotoUrl(item)" v-for="(item, index) in getData" :key="index"/>
    </div>
    <div class="right-wrapper">
      <label class="subtitle">共{{getTotal}}件</label>
      <img class="indicator" src="../../../assets/image/change-icon/enter@2x.png" />
    </div>    
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
    },
  },
  computed: { 
    getData: function () {
      let data = new Array()
      let items = this.items ? this.items.slice(0) : null
      // 默认最多展示4个
      if (items && items.length >= 4) {
        data = items.splice(0, 4)
      } else {
        data = items
      }
      return data
    },
    getTotal: function () {
      if (this.items && this.items.length) {
        return this.items.length
      }
      return 0
    }
  },
  methods: {
    getPhotoUrl (item) {
      let url = null
      if (item && item.product) {
        let photos = item.product.photos
        if (photos && photos.length) {
          let photo = photos[0]
          if (photo && photo.large) {
            url = photo.large
          } else if (photo.thumb) {
            url = photo.thumb
          } else {
            url = require('../../../assets/image/change-icon/default_image_02@2x.png')
          }
        }
      }
      return url
    },
    onclick() {
      this.$emit('onclick')
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {    
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid $lineColor; 
    .photo-wrapper {
      flex: 1;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: stretch;
      img {
        margin-left: 10px;         
        width: 60px;
        height: 60px;
      }
    }
    .right-wrapper {
      width: 90px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      .subtitle {
        flex: 1;
        margin-left: 20px;        
        color: #7C7F88;
        font-size: 13px;
        text-align: right;
      }
      .indicator {
        width: 7px;
        height: 12px;
        margin-left: 10px;
        margin-right: 10px;      
      }
    }
  }     
</style>


