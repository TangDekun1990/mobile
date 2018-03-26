<template>
  <div class="container">
    <mt-header class="header" title="设置发票信息">
      <header-item slot="left" v-bind:isBack=true v-on:onclick="goBack">
      </header-item>    
    </mt-header>
    <div class="top-wrapper">
      <label class="title">发票类型</label>
      <div class="type-wrapper">
        <div class="type-item" v-for="item in typeItems" :key="item">
          <label class="typye-title">{{item}}</label>
        </div>
      </div>
      <label class="tips">怕纸质发票丢失？试试电子发票吧！</label>
    </div>    
    <div class="center-wrapper section-header">    
      <label class="title">发票抬头</label>
      <div class="input-wrapper">
        <textarea placeholder="个人">        
        </textarea>
      </div>       
    </div>
    <info-radio-list class="section-header" title="发票明细" v-bind:items="infoItems">
    </info-radio-list>
    <info-radio-item class="item section-header" title="不要发票" isSelected="true">
    </info-radio-item>
    <div class="submit" @click="submit">
      <label class="text">确认</label>
    </div>
  </div>
</template>

<script>
import { HeaderItem, InfoRadioList, InfoRadioItem } from '../../components/common'
import { Header } from 'mint-ui'
export default {
  data() {
    return {
      typeItems: ['个人发票', '公司发票', '其他'],
      infoItems: ['商品清单 ', '电器', '办公用品', '其他'],
    }
  },
  methods: {      
    goBack() {
      this.$router.go(-1) 
    },
    submit() {

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
    background-color: $mainbgColor;
  }
  .header {
    @include header;
  }
  .section-header {
    margin-top: 10px;
  }
  .top-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    background-color: #fff;
    border: 1px solid $lineColor;
  }
  .title {
    color: #4E545D;
    font-size: 16px;
    margin-top: 15px;
    margin-left: 15px;
  }
  .type-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
  }
  .type-item {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border: 1px solid #404245;
    border-radius: 1px;
    height: 35px; 
    padding-left: 15px;  
    padding-right: 15px;
    margin-left: 15px;
    margin-top: 15px;
  }
  .type-title {
    color: #4E545D;
    font-size: 14px; 
    padding-left: 17px;
    padding-right: 17px;   
  }
  .tips {
    color: #7C7F88;
    font-size: 14px;
    margin-top: 16px;
    margin-left: 15px;
    margin-bottom: 16px;
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


