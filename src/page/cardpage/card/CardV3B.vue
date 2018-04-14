<template>
  <div class="container">
    <img class="photo" v-bind:style="getPhotoStyle" :src="getPhotoUrl" />
    <label class="title">{{getTitle}}</label>
    <label class="subtitle">{{getSubtitle}}</label>        
  </div>
</template>

<script>
import Common from './Common'
import PhotoV from './PhotoV'
export default {
  mixins: [ Common, PhotoV ],
  name: 'CardV3B',
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
  .photo {
    margin-top: 5px;
    margin-left: 5px;
    margin-right: 5px;
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
</style>


