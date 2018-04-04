<!-- Evaluate.vue -->
<template>
  <div>
    <payment-header></payment-header>
    <payment-nav></payment-nav>
  </div>
</template>
<script>
  import PaymentHeader from '../payment/child/PaymentHeader';
  import PaymentNav from '../payment/child/PaymentNav';
  export default {
    components : {
      PaymentHeader,
      PaymentNav
    }
  }
</script>
<style>

</style>
