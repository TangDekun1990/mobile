<template>
  <div>
    <payment-header></payment-header>
    <payment-Nav></payment-Nav>
  </div>
</template>
<script>
import PaymentHeader from './child/PaymentHeader'
import PaymentNav from './child/PaymentNav'
  export default {
    components : {
      PaymentHeader,
      PaymentNav
   }
  }
</script>
<style>

</style>
