<template>
  <div class="container" @click="onclick">
    <img class="top-img" src="../../../assets/image/change-icon/ticket_bg@2x.png">
    <label class="title">{{getName}}</label>
    <label class="subtitle">{{getCondition}}</label>
    <div class="desc-wrapper">
      <label v-for="(item, index) in getTypeItems" :key="index">{{item}}</label>
    </div>
    <img class="indicator" v-if="isSelected" src="../../../assets/image/change-icon/d1_ticket_sel@2x.png">
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object
    },
    isSelected: {
      type: Boolean
    }
  },
  computed: {
    getName: function () {
      let name = ''
      if (this.item) {
        name = this.item.name
      }
      return name
    },
    getCondition: function () {
      let name = ''
      if (this.item) {
        name = this.item.condition
      }
      return name
    },
    getTypeItems: function () {
      let items = []
      if (this.item && this.item.infos) {
        items = this.item.infos
      }
      return items
    },
    getDuration: function () {
      let duration = ''
      let item = this.item
      if (item && item.start_at && item.end_at) {
        duration = item.start_at + ' ~ ' + item.end_at
      }
      return duration
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
  .container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    background-color: #fff;
    margin: 10px 10px 0px 10px;
    .desc-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-end;
      label {
        color: #8C8F93;
        font-size: 12px;
        margin-top: 5px;
        margin-right: 10px;
        text-align: right;
      }
    }
  }
  .top-img {
    margin-top: 0px;
    margin-left: 0px;
    margin-right: 0px;
    height: 4px;
  }
  .title {
    margin-top: 10px;
    margin-left: 14px;
    color: #F75F5F;
    font-size: 18px;
  }
  .subtitle {
    margin-top: 4px;
    margin-left: 14px;
    margin-right: 8px;
    color: #8C8F93;
    font-size: 12px;
  }
  .indicator {
    width: 36px;
    height: 36px;
    position: relative;
    left: 0px;
    bottom: 0px;
  }
</style>


