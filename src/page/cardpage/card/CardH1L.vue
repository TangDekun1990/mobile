<template>
  <div class="card-h1l-container" @click="onClick">
    <img ref="photo" class="photo" v-bind:style="getPhotoStyle" :src="getPhotoUrl" />
    <div class="right-wrapper">
      <label class="title" style="-webkit-box-orient:vertical">{{getTitle}}</label>
      <label class="subtitle" style="-webkit-box-orient:vertical">{{getSubtitle}}</label>      
      <label class="desc">{{getLeftDesc}}</label>
    </div>           
  </div>
</template>

<script>
import Common from './Common'
import PhotoH from './PhotoH'
export default {
  mixins: [ Common, PhotoH ],  
  name: 'CardH1L',
  computed: {
    getLeftDesc: function () {
      return this.getItemByKey('label1')     
    },        
  },
  methods: {    
  },
}
</script>

<style lang="scss" scoped>
  .card-h1l-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
    background-color: $cardbgColor;
    .photo {
      margin: 5px;
      height: auto; 
    }
    .right-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: stretch;
      .title {
        font-size: $h4;
        color: $titleTextColor;
        margin-top: 9px;
        margin-left: 9px;
        margin-right: 9px;
        @include limit-line(2)
      }
      .subtitle {
        font-size: $h5;
        color: $subtitleTextColor;        
        margin-left: 9px;
        margin-right: 9px;
        margin-top: 9px;
        text-align: left;
        @include limit-line(2)
      } 
      .desc {
        font-size: $h5;
        color: $subtitleTextColor;
        text-align: left;        
        margin-top: 6px;
        margin-left: 9px;
        margin-right: 5px;
        @include limit-line(1)
      }
    }
  }    
</style>


