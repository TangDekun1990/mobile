<template>
  <div class="card-z4-container">
    <img v-bind:style="getPhotoStyle" :src="getPhotoUrl" />
    <!-- <label class="title">{{getTitle}}</label> -->
  </div>
</template>

<script>
export default {
  name: 'CardZ4',
  props: {
    item: {
      type: Object
    }
  },
  data() {
    return {
      photoWidth: 0,
      photoHeight: 0,
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
    },
    getPhotoStyle: function () {      
      return {
        width: this.photoWidth + 'px',
        height: this.photoHeight + 'px'
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.photoWidth = this.$el.clientWidth
      this.photoHeight = this.$el.clientHeight
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
  .card-z4-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    background-color: $cardbgColor;    
    // border: 4px solid orange;
  }
  .title {
    font-size: $h5;
    color: $titleTextColor;    
    margin-left: 5px;
    margin-right: 5px;
    margin-top: 6px;
    text-align: center;
  }
</style>


