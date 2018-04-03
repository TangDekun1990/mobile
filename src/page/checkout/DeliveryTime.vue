<template>
  <transition>
    <div v-show="currentValue" class="content-wrapper">
      <div class="title-wrapper">
        <label class="title">送货时间</label>
        <div class="close-wrapper" @click="onClose">
          <img class="close" src="../../assets/image/change-icon/close@2x.png">
        </div>        
      </div>
      <div class="list-wrapper">
        <div class="list leftList">
          <div 
            class="item-wrapper" 
            v-bind:class="{ itemSelected: isSelectedDate(item), itemNormal: !isSelectedDate(item) }" 
            v-for="(item, index) in items" 
            :key=index @click="onClickDate(item)">
            <label 
              class="date" 
              v-bind:class="{ dateSelected: isSelectedDate(item), dateNormal: !isSelectedDate(item) }">
              {{item.date}}
            </label>            
          </div>
        </div>
        <div class="list rightList">
          <div class="item-wrapper" v-for="(item, index) in timeItems" :key=index @click="onClickTime(item)">
            <label class="time" v-bind:class="{ timeSelected: isSelectedTime(item), timeNormal: !isSelectedTime(item) }">{{item}}</label>  
            <img v-if="isSelectedTime(item)" class="indicator" src="../../assets/image/change-icon/d1-yes@2x.png">          
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
  },  
  methods: {
    ...mapMutations({
      selectDeliveryDate: 'selectDeliveryDate',
      selectDeliveryTime: 'selectDeliveryTime',
    }),
    isSelectedDate(item) {
      if (item && this.selectedDate && item.date === this.selectedDate) {
        return true
      }
      return false
    },
    isSelectedTime(item) {
      if (item && this.selectedTime && item === this.selectedTime) {
        return true
      }
      return false
    },
    onClickDate(item) {
      this.selectDeliveryDate(item.date)
      this.$emit('onClickDate', item.date)      
    },
    onClickTime(item) {
      this.selectDeliveryTime(item)
      this.$emit('onClickTime', item)
    },
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
    height: 350px;
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
    height: 48px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid $lineColor;
  }
  .title {
    color: #898B8E;
    font-size: 16px;
    text-align: center;
  }
  .close-wrapper {
    width: 48px;
    height: 48px;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .close {
    width: 14px;
    height: 14px;
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
    // border-right: 1px solid $lineColor;
  }
  .rightList {
    flex: 1;
  }
  .item-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    height: 42px;
  }
  .itemSelected {
    background-color: #ffffff;
  }
  .itemNormal {
    background-color: #F8F8F8;
  }
  .date {
    font-size: 14px;
    margin-left: 10px;
  }
  .dateNormal {
    color: #404245;    
  }
  .dateSelected {
    color: #F23030; 
  }
  .time {
    font-size: 14px;
    margin-left: 15px;
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
    margin-left: 8px;
  }
</style>


