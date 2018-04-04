<template>
  <div>
    <div class="image">
      <img src="../../../assets/image/change-icon/e5_clock@2x.png" alt="">
      <span>等待付款</span>
    </div>
    <div class="address">
      <img src="../../../assets/image/change-icon/e5_address@2x.png" alt="">
      <span>小布丁</span>
      <span>13543210808</span> 
      <p>北京市朝阳区朝外大街乙6号 朝外SOHO A座 807<br/> 朝外SOHO A座 807</p>
    </div>
    <div class="contact">
      <a href="">
        <span>联系客服</span>
        <img src="../../../assets/image/change-icon/e5_service@2x.png" alt="">
      </a>
    </div>
    <order-item></order-item>
    <div class="detail">
      <label class="number">订单编号：62346675723 &nbsp;&nbsp; <input type="submit" value=" 复制 "> <br> 下单时间：2018-04-03 14:45:30</label> 
      <label class="pay">支付方式：货到付款</label> 
      <label class="givetime"> 配送方式：温超物流 <br/>  配送时间：2018-04-05 08:00 - 16:00</label>
    </div>
    <div class="price">
      <order-price class="price-item" title="商品总额" subtitle="AED 25.46"></order-price>
      <order-price class="price-item" title="+税额" subtitle="AED 10.46"></order-price>
      <order-price class="price-item" title="+运费" subtitle="AED 18.46"></order-price> 
      <order-price class="price-item" title="-商家红包" subtitle="AED 18.46"></order-price> 
      <label class="amount">实付款: <span>AED 518.47</span> </label>    
    </div>
     <div class="btn">
        <button>取消订单</button>
        <button class="buttonbottom"> 去支付 </button>
     </div>
  </div>
</template>
<script>
  import OrderItem from './OrderItem';
  import OrderPrice from './OrderPrice';
  export default {
    components: {
      OrderItem,
      OrderPrice
    }
  }
</script>
<style lang="scss" scoped>
  .image{
    background-image:url('../../../assets/image/change-icon/bg_order@2x.png');
    height: 70px;
    display: flex;
    justify-content:flex-start;
    align-items:center;
  }
  img {
    height: 18px;
    padding: 0px 12px;
  }
  span {
    font-size: 17px;
    color:#fff;
  }
  .address {
    height: 100px;
    background-color: #fff;
  }
  .address img {
    height: 16px;
  }
  .address span {
    color:#4E545D;
    font-size:16px;
    padding: 15px 10px 10px;
  }
  .address p {
    padding: 10px 36px 14px 15px;
    font-size: 14px;
    color:#7C7F88;
  }
  .contact {
    display: flex;
    justify-content:flex-end;
    align-items:center;
    height: 46px;
    background-color: #fff;
    margin-top: 8px;
    border-bottom: 1px solid $lineColor;
  }
  .contact span {
    font-size: 12px;
    color:#4E545D
  }
  .contact img {
    width: 12px;
    height: 13px; 
  }
  .detail {
    display: flex;
    flex-direction: column;
    align-items:center;
    font-size: 14px;
    color:#7C7F88;
    height: 195px;
    background-color: #fff;
    margin: 8px 0;
    padding:12px 14px;
    box-sizing: border-box;
  }
  .detail .number, .pay {
    border-bottom: 1px solid $lineColor;    
  }
  .detail .pay {
    padding-top:25px;
  }
  .detail .givetime {
    padding-top:30px;
  }
  .detail input {
    background-color: #fff;
    border:1px solid #7C7F88;
  }
  .price {
    height: 163px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    padding: 10px 0px;
    box-sizing: border-box;
  }
  .price-item {
    flex: 1;    
  }
  .amount-wrapper {    
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background-color: #fff;
  }
  .amount {
    display: flex;
    flex: 1;  
    align-items:center;  
    justify-content:flex-end;
    font-size: 14px;
    color: #4E545D;
    text-align: right;
    padding-right: 15px;
    border-top: 1px solid $lineColor; 
  }
  .amount span {
    font-size: 16px;
    color:#F33C3C;
  }
  .btn {
    height: 54px;
    display: flex;
    justify-content:flex-end;
    margin-top: 26px;
    background-color: #fff;
    align-items:center;
  }
  button {
    width: 82px;
    height: 36px;
    font-size:14px;
    margin-right: 7px;
    background-color: #fff;
    border:1px solid #ccc;
  }
  .buttonbottom {
    color:#F23030;
    border:1px solid #F23030;
  }
</style>
