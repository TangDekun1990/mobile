<template>
  <p v-html="html"></p>
</template>


<script>
import axios from 'axios'
export default {
  name: 'Webview',
  props: {
    url: {
      required: true,
    }
  },
  data() {
    return {
      loading: false,
      html: '',
    }
  },
  watch: {
    url (value) {
      this.load(value)
    }
  },
  mounted() {
    this.load(this.url)
  },
  methods: {
    load (url) {
    if (url && url.length > 0) {
     // 加载中
     this.loading = true
     let param = {
      accept: 'text/html, text/plain'
     }
    //  url = "www.baidu.com"
    //  url = 'http://api.wenchao.pre.geek-zoo.cn/v2/product.intro.3535'
     console.log('====================================');
     console.log(url);
     console.log('====================================');
     // GET request for remote image
    // axios({
    //   method:'get',
    //   url: url,
    //   responseType:'text'
    // })
    //   .then(function(response) {
    //   console.log('====================================');
    //   console.log(response);
    //   console.log('====================================');
    // });
     this.$http.get(url, param).then((response) => {
      this.loading = false
      // 处理HTML显示
      this.html = response.data
     }).catch(() => {
      this.loading = false
      this.html = '加载失败'
     })
    }
   }
  }
}
</script>

<style lang="scss" scoped>

</style>


