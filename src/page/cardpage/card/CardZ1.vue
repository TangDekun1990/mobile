<template>
  <div class="container">
    <img class="photo" v-bind:style="getPhotoStyle" :src="getPhotoUrl" />
    <label ref="title" class="title">{{getTitle}}</label>      
  </div>
</template>

<script>
export default {
  name: 'CardZ1',
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
        height: this.photoHeight + 'px',
        'border-radius': this.photoWidth / 2.0 + 'px'
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      let height = this.$el.clientHeight
      let titleHeight = this.$refs.title.clientHeight
      this.photoHeight = height - 5 * 3 - titleHeight
      this.photoWidth = this.photoHeight
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
  .container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: $cardbgColor;     
  }
  .title {
    font-size: $h5;
    color: $titleTextColor; 
    margin-top: 5;   
    margin-left: 2px;
    margin-right: 2px;
    margin-bottom: 5px;
    text-align: center;
  }
  .photo {
    margin-top: 5px;
  }
</style>


