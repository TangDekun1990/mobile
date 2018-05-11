<template>
  <div class="card-h1r-container" @click="onClick">    
    <div v-if="isLeft" class="h1-content-wrapper">  
      <img class="photo" v-bind:style="getPhotoStyle" :src="getPhotoUrl" />           
      <div class="left-wrapper">
        <label class="title" style="-webkit-box-orient:vertical">{{getTitle}}</label>
        <label class="subtitle" style="-webkit-box-orient:vertical">{{getSubtitle}}</label>      
        <label class="desc" style="-webkit-box-orient:vertical">{{getLeftDesc}}</label> 
      </div>        
    </div> 
    <div v-else class="h1-content-wrapper">    
      <div class="left-wrapper">
        <label class="title" style="-webkit-box-orient:vertical">{{getTitle}}</label>
        <label class="subtitle" style="-webkit-box-orient:vertical">{{getSubtitle}}</label>      
        <label class="desc" style="-webkit-box-orient:vertical">{{getLeftDesc}}</label> 
      </div>  
      <img class="photo" v-bind:style="getPhotoStyle" :src="getPhotoUrl" />         
    </div>       
  </div>
</template>

<script>
import Common from './Common'
import PhotoH from './PhotoH'
export default {
  mixins: [ Common, PhotoH ],
  name: 'CardH1',  
  computed: {    
    getLeftDesc: function () {
      return this.getItemByKey('label1')     
    },
    isLeft () {
      return this.isCardStyle('R')
    },    
  },
  methods: {
    isCardStyle(item) {
      let style = this.item ? this.item.style : null          
      if (style && style.length && style.indexOf(item) >= 0) {        
        return true
      }
      return false
    },
  }
}
</script>

<style lang="scss" scoped>
  .card-h1r-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    background-color: $cardbgColor;
    .h1-content-wrapper {
      flex: 1;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: stretch;      
      .photo {
        margin: 5px;
        height: auto;
      }
      .left-wrapper {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: stretch;
        overflow: hidden;
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
  }  
</style>


