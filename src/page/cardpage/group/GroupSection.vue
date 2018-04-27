<template>
  <div class="group-section-wrapper" @click="onclick">    
    <label class="title">{{getTitle}}</label>
    <!-- <img class="indicator" src="../../../assets/image/change-icon/enter@2x.png" /> -->
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
    },
  },
  computed: {
    getTitle () {
      return (this.item && this.item.title) ? this.item.title : ''
    },
  },
  methods: {
    onclick() {
      this.$emit('onclick')
    }
  }
}
</script>

<style lang="scss" scoped>
  .group-section-wrapper {    
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #fff;
  }
  .title {
    font-size: $h2;
    color: #4E545D;
  }
  .indicator {
    position: fixed;
    width: 7px;
    height: 12px;
    left: 10px;
    right: 10px;      
  }
</style>


