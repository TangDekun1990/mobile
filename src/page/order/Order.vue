<!-- OrderHeader.vue -->
<template>
  <div>
    <order-header></order-header>
    <order-nav></order-nav>
  </div>
</template>

<script>

import OrderHeader from './child/OrderHeader';
import OrderNav from './child/OrderNav';
export default {
  components: {
    OrderHeader,
    OrderNav,
  },
}
</script>

<style lang="scss" scoped>
  
</style>
