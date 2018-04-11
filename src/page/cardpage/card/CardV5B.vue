<template>
  <div class="card-v5b-container">
    <img class="photo" :src="getPhotoUrl" />
    <label class="title">{{getTitle}}</label>
    <label class="subtitle">{{getSubtitle}}</label>
    <label class="desc">{{getDesc}}</label>       
  </div>
</template>

<script>
export default {
  name: 'CardV5B',
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
    getDesc: function () {              
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
  .card-v5b-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    background-color: $cardbgColor;
  }
  .photo {    
    flex: 1;
    margin-top: 5px;
    margin-left: 5px;
    margin-bottom: 9px;
    margin-right: 5px;
  }
  .title {
    font-size: $h4;
    color: $titleTextColor;
    margin-top: 9px;
    margin-left: 9px;
    margin-right: 9px;
    height: 20px;
  }
  .subtitle {
    font-size: $h5;
    color: $subtitleTextColor;
    margin-top: 40px;
    margin-left: 9px;
    margin-right: 9px;
    text-align: left;
    height: 20px;
  }
  .desc {
    font-size: $h5;
    color: $subtitleTextColor;
    margin-left: 9px;
    margin-right: 9px;
    text-align: left;
    height: 20px;
  }  
</style>


