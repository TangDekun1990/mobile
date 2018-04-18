<template>
  <div class="container" @click="onClick">
    <img class="photo" :src="getPhotoUrl" />
    <label class="title">{{getTitle}}</label>      
  </div>
</template>

<script>
import Common from './Common'
export default {
  name: 'CardZ3',
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
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background-color: $cardbgColor;
  }
  .title {
    font-size: $h5;
    color: $titleTextColor;    
    margin-left: 7px;
    margin-right: 10px;
    text-align: left;
  }
  .photo {
    margin-top: 4px;
    margin-left: 7px;
    margin-bottom: 4px;
    margin-right: 7px;
  }
</style>


