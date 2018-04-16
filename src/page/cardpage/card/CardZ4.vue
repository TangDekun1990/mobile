<template>
  <div class="card-z4-container">
    <img v-bind:style="getPhotoStyle" :src="getPhotoUrl" />
    <!-- <label class="title">{{getTitle}}</label> -->
  </div>
</template>

<script>
import Common from './Common'
export default {
  name: 'CardZ4',
  mixins: [ Common ],  
  computed: {    
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


