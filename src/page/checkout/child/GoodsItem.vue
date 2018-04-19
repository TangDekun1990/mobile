<template>
  <div class="container">
    <img class="photo" :src="getPhotoUrl">
    <div class="right-wrapper">
      <label class="title">{{getTitle}}</label>
      <label class="subtitle">{{item.property}}</label>
      <div class="desc-wrapper">
        <label class="price">AED {{getPrice}}</label>
        <label class="count">x{{item.amount}}</label>
      </div>
    </div>
  </div>  
</template>

<script>
export default {
  props: {
    item: {
      type: Object
    }
  },
  computed: {
    getPhotoUrl: function () {
      let url = null
      let item = this.item
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
    getTitle: function () {
      return this.getItemByKey('name')
    },
    getDesc: function () {
      return this.getItemByKey('desc')
    },
    getPrice: function () {
      let price = this.getItemByKey('price')
      return (price ? this.toFixedPrice(price) : '')
    },
  },
  methods: {
    getItemByKey: function (key) {
      let desc = ''
      let item = this.item
      if (item && item.product) {
        desc = item.product[key]
      }
      return desc
    },
    toFixedPrice(price) {
      return parseFloat(price).toFixed(2)
    },
  }
}
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
    border-top: 1px solid $lineColor;
  }
  .photo {
    width: 90px;
    height: 90px;
    margin-left: 10px;
    margin-top: 10px;
    margin-right: 10px;
  }
  .right-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
  }
  .title {
    margin-top: 8px;
    color: #4E545D;
    font-size: 14px;  
    margin-right: 10px;    
  }
  .subtitle {
    margin-top: 6px;
    color: #7C7F88;
    font-size: 13px; 
    margin-right: 8px;  
  }
  .desc-wrapper {
    height: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    margin-right: 10px;
  }
  .price {
    color: #E7010E;
    font-size: 17px;
    margin-left: 0px;
  }
  .count {
    color: #7C7F88;
    font-size: 16px;
    margin-right: 10px;
  }
</style>


