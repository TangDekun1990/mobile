<template>
  <div class="card-z3s-container" @click="onClick">
    <label class="title" style="-webkit-box-orient:vertical">{{getTitle}}</label>    
  </div>
</template>

<script>
import Common from './Common'
export default {
  name: 'CardZ3S',
  mixins: [ Common ],   
  computed: {            
  },
  methods: {            
  },
}
</script>

<style lang="scss" scoped>
  .card-z3s-container {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: $cardbgColor; 
    .title {
      font-size: $h2;
      color: $titleTextColor; 
      margin-left: 4px;
      margin-right: 4px;
      text-align: center;
      @include limit-line(1);  
    }           
  }  
</style>


