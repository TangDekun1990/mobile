<template>
  <div class="container">
    <img class="photo" :src="getPhotoUrl" />
    <label class="title">{{getTitle}}</label>       
  </div>
</template>

<script>
import Common from './Common'
export default {
  name: 'CardV4B',
  mixins: [ Common ],  
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
</style>


