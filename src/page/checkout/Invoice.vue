<template>
  <div class="container">
    <mt-header class="header" title="设置发票信息">
      <header-item slot="left" v-bind:isBack=true v-on:onclick="goBack">
      </header-item>    
    </mt-header>
    <flow-radio-list 
      ref='type' 
      title="发票类型" 
      :items="typeItems" 
      :selectedIndex="getTypeIndex"
      v-on:onIndexChanged="onTypeIndexChanged">
    </flow-radio-list>
    <div class="tips-wrapper">
      <label class="tips">怕纸质发票丢失？试试电子发票吧！</label>
    </div>    
    <div class="center-wrapper section-header">    
      <label class="title">发票抬头</label>
      <div class="input-wrapper">
        <textarea placeholder="个人" v-model="value">        
        </textarea>
      </div>       
    </div>
    <info-radio-list 
      ref='content' 
      class="section-header" 
      title="发票明细" 
      v-bind:items="contentItems" 
      :selectedIndex="getContentIndex"
      v-on:onIndexChanged="onContentIndexChanged">
    </info-radio-list>
    <info-toggle-item 
      ref="toggle" 
      class="item section-header" 
      :item="toggleItem" 
      :isSelected="toggle" 
      v-on:onclick="cancel">
    </info-toggle-item>
    <div class="submit" @click="submit">
      <label class="text">确认</label>
    </div>
  </div>
</template>

<script>
import { HeaderItem, InfoRadioList, InfoToggleItem, FlowRadioList } from '../../components/common'
import { Header, Toast } from 'mint-ui'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  data() {
    return {
      value: this.$route.params.title,
      toggleItem: {
        id: '0',
        name: '不要发票',
      },
    }
  },
  created: function () {
    this.fetchTypeItems()
    this.fetchContentItems()
  },
  computed: {
    ...mapGetters({
      getTypeIndex: 'getTypeIndex',
      getContentIndex: 'getContentIndex',
    }),
    ...mapState({
      typeItems: state => state.invoice.typeItems,
      contentItems: state => state.invoice.contentItems,
      title: state => state.invoice.title,
      toggle: state => state.invoice.toggle,
    }),
  },
  methods: { 
    ...mapMutations([
      'saveInvoiceInfo',
      'setInvoiceToggle'
    ]),     
    ...mapActions({
      fetchTypeItems: 'fetchInvoiceTypeItems',
      fetchContentItems: 'fetchInvoiceContentItems'
    }),
    goBack() {
      this.$router.go(-1) 
    },
    selectType(index) {

    },
    onTypeIndexChanged() {      
      if (this.toggle) {         
        this.setInvoiceToggle(false)
        this.$refs.toggle.value = false
      }
    },
    onContentIndexChanged() {      
      if (this.toggle) { 
        this.setInvoiceToggle(false)
        this.$refs.toggle.value = false
      }
    },
    cancel() {
      if (this.toggle) { 
        this.setInvoiceToggle(false)
      } else {
        this.$refs.type.currentIndex = -1
        this.$refs.content.currentIndex = -1
        this.setInvoiceToggle(true)
        this.saveInvoiceInfo({ type: null, title: '', content: null })
      }      
    },
    submit() {
      if (!this.toggle) {
        this.setInvoiceToggle(false)
        let typeIndex = this.$refs.type.currentIndex
        let typeItem = this.typeItems[typeIndex]
        let title = this.value
        let contentIndex = this.$refs.content.currentIndex
        let contentItem = this.contentItems[contentIndex]      
        if (typeIndex < 0 || contentIndex < 0 || title.length <= 0) {
          Toast('请填写完整发票信息')
          return;
        }
        this.saveInvoiceInfo({ type: typeItem, title: title, content: contentItem })
      }      
      this.goBack()
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
    background-color: $mainbgColor;
  }
  .header {
    @include header;
    border-bottom: 1px solid $lineColor;
  }
  .section-header {
    margin-top: 10px;
  }
  .tips-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    background-color: #fff;
  }  
  .tips {
    color: #7C7F88;
    font-size: 14px;
    margin-top: 16px;
    margin-left: 15px;
    margin-bottom: 16px;
  }
  .title {
    color: #4E545D;
    font-size: 16px;
    margin-top: 15px;
    margin-left: 15px;
  }
  .center-wrapper {    
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    background-color: #fff; 
    .input-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: stretch;
      height: 40px;
      margin: 15px;
      textarea {
        flex: 1;
        font-size: 14px;
        color: #4E545D;
        background-color: #F7F8FA;
        padding: 10px;
        border: none;
        &:focus {
          outline-style: none;
        }
      }
    }    
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
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .text {
    color: #ffffff;
    font-size: 18px;
  }
</style>


