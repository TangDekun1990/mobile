<template>
  <div class="container">
    <mt-header class="header" title="个人资料">
      <header-item slot="left" v-bind:isBack=true v-on:onclick="goBack">
      </header-item>    
    </mt-header>
  </div>
</template>

<script>
import HeaderItem from '../../components/common/HeaderItem'
import { Header } from 'mint-ui'
import { mapState, mapMutations } from 'vuex'
export default {
  components: {
    HeaderItem
  },  
  computed: {
    ...mapState({
      user: state => state.auth.user,
    }),
  },
  methods: {  
    ...mapMutations({
      clearToken: 'signout'
    }),  
    goBack() {
      this.$router.go(-1) 
    },
  }
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin.scss';
  .container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
  }
  .header {
    @include header;
  }
</style>


