<template>
  <div class="container">
    <header-view title="个人资料">
      <header-item slot="leftItem" isBack="true" v-on:onclick="goBack">
      </header-item>    
    </header-view>
  </div>
</template>

<script>
import HeaderView from '../../components/common/HeaderView'
import HeaderItem from '../../components/common/HeaderItem'
import { mapState, mapMutations } from 'vuex'
export default {
  components: {
    HeaderView,
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
  .container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
  }
</style>


