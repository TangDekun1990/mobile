import { ENUM } from '../../config/enum'

// 排序键
export const SORTKEY = [
	{
		key: ENUM.SORT_KEY.DEFAULT,
		name: '综合排序',
		value: ENUM.SORT_VALUE.DESC,
		isMore: true,
		id: 0,
		child: [
			{
				key: ENUM.SORT_KEY.DEFAULT,
				name: '综合排序',
				isMore: false,
				value: ENUM.SORT_VALUE.DESC,
				id:1
			},
			{
				key: ENUM.SORT_KEY.PRICE,
				name: '价格从低到高',
				isMore: false,
				value: ENUM.SORT_VALUE.ASC,
				id: 2
			},
			{
				key: ENUM.SORT_KEY.PRICE,
				name:'价格从高到底',
				isMore: false,
				value: ENUM.SORT_VALUE.DESC,
				id: 3
			},
			{
				key: ENUM.SORT_KEY.CREDIT,
				name: '好评率',
				isMore: false,
				value: ENUM.SORT_VALUE.DESC,
				id: 4
			}
		]
	},
	{
		key: ENUM.SORT_KEY.SALE,
		name: '销量排序',
		isMore: false,
		value: ENUM.SORT_VALUE.DESC,
		id: 5
	},
	{
		key: ENUM.SORT_KEY.DATE,
		name: '新品上架',
		isMore: false,
		value: ENUM.SORT_VALUE.DESC,
		id: 6
	}
];
