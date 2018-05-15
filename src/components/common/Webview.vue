<template>
  <div class="webview-container">
    <div v-if="isHtml" class="content-wrapper">
      <p v-html="html"></p>
    </div>
    <div v-else>
      <iframe id="iframe" allowfullscreen='true' scrolling="auto" class="content-wrapper" :style="getFrameStyle" :src="url"></iframe>
    </div>
  </div>   
</template>


<script>
import axios from 'axios'
export default {
  name: 'Webview',
  props: {
    url: {
      required: true,
    },
    isHtml: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      loading: false,
      html: '',
      frameHeight: 0,
    }
  },
  watch: {
    url (value) {
      this.load(value)
    }
  },
  computed: {
    getFrameStyle: function () { 
      return {
        height: this.frameHeight + 'px',
      }
    }
  },
  mounted() {
    this.load(this.url)
    this.$nextTick(() => {      
      this.frameHeight = document.body.scrollHeight - 44
    })
  },
  methods: {
    load (url) {
    if (url && url.length > 0) {
     // 加载中
     this.loading = true
     let param = {
      accept: 'text/html, text/plain'
     }
     this.$http.get(url, param).then((response) => {
      this.loading = false
      // 处理HTML显示
      this.html = response.data
     }).catch(() => {
      this.loading = false
      this.html = '加载失败'
     })
    }
   },   
  }
}
</script>

<style lang="scss" scoped>
  .webview-container {    
    width: 100%;
    height: 100%;
  }
  .content-wrapper {    
    border: none;
    width: 100%;
    height: 100%;    
  }
</style>


