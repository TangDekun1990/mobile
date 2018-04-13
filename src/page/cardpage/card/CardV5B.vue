<template>
  <div class="card-v5b-container">
    <img class="photo" v-bind:style="getPhotoStyle" :src="getPhotoUrl" />
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
  data() {
    return {
      photoHeight: 0
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
    },
    getPhotoStyle: function () { 
      return {
        height: this.photoHeight + 'px'
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      let width = this.$el.clientWidth
      this.photoHeight = width - 10
    })
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
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: stretch;
    background-color: $cardbgColor;
    // border: 4px solid blue;
  }
  .photo { 
    margin-top: 5px;
    margin-left: 5px;
    // margin-bottom: 9px;
    margin-right: 5px;
    width: auto;    
    // border: 4px solid greenyellow;
  }
  .title {
    font-size: $h5;
    color: $titleTextColor;
    margin-top: 5px;
    margin-left: 9px;
    margin-right: 9px;
    @include limit-line(1); 
  }
  .subtitle {
    font-size: $h4;
    color: $subtitleTextColor;
    margin-top: 10px;
    margin-left: 9px;
    margin-right: 9px;
    text-align: left;
    @include limit-line(1);
  }
  .desc {
    font-size: $h6;
    color: $subtitleTextColor;
    margin-left: 9px;
    margin-right: 9px;
    text-align: left;
    @include limit-line(1);
  }  
</style>


