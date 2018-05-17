<template>
  <mt-popup v-model="currentValue" position="bottom">
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
  </mt-popup>
</template>

<script>
import { Picker, Popup } from 'mint-ui'
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
  .picker {
    background-color: #ffffff;
  }
  .toolbar {
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    background-color: $mainbgColor;
  }
  .mint-popup-bottom {
    width: 100%;
    height: 276px;
    border: 0px;
    overflow: auto;
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


