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
import { fetchEndpoint } from '../../server/network'
export default {
  name: 'Category',
  components: {
  },
  data: function() {
    return {
      items: [],
      isLoading: false,
      // items: [{'id': 1, 'name': '蔬菜', 'desc': '超时专供'}, {'id': 2, 'name': '水果', 'desc': '急速生鲜'}]
    }
  },
  mounted: {
    
  },
  methods: {
    loadItems() {  
      this.isLoading = true   
      // this.items = [{'id': 1, 'name': '蔬菜', 'desc': '超时专供'}, {'id': 2, 'name': '水果', 'desc': '急速生鲜'}];     
      fetchEndpoint('/v2/ecapi.category.list', 'POST', {"page": 1, "per_page": 100}).then(
        response => {  
          this.isLoading = false        
          this.items = Object.assign([], response.categories)
          console.log('response is:', response)
          console.log('this itmes', this.items)          
        },
        error => {
          this.isLoading = false
          console.log('error is:', error)
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


