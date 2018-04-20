<script>
export default {
  methods: {
    getPromoTitle(item) {
      let title = null
      let promo = item.promo
      switch (promo) {
        case 'preferential':
        {
          title = '优惠金额'
        }
        break;
        case 'cashgift':
        {
          title = '商家红包'
        }
        break;
        case 'score':
        {
          title = '积分抵现'
        }
        break;
        case 'order_reduction':
        {
          title = '订单促销'
        }
        break;
        case 'goods_reduction':
        {
          title = '商品促销'
        }
        break;
        case 'coupon_reduction':
        {
          title = '优惠券'
        }
        break;
        case 'combined_promos':
        {
          title = '团购'
        }
        break;
        case 'transportTitle':
        {
          title = '运费'
        }
        break;          
      
        default:
          break;
      }
      return title
    },
  },
}
</script>
