//  定义路由模式
const routerMode = 'hash'

// 排序键
export const SORTKEY = [
	{
		key: 0,
		name: '综合排序',
		isMore: true,
		child: [
			{
				key: 0,
				name: '综合排序',
			},
			{
				key: 1,
				name: '价格从低到高',
			},
			{
				key: 2,
				name:'价格从高到底'
			},
			{
				key: 3,
				name: '好评率'
			}
		]
	},
	{
		key: 4,
		name: '销量排序',
		isMore: false
	},
	{
		key: 5,
		name: '新品上架',
		isMore: false
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