<template>
  <div class="card-v3t-container" @click="onClick">
    <label class="title" style="-webkit-box-orient:vertical">{{getTitle}}</label>
    <label class="subtitle" style="-webkit-box-orient:vertical">{{getSubtitle}}</label>    
    <img class="photo" :onerror="defaultImage" v-bind:style="getPhotoStyle" :src="getPhotoUrl" />
  </div>
</template>

<script>
import Common from './Common'
import PhotoV from './PhotoV'
export default {
  mixins: [ Common, PhotoV ],
  name: 'CardV3T',  
}
</script>

<style lang="scss" scoped>
  .card-v3t-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    background-color: $cardbgColor;
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
      margin-top: 4px;
      margin-left: 9px;
      margin-right: 9px;
      text-align: center;
      @include limit-line(1);
    }
    .photo {
      margin-top: 9px;
      margin-left: 5px;
      margin-bottom: 5px;
      margin-right: 5px;
      @include limit-line(1);
    }
  }  
</style>


