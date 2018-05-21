<template>
  <div class="container" @click="onClick">
    <img class="photo" :onerror="defaultImage" v-bind:style="getPhotoStyle" :src="getPhotoUrl" />
    <label class="title" style="-webkit-box-orient:vertical">{{getTitle}}</label>
    <div class="row-wrapper">
      <label class="subtitle" style="-webkit-box-orient:vertical">{{getSubtitle}}</label>
      <label class="desc" style="-webkit-box-orient:vertical">{{getDesc}}</label>
    </div>        
  </div>
</template>

<script>
import Common from './Common'
import PhotoV from './PhotoV'
export default {
  mixins: [ Common, PhotoV ],
  name: 'CardV2B',
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
      @include limit-line(1);
    }
    .row-wrapper {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: stretch;
      margin-top: 4px;
      label {
        flex: 1;
      }
      .subtitle {
        font-size: $h5;
        color: $subtitleTextColor;
        margin-left: 9px;
        text-align: left;
        @include limit-line(1);
      }
      .desc {
        font-size: $h5;
        color: $subtitleTextColor;        
        margin-right: 9px;
        text-align: right;
        @include limit-line(1);
      }
    }
  }    
</style>


