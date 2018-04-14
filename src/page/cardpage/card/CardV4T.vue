<template>
  <div class="container">
    <label class="title">{{getTitle}}</label>  
    <img class="photo" :src="getPhotoUrl" />
  </div>
</template>

<script>
import Common from './Common'
export default {
  name: 'CardV4T',
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
  .title {
    font-size: $h4;
    color: $titleTextColor;
    margin-top: 9px;
    margin-left: 9px;
    margin-right: 9px;
    text-align: center;
  }
  .photo {
    margin-top: 9px;
    margin-left: 5px;
    margin-bottom: 5px;
    margin-right: 5px;
  }
</style>


