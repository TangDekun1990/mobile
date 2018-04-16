<template>
  <div class="container">
    <img class="photo" v-bind:style="getPhotoStyle" :src="getPhotoUrl" />
    <label ref="title" class="title">{{getTitle}}</label>      
  </div>
</template>

<script>
import Common from './Common'
export default {
  name: 'CardZ1',
  mixins: [ Common ],  
  computed: {    
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


