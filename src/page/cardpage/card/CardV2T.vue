<template>
  <div class="container">
    <label class="title">{{getTitle}}</label>
    <div class="row-wrapper">
      <label class="subtitle">{{getSubtitle}}</label>
      <label class="desc">{{getDesc}}</label>
    </div>    
    <img class="photo" :src="getPhotoUrl" />
  </div>
</template>

<script>
import Common from './Common'
export default {
  mixins: [ Common ],
  name: 'CardV2T',
  computed: {        
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
    align-items: stretch;
    background-color: $cardbgColor;
  }
  .title {
    font-size: $h4;
    color: $titleTextColor;
    margin-top: 9px;
    margin-left: 9px;
    margin-right: 9px;
  }
  .row-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: stretch;
    margin-top: 6px;
  }
  .subtitle {
    font-size: $h5;
    color: $subtitleTextColor;
    margin-left: 9px;
    margin-right: 9px;
    text-align: left;
  }
  .desc {
    font-size: $h5;
    color: $subtitleTextColor;
    margin-left: 9px;
    margin-right: 9px;
    text-align: right;
  }
  .photo {
    margin-top: 9px;
    margin-left: 5px;
    margin-bottom: 5px;
    margin-right: 5px;
  }
</style>


