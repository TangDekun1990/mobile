<template>
  <transition name="fade">
    <div class="mask" v-show="currentValue" @click="onclickMask">
      <div class="container" v-show="currentValue">
      <mt-picker
        ref="picker" 
        class="picker" 
        :slots="slots" 
        valueKey="name" 
        showToolbar 
        :itemHeight="44"
        @change="onValuesChange">
      <div class="toolbar">
        <button class="toolbar-item cancel-item" @click="cancel">取消</button>
        <button class="toolbar-item confirm-item" @click="confirm">确定</button>
      </div>
    </mt-picker>
    </div>
    </div>            
  </transition>
</template>

<script>
import { Picker } from 'mint-ui'
export default {
  name:'RegionPicker',
  props: {
    items: {
      type: Array
    },
    modal: {
      default: true
    },
    modalFade: {
      default: false
    },
    lockScroll: {
      default: false
    },
    closeOnClickModal: {
      default: true
    },
  },
  data() {
    return {
      currentValue: false,
      slots: [
        {
          flex: 1,
          values: this.items,
          textAlign: 'center' 
        },
        {
          flex: 1,
          values: this.items[0]?this.items[0].regions:[],
          textAlign: 'center' 
        },
      ],
    }
  },
  methods: {
    onValuesChange(picker, values) {
      picker.setSlotValues(1, values[0]?values[0].regions:[])
    },
    onclickMask() {
      this.currentValue = false
    },
    cancel() {
      this.currentValue = false
    },
    confirm() {
      this.currentValue = false
      let values = this.$refs.picker.getValues()
      this.$emit('onConfirm', values)
    }
  }
}
</script>

<style lang="scss" scoped>
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 50001;
    background: rgba(0,0,0,.5);
  }
  .container {
    position: fixed;
    background-color: #e0e0e0;
    width: 100%;
    text-align: center;
    bottom: 0;
    left: 50%;
    max-height: 100%;
    overflow-y: auto;
    transform: translate3d(-50%, 0, 0);
    backface-visibility: hidden;
    transition: transform .3s ease-out;
  }
  .picker {
    background-color: #ffffff;
  }
  .modal-enter {
    opacity: 1;
  }
  .modal-enter-active {
    opacity: 0.3;
  }
  .modal-enter-to {
    opacity: 0.6;
  }
  .modal-leave-active {
    opacity: 0.6;
  }
  .modal-leave-to {
    opacity: 0.6;
  }
  .fade-enter {
    transform: translate3d(-50%, 100%, 0);
  }
  .fade-enter-active {
    
  }
  .fade-enter-to {

  }
  .fade-leave {

  }
  .fade-leave-active {
    transform: translate3d(-50%, 100%, 0);
  }
  .fade-leave-to {

  }
  .toolbar {
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    background-color: $mainbgColor;
  }
  .toolbar-item {    
    font-size: 16px;
    border: none;
    border-radius: 0px;   
    background-color: $mainbgColor; 
  }
  .cancel-item {
    margin-left: 10px;
    color: #4E545D;
  }
  .confirm-item {
    margin-right: 10px;
    color: red;
  }
</style>


