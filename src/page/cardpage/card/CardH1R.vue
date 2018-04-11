<template>
  <div class="container">    
    <div class="left-wrapper">
      <label class="title">{{getTitle}}</label>
      <label class="subtitle">{{getSubtitle}}</label>      
      <label class="desc">{{getLeftDesc}}</label> 
    </div>  
    <img class="photo" :src="getPhotoUrl" />         
  </div>
</template>

<script>
export default {
  name: 'CardH1R',
  props: {
    item: {
      type: Object
    }
  },
  computed: {
    getTitle: function () {       
      return this.getItemByKey('title')
    },
    getSubtitle: function () {
      return this.getItemByKey('subtitle')
    },
    getLeftDesc: function () {
      return this.getItemByKey('label1')     
    },
    getPhotoUrl: function () {
      let url = null
      let photo = this.item ? this.item.photo: null
      if (photo) {
        if (photo.large && photo.large) {
            url = photo.large
          } else if (photo.thumb && photo.thumb) {
            url = photo.thumb
          }
      }
      if (url === null) {
        url = require('../../../assets/image/change-icon/default_image_02@2x.png')
      }
      return url
    }
  },
  methods: {
    getItemByKey(key) {
      if (this.item && this.item[key]) {
        return this.item[key]
      } 
      return ''     
    },
  },
}
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    background-color: $cardbgColor;
  }
  .photo {
    margin-top: 5px;
    margin-left: 5px;
    margin-bottom: 9px;
    margin-right: 5px;
  }
  .left-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    margin: 12px;
  }
  .title {
    font-size: $h4;
    color: $titleTextColor;
    margin-top: 9px;
    margin-left: 9px;
    margin-right: 9px;
  }
  .subtitle {
    font-size: $h5;
    color: $subtitleTextColor;
    margin-left: 9px;
    margin-right: 9px;
    text-align: left;
  }
  .desc {
    font-size: $h5;
    color: $subtitleTextColor;
    text-align: left;
    margin-top: 6px;
    margin-right: 5px;
  }
</style>


