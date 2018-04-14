<template>
  <div class="card-v3t-container">
    <label class="title">{{getTitle}}</label>
    <label class="subtitle">{{getSubtitle}}</label>    
    <img class="photo" v-bind:style="getPhotoStyle" :src="getPhotoUrl" />
  </div>
</template>

<script>
import Common from './Common'
export default {
  mixins: [ Common ],
  name: 'CardV3T',  
  computed: {    
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
  },
}
</script>

<style lang="scss" scoped>
  .card-v3t-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    background-color: $cardbgColor;
  }
  .title {
    font-size: $h4;
    color: $titleTextColor;
    margin-top: 9px;
    margin-left: 9px;
    margin-right: 9px;
    text-align: center;
  }
  .subtitle {
    font-size: $h5;
    color: $subtitleTextColor;
    margin-top: 6px;
    margin-left: 9px;
    margin-right: 9px;
    text-align: center;
  }
  .photo {
    margin-top: 9px;
    margin-left: 5px;
    margin-bottom: 5px;
    margin-right: 5px;
  }
</style>


