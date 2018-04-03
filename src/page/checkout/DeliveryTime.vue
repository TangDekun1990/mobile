<template>
  <transition>
    <div v-show="currentValue" class="content-wrapper">
      <div class="title-wrapper">
        <label class="title">送货时间</label>
        <img class="close" src="../../assets/image/change-icon/close@2x.png" @click="onClose">
      </div>
      <div class="list-wrapper">
        <div class="list leftList">
          <div class="item-wrapper" v-for="(item, index) in items" :key=index>
            <label class="date" v-bind:class="{ dateSelected: isSelectedDate, dateNormal: !isSelectedDate }">{{item.date}}</label>            
          </div>
        </div>
        <div class="list rightList">
          <div class="item-wrapper" v-for="(item, index) in timeItems" :key=index>
            <label class="date" v-bind:class="{ timeSelected: isSelectedTime, timeNormal: !isSelectedTime }">{{item}}</label>  
            <img v-if="isSelectedTime" class="close" src="../../assets/image/change-icon/close@2x.png">          
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'DeliveryTime',
  data() {
    return {
      currentValue: false
    };
  },
  computed: {
    ...mapState({
      items: state => state.delivery.items,
      selectedDate: state => state.delivery.selectedDate,
      selectedTime: state => state.delivery.selectedTime,
    }),
    ...mapGetters({
      timeItems: 'getTimeItems'
    }),
    isSelectedDate(item) {
      if (item && this.selectedDate && item === this.selectedDate) {
        return true
      }
      return false
    },
    isSelectedTime(item) {
      if (item && this.selectedTime && item === this.selectedTime) {
        return true
      }
      return false
    }
  },  
  methods: {
    onClose() {
      this.close()
    },
    open() {
      this.currentValue = true
    },
    close() {
      this.currentValue = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .content-wrapper {
    position: fixed;
    background-color: #fff;
    width: 100%;
    text-align: center;
    bottom: 0;
    left: 50%;
    max-height: 100%;
    overflow-y: auto;
    transform: translate3d(-50%, 0, 0);
    backface-visibility: hidden;
    transition: transform .3s ease-out;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
  }
  .title-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .title {
    color: #898B8E;
    font-size: 16px;
    text-align: center;
  }
  .close {
    width: 48px;
    height: 48px;
    position: relative;
    top: 0px;
    right: 0px;
    bottom: 0px;
  }
  .list-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
  }
  .list {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
  }
  .leftList {
    width: 126px;
  }
  .rightList {
    flex: 1;
  }
  .item-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .date {
    font-size: 14px;
  }
  .dateNormal {
    color: #404245;
    background-color: #E3E3E3;
  }
  .dateSelected {
    color: #F23030;
    background-color: #ffffff;
  }
  .timeNormal {
    color: #404245;
    background-color: #ffffff;
  }
  .timeSelected {
    color: #F23030;
    background-color: #ffffff;
  }
  .indicator {
    width: 11px;
    height: 8px;
  }
</style>


