<template>
  <div class="card-z2-container" @click="onClick">
    <img v-bind:style="getPhotoStyle" :onerror="defaultImage" :src="getPhotoUrl" />    
  </div>
</template>

<script>
import Common from './Common'
export default {
  name: 'CardZ2',
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
      if (this.photoWidth == 0) {
        this.photoWidth = this.$el.style.width.replace('px', '')
      }
      if (this.photoHeight == 0) {
        this.photoHeight = this.$el.style.height.replace('px', '')
      }      
    })
  },
  methods: {    
  },
}
</script>

<style lang="scss" scoped>
  .card-z2-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    background-color: $cardbgColor;    
    // border: 4px solid pink;
  }
</style>


