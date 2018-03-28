<template>
  <div class="container">
    <mt-header class="header" :title="getTitle">
      <header-item slot="left" v-bind:isBack=true v-on:onclick="goBack">
      </header-item>          
    </mt-header>
    <form-input-item 
      ref='name'
      class="item" 
      title="收件人姓名" 
      :default="getName" 
      placeholder="请如实填写收货人姓名">
    </form-input-item>
    <form-input-item 
      ref='mobile'
      class="item" 
      title="手机号码" 
      :default="getMobile" 
      placeholder="请如实填写手机号码">
    </form-input-item>
    <form-text-item 
      ref='region'
      class="item" 
      title="所在地区" 
      value="18600235103" 
      placeholder="市，区，街">
    </form-text-item>
    <form-input-item 
      ref='address'
      class="item" 
      title="详细信息" 
      :default="getAddress" 
      placeholder="请用英文填写街道大楼及房间号">
    </form-input-item>
    <div class="submit" @click="submit">
      <label class="text">保存</label>
    </div>
  </div>
</template>

<script>
import { Header } from 'mint-ui'
import { HeaderItem, FormInputItem, FormTextItem } from '../../components/common'
import { Toast, Indicator } from 'mint-ui'
import { mapMutations } from 'vuex'
import * as consignee from '../../api/network/consignee'
export default {
  computed: {
    isAddMode() {
      let mode = this.$route.params.mode;        
      // add: 添加地址，edit: 编辑地址
      if (mode === 'add') {
        return true
      } else {
        return false
      }
    },
    getTitle() {      
      if (this.isAddMode) {
        return '新增地址'
      } else {
        return '修改收货地址'
      }
    },
    getName() {      
      if (!this.isAddMode && this.getItem) {
        return this.getItem.name
      } else {
        return null
      }      
    },
    getMobile() {      
      if (!this.isAddMode && this.getItem) {
        return this.getItem.mobile
      } else {
        return null
      }
    },
    getRegion() {      
      if (!this.isAddMode && this.getItem) {
        // TODO:
        return '区域'
        // return this.getItem.region
      } else {
        return null
      }
    },
    getAddress() {      
      if (!this.isAddMode && this.getItem) {
        return this.getItem.address
      } else {
        return null
      }
    },
    getItem() {      
      return this.$route.params.item;        
    },
  },
  methods: {
    ...mapMutations([
      'addItem',
      'modifyItem'
    ]),    
    goBack() {
      this.$router.go(-1)
    },  
    submit() {
      let name = this.$refs.name.value
      let mobile = this.$refs.mobile.value
      let region = this.$refs.region.value
      let address = this.$refs.address.value
      if (name.length === 0) {
        Toast('请填写收件人姓名');
        return;
      }
      if (name.length < 2 || name.length > 15) {
        Toast('2-15个字符限制');
        return;
      }
      if (mobile.length === 0) {
        Toast('请填写手机号码');
        return;
      }
      // TODO:
      // if (region.length === 0) {
      //   Toast('请选择所在地区');
      //   return;
      // }
      if (address.length === 0) {
        Toast('请填写详细地址');
        return;
      }

      if (this.isAddMode) {
        // TODO: regionId
        region = '3291'
        Indicator.open()
        consignee.consigneeAdd(name, mobile, null, null, region, address).then(
          (response) => {
            Indicator.close()
            let item = response.consignee                
            this.addItem(item)
            this.goBack()
          }, (error) => {
            Indicator.close()
            Toast(error.errorMsg)
          })
      } else {        
        let item = this.getItem
        let consigneeId = item?item.id:null
        // TODO:
        region = '3291'
        Indicator.open()
        consignee.consigneeUpdate(consigneeId, name, mobile, null, null, region, address).then(
          (response) => {
            Indicator.close()
            let item = response.consignee                
            this.modifyItem(item)
            this.goBack()
          }, (error) => {
            Indicator.close()
            Toast(error.errorMsg)
          })
      }
    },     
  }
}
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
  }
  .header {
    @include header;
    border-bottom: 1px solid $lineColor;
  }
  .item {
    height: 50px;
  }
  .submit {
    border-radius: 4px;
    background-color: #f23030;
    height: 44px;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .text {
    color: #ffffff;
    font-size: 16px;
  }
</style>

