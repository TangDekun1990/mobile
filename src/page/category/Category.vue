<template>
  <div class="category">
	<category-header></category-header>
	<category-body></category-body>
  </div>
</template>

<script>
import categoryHeader from './child/CategoryHeader';
import categoryBody from './child/CategoryBody';
export default {
  components: {
    categoryHeader,
    categoryBody
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


