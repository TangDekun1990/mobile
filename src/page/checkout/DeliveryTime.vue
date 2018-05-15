<template>
  <mt-popup v-model="visiable" position="bottom">
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
  </mt-popup>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import { Popup } from 'mint-ui'
export default {
  name: 'DeliveryTime',
  data() {
    return {
      visiable: false,
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
      this.close()
    },
    onClose() {
      this.close();
      this.move();
    },
     /***取消滑动限制 ***/
    move() {
      var mo = function(e) {
        e.preventDefault();
      };
      document.body.style.overflow = "visible"; //出现滚动条
      document.removeEventListener("touchmove", mo, false);
    },

    open() {
      this.visiable = true
    },
    close() {
      this.visiable = false
    }
  }
}
</script>

<style lang="scss" scoped>
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


