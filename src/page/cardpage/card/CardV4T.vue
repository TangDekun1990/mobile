<template>
  <div class="container" @click="onClick">
    <label class="title" style="-webkit-box-orient:vertical">{{getTitle}}</label>  
    <img class="photo" v-bind:style="getPhotoStyle" :src="getPhotoUrl" />
  </div>
</template>

<script>
import Common from './Common'
import PhotoV from './PhotoV'
export default {
  name: 'CardV4T',
  mixins: [ Common, PhotoV ],  
}
</script>

<style lang="scss" scoped>
  .container {
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
      @include limit-line(1);
    }
    .photo {
      margin-top: 9px;
      margin-left: 5px;
      margin-bottom: 5px;
      margin-right: 5px;
    }
  }  
</style>


