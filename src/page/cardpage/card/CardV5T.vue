<template>
  <div class="card-v5t-container" @click="onClick">
    <label class="title">{{getTitle}}</label>
    <label class="subtitle">{{getSubtitle}}</label>
    <label class="desc">{{getDesc}}</label>    
    <img class="photo" v-bind:style="getPhotoStyle" :src="getPhotoUrl" />
  </div>
</template>

<script>
import Common from './Common'
import PhotoV from './PhotoV'
export default {
  name: 'CardV5T',
  mixins: [ Common, PhotoV ],  
  methods: {    
  },
}
</script>

<style lang="scss" scoped>
  .card-v5t-container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: stretch;
    background-color: $cardbgColor;
    // border: 4px solid green;
  }
  .title {
    font-size: $h5;
    color: $titleTextColor;
    margin-top: 5px;
    margin-left: 9px;
    margin-right: 9px;
    @include limit-line(1);   
    // background-color: red;
  }
  .subtitle {
    font-size: $h4;
    color: $subtitleTextColor;
    margin-top: 10px;
    margin-left: 9px;
    margin-right: 9px;
    text-align: left;
    @include limit-line(1);
  }
  .desc {
    font-size: $h6;
    color: $subtitleTextColor;
    margin-top: 10px;
    margin-left: 9px;
    margin-right: 9px;
    @include limit-line(1);
    text-align: right;
  }
  .photo {    
    margin-left: 5px;
    margin-bottom: 5px;
    margin-right: 5px;
    width: auto;    
    // border: 2px solid lightblue;
  }
</style>


