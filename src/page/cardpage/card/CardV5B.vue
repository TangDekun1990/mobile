<template>
  <div class="card-v5b-container">
    <img class="photo" v-bind:style="getPhotoStyle" :src="getPhotoUrl" />
    <label class="title">{{getTitle}}</label>
    <label class="subtitle">{{getSubtitle}}</label>
    <label class="desc">{{getDesc}}</label>       
  </div>
</template>

<script>
import Common from './Common'
import PhotoV from './PhotoV'
export default {
  name: 'CardV5B',
  mixins: [ Common, PhotoV ],  
  computed: {    
  },
  methods: {    
  },
}
</script>

<style lang="scss" scoped>
  .card-v5b-container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: stretch;
    background-color: $cardbgColor;
    // border: 4px solid blue;
  }
  .photo { 
    margin-top: 5px;
    margin-left: 5px;
    // margin-bottom: 9px;
    margin-right: 5px;
    width: auto;    
    // border: 4px solid greenyellow;
  }
  .title {
    font-size: $h5;
    color: $titleTextColor;
    margin-top: 5px;
    margin-left: 9px;
    margin-right: 9px;
    @include limit-line(1); 
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
    margin-left: 9px;
    margin-right: 9px;
    text-align: left;
    @include limit-line(1);
  }  
</style>


