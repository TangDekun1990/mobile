<template>
  <div class="container">
    <img class="photo" :src="getPhotoUrl" />
    <!-- <label class="title">{{getTitle}}</label>       -->
  </div>
</template>

<script>
export default {
  name: 'CardZ2P',
  props: {
    item: {
      type: Object
    }
  },
  computed: {
    getTitle: function () { 
      return this.getItemByKey('title')          
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
    align-items: center;
    background-color: $cardbgColor;
  }
  .title {
    font-size: $h4;
    color: $titleTextColor;    
    margin-left: 7px;
    margin-right: 10px;
    text-align: left;
  }
  .photo {
    margin: 5px;
  }
</style>


