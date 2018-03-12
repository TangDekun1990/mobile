<template>
  <div>
    <h1>分类</h1>
    <button class="category" @click="loadItems">获取分类</button>
    <button class="category" @click="resetItems">清除分类</button>
    <template v-if="isLoading">
      <p>正在加载...</p>
    </template>
    <template v-else>
      <div class="item" v-for="item in items" :key="item.id">
        {{item.id}} - {{ item.name }} - {{item.desc}}
      </div>
    </template>    
  </div>
</template>

<script>

import { loadItems } from '../../service/category'
export default {
  name: 'Category',
  components: {
  },
  data: function() {
    return {
      items: [],
      isLoading: false, 
    }
  },
  mounted: {
    
  },
  methods: {
    loadItems() {  
      this.isLoading = true 
      loadItems(null, null).then(
        response => {  
          this.isLoading = false        
          this.items = Object.assign([], response.categories)         
        },
        error => {
          this.isLoading = false
        })
    },
    resetItems() {
      this.items = Object.assign([], [])
    }
  }
}
</script>

<style scoped>
  .cagegory {
    background-color: white;
    border-width: 1px;
    border-color: orange;
  }
  .item {
    background-color: #F0F2F5;
    height: 60px;
  }
</style>


