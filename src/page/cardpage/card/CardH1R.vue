<template>
  <div class="card-h1r-container">    
    <div class="left-wrapper">
      <label class="title">{{getTitle}}</label>
      <label class="subtitle">{{getSubtitle}}</label>      
      <label class="desc">{{getLeftDesc}}</label> 
    </div>  
    <img class="photo" v-bind:style="getPhotoStyle" :src="getPhotoUrl" />         
  </div>
</template>

<script>
export default {
  name: 'CardH1R',
  props: {
    item: {
      type: Object
    },
    size: {
      type: Object
    }
  },
  data() {
    return {
      photoWidth: 0,
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
    },
    getPhotoStyle: function () {     
      return {
        width: this.photoWidth + 'px',
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      let height = this.$el.clientHeight
      this.photoWidth = height - 10
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
  .card-h1r-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
    background-color: $cardbgColor;
    // border: 4px solid cornflowerblue;
    .photo {
      margin: 5px;
      height: auto;
      // border: 2px solid deeppink;
    }
    .left-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: stretch;
      .title {
        font-size: $h4;
        color: $titleTextColor;
        margin-top: 9px;
        margin-left: 9px;
        margin-right: 9px;
        @include limit-line(2)
      }
      .subtitle {
        font-size: $h5;
        color: $subtitleTextColor;
        margin-left: 9px;
        margin-right: 9px;
        margin-top: 9px;
        text-align: left;
        @include limit-line(2)
      }
      .desc {
        font-size: $h5;
        color: $subtitleTextColor;
        text-align: left;
        margin-top: 6px;
        margin-right: 5px;
        @include limit-line(1)
      }
    }    
  }  
</style>


