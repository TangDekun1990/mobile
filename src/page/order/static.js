import { ENUM } from '../../config/enum';

export const ORDERSTATUS = [
  {
    'name': '全部',
    'id': ENUM.ORDER_STATUS.ALL
  },
  {
    'name': '配货中',
    'id': ENUM.ORDER_STATUS.DISTRIBUTIONALL
  },
  {
    'name': '已取消',
    'id': ENUM.ORDER_STATUS.CANCELLED
  },
  {
    'name': '已完成',
    'id': ENUM.ORDER_STATUS.FINISHED
  },
  {
    'name': '已收货，待评价',
    'id': ENUM.ORDER_STATUS.DELIVERIED
  },
  {
    'name': '配送中',
    'id': ENUM.ORDER_STATUS.DELIVERING
  },
  {
    'name': '待发货',
    'id': ENUM.ORDER_STATUS.PAID
  },
  {
    'name': '待付款',
    'id': ENUM.ORDER_STATUS.CREATED
  }
];

export const ORDERNAV = [
  {
    'name': '全部',
    'id': ENUM.ORDER_STATUS.ALL
  },
  {
    'name': '待付款',
    'id': ENUM.ORDER_STATUS.CREATED
  },
  {
    'name': '待发货',
    'id': ENUM.ORDER_STATUS.PAID
  },
  {
    'name': '待收货',
    'id': ENUM.ORDER_STATUS.DELIVERING
  },
  {
    'name': '待评价',
    'id': ENUM.ORDER_STATUS.DELIVERIED
  }
];

export const IMAGE = [
  {
    name: '好评',
    id: 0,
    img: require('../../assets/image/change-icon/e7_good_nor@2x.png'),
    activeImg: require('../../assets/image/change-icon/e7_good_sel@2x.png'),
    isActive: true
  },
  {
    name: '中评',
    id: 1,
    img: require('../../assets/image/change-icon/e7_medium_nor@2x.png'),
    activeImg: require('../../assets/image/change-icon/e7_medium_sel@2x.png'),
    isActive: false
  },
  {
    name: '差评',
    id: 2,
    img: require('../../assets/image/change-icon/e7_bad_nor@2x.png'),
    activeImg: require('../../assets/image/change-icon/e7_bad_sel@2x.png'),
    isActive: false
  }
];