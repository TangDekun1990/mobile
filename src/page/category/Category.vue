<template>
  <div class="category">
	<category-header></category-header>
	<category-body></category-body>
	<tab-bar v-if="isShowTabbar"></tab-bar>
  </div>
</template>

<script>
import categoryHeader from './child/CategoryHeader';
import categoryBody from './child/CategoryBody';
import tabBar from '../../components/common/Tabbar';
export default {
  components: {
    categoryHeader,
    categoryBody,
    tabBar
  },
  computed: {
    isShowTabbar() {
      let isFromHome = this.$route.params.isFromHome;
      if (isFromHome) {
        return false;
      }
      return true;
    }
  }
};
</script>

<style scoped lang='scss'>

</style>


