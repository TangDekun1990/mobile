<template>
  <div class="container">
    <img class="photo" :src="getPhotoUrl" />
    <div class="right-wrapper">
      <label class="title">{{getTitle}}</label>
      <label class="subtitle">{{getSubtitle}}</label>      
      <div class="row-wrapper">
        <label class="desc leftDesc">{{getLeftDesc}}</label>
        <label class="desc rightDesc">{{getRightDesc}}</label>
      </div> 
    </div>           
  </div>
</template>

<script>
export default {
  name: 'CardH2L',
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
    getRightDesc: function () {
      return this.getItemByKey('label2')     
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
  .right-wrapper {
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
  .row-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: stretch;
    margin-top: 6px;
  }  
  .desc {
    font-size: $h5;
    color: $subtitleTextColor;
  }  
  .leftDesc {
    text-align: left;
    margin-right: 5px;
  }
  .rightDesc {
    text-align: right;
    margin-left: 5px;
  }
</style>


