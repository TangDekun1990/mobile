<template>
  <div class="container">
    <mt-header class="header" title="收货地址">
      <header-item slot="left" v-bind:isBack=true v-on:onclick="goBack">
      </header-item> 
      <header-item slot="right" title="管理" v-on:onclick="goManage">
      </header-item>    
    </mt-header>
    <address-item 
      v-for="item in items" 
      :key="item.id" 
      :item="item" 
      :isSelected="isSelectedItem(item)" 
      v-on:onclick="onclick(item)">
    </address-item>
  </div>
</template>

<script>
import { Header } from 'mint-ui'
import { HeaderItem } from '../../components/common'
import AddressItem from './child/AddressItem'
import { Toast } from 'mint-ui'
import { mapState, mapMutations } from 'vuex'
import * as consignee from '../../api/network/consignee'
export default {
  components: {
    AddressItem,
  },
  computed: {
    ...mapState({
      selectedItem: state => state.address.selectedItem,
      items: state => state.address.items,
    }),
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
      'selectAddressItem',
      'saveAddressItems'
    ]),
    isSelectedItem(item) {
      if (item && this.selectedItem) {
        if (item.id === this.selectedItem.id) {
          return true
        }
      }
      return false
    },
    goBack() {
      this.$router.go(-1)
    },
    goManage() {
      this.$router.push('/addressManage')
    },
    onclick(item) {
      this.selectAddressItem(item)
      this.goBack()
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
</style>

