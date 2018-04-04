<template>
  <div class="container">
    <mt-header class="header" title="管理收货地址">
      <header-item slot="left" v-bind:isBack=true v-on:onclick="goBack">
      </header-item>          
    </mt-header>
    <div class="empty-wrapper" v-if="isEmpty">
      <img src="../../assets/image/change-icon/address_empty@2x.png">
      <label>您还没有添加收货地址</label>
    </div>
    <manage-item 
      v-for="item in items" 
      :key="item.id" 
      :item="item" 
      :isDefault="isDefaultItem(item)" 
      v-on:onDefault="onDefault(item)" 
      v-on:onEdit="onEdit(item)" 
      v-on:onDelete="onDelete(item)">
    </manage-item>
    <div class="submit" @click="addAddress">
      <label class="text">添加收货地址</label>
    </div>
  </div>
</template>

<script>
import { Header } from 'mint-ui'
import { HeaderItem } from '../../components/common'
import ManageItem from './child/ManageItem'
import { Indicator, Toast, MessageBox } from 'mint-ui'
import { mapState, mapMutations } from 'vuex'
import * as consignee from '../../api/network/consignee'
export default {
  components: {
    ManageItem,
  },
  computed: {
    ...mapState({
      defaultItem: state => state.address.defaultItem,
      selectedItem: state => state.address.selectedItem,
      items: state => state.address.items,
    }),
    isEmpty() {
      if (this.items && this.items.length === 0) {
        return true
      }
      return false
    },
  },
  created: function () {
    consignee.consigneeList().then(
      (response) => {
        let items = response.consignees                
        this.saveAddressItems(items)
      }, (error) => {
        Toast(error.errorMsg)
      })
  },  
  methods: {
    ...mapMutations([
      'saveAddressItems',
      'setDefaultAddress',
      'removeAddressItem',
    ]),    
    isDefaultItem(item) {
      if (item && this.defaultItem) {
        if (item.id === this.defaultItem.id) {
          return true
        }
      }
      return false
    },
    goBack() {
      this.$router.go(-1)
    },  
    onDefault(item) {
      let defaultItem = this.defaultItem
      if (defaultItem && defaultItem.id === item.id) {
        return;
      }
      Indicator.open()
      consignee.consigneeSetdefault(item.id).then(
        (response) => {
          Indicator.close()
          this.setDefaultAddress(item)
        }, (error) => {
          Indicator.close()
          Toast(error.errorMsg)
        })
    },
    onEdit(item) {
      this.$router.push({ name: 'addressEdit', params: { mode: 'edit', item: item }})
    },
    onDelete(item) {      
      MessageBox.confirm('确定要删除这条收货地址？', '确认删除').then(action => {
        Indicator.open()
        consignee.consigneeDelete(item.id).then(
        (response) => {
          this.removeAddressItem(item.id)           
          Indicator.close()
        }, (error) => {
          Indicator.close()
          Toast(error.errorMsg)
        })
      })
    },
    addAddress() {
      this.$router.push({ name: 'addressEdit', params: { mode: 'add', item: null }})
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
  }
  .header {
    @include header;
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
  .empty-wrapper {
    margin-top: 40px;
    height: 260px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  .photo {
    width: 112px;
    height: 112px;
  }
  .title {
    font-size: 16px;
    color: #8F8E94;
    text-align: center;
    margin-top: 30px;
  }
</style>

