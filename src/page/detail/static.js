const header = [
	{
		'name': "商品",
		'id': 0,
		'isActive': false
	},
	{
		'name': "详情",
		'id': 1,
		'isActive': false
	},
	{
		'name': "评价",
		'id': 2,
		'isActive': false
	}
];

const evaluation = [
	{
		'name': '全部',
		'id': 1,
		'isActive': false,
		'value': 'total',
		'grade': 0
	},
	{
		'name': '好评',
		'id': 2,
		'isActive': false,
		'value': 'good',
		'grade': 3
	},
	{
		'name': '中评',
		'id': 3,
		'isActive': false,
		'value': 'medium',
		'grade': 2
	},
	{
		'name': '差评',
		'id': 4,
		'isActive': false,
		'value': 'bad',
		'grade': 1
	}
];

export {
	header,
	evaluation
}
