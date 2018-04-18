<template>
  <div class="container" @click="onClick">
    <img class="photo" v-bind:style="getPhotoStyle" :src="getPhotoUrl" />
    <!-- <label class="title">{{getTitle}}</label>       -->
  </div>
</template>

<script>
import Common from './Common'
export default {
  name: 'CardZ2P',
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
      this.photoWidth = this.$el.clientWidth - 10
      this.photoHeight = this.$el.clientHeight - 10           
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


