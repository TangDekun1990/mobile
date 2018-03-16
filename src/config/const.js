//  定义路由模式
const routerMode = 'hash'

// 排序键
export const SORTKEY = [
	{
		key: 'DEFAULT',
		name: '综合排序',
		value: 'DESC',
		isMore: true,
		id: 0,
		child: [
			{
				key: 'DEFAULT',
				name: '综合排序',
				value: 'DESC',
				id:1
			},
			{
				key: 'PRICE',
				name: '价格从低到高',
				value: 'ASC',
				id: 2
			},
			{
				key: 'PRICE',
				name:'价格从高到底',
				value: 'DESC',
				id: 3
			},
			{
				key: 'CREDIT',
				name: '好评率',
				value: 'DESC',
				id: 4
			}
		]
	},
	{
		key: 'SALE',
		name: '销量排序',
		isMore: false,
		value: 'DESC',
		id: 5
	},
	{
		key: 'DATE',
		name: '新品上架',
		isMore: false,
		value: 'DESC',
		id: 6
	}
];

// 排序值
export const SORTVALUE = [
	{
		key: 0,
		name: '默认排序'
	},
	{
		key: 1,
		name: '升序'
	},
	{
		key: 2,
		name: '降序'
	}
];

export default {
	'routerMode': routerMode,	
	'SORTKEY': SORTKEY,
	'SORTVALUE': SORTVALUE
}