<template>
  <div class="container">
    <!-- header -->
    <mt-header class="header" title="使用帮助">
      <header-item slot="left" v-bind:isBack=true v-on:onclick="goBack()">
      </header-item>    
    </mt-header>
    <!-- body -->
    <div class="help-body">
      <help-item v-for="(item, index) in articleData" v-bind:key="item.id" v-on:onclick="getHelpInfo(item.url, item.title)"
        class="section-footer" 
        :icon="require('../../assets/image/change-icon/b10_order@2x.png')" 
        :title="item.title"
        :url="item.url">
      </help-item>
    </div>
  </div>  
</template>

<script>
import { HeaderItem } from '../../components/common'
import { Header } from 'mint-ui'
import HelpItem from '../profile/child/HelpItem';
import { articleList } from '../../api/network/article'; //文章列表
export default { 
  data() {
    return {
      articleData:[],
      aggrementUrl: '', 
    }
  },
  components: {
    HelpItem
  }, 
  created(){
    this.getArticleList(); 
  },
  methods: {
    goBack() {
      this.$router.go(-1) 
    },
    // 获取文章列表数据
    getArticleList() {
      articleList(0, 1, 10).then( res => {
        if(res) {
        this.articleData = res.articles;
        }
      })
    },
    getHelpInfo(url, title) {
      this.$router.push({ name: 'HelpUrl', params: {'url': url,'title': title}})
      // window.location.href = url;
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    .header {
      @include header;
      border-bottom:1px solid #E8EAED;
    }
  }
</style>


