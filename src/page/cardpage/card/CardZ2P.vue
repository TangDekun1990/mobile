<template>
  <div class="container">
    <img class="photo" :src="getPhotoUrl" />
    <!-- <label class="title">{{getTitle}}</label>       -->
  </div>
</template>

<script>
import Common from './Common'
export default {
  name: 'CardZ2P',
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
    align-items: center;
    background-color: $cardbgColor;
  }
  .title {
    font-size: $h4;
    color: $titleTextColor;    
    margin-left: 7px;
    margin-right: 10px;
    text-align: left;
  }
  .photo {
    margin: 5px;
  }
</style>


