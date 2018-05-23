<template>
	<div class="ui-detail">
		<div>
			<v-aspect-detail :url="detailInfo.intro_url" :unqie="detail" v-if='detailInfo'></v-aspect-detail>
		</div>
		<v-back-top v-if="isshowBacktop" :target="target"></v-back-top>
	</div>
</template>

<script>
	import { mapState } from 'vuex';
	import detail from './Detail';
	import BackTop from './DetailBackTop';
	export default {
		data(){
			return{
				detail: 'detail',
				isshowBacktop: false
			}
		},

		mounted() {
			// 添加滚动事件
			var element = this.$el;
			var that = this;
	        element.addEventListener('scroll', (event) => {
	        	let params = {
	        		'top': element.scrollTop,
	        		'height': element.scrollHeight
	        	};
	        	if (params.top >= 100) {
	        		this.isshowBacktop = true;
	        	} else {
	        		this.isshowBacktop = false;
	        	}
	        	// if( params.height - (params.top + element.offsetHeight + 2) <  0) {
	        	// 	this.isshowBacktop = true;
	        	// } else {
	        	// 	this.isshowBacktop = false;
	        	// }

	        });

	        // 计算内容高度
		    this.$nextTick( () => {
		    	this.target = document.querySelector('.ui-detail');
		    });
		},

		components: {
			'v-aspect-detail': detail,
			'v-back-top': BackTop
		},

		computed: mapState({
			detailInfo: state => state.detail.detailInfo
		}),

		methods: {
		}

	}
</script>

<style lang="scss" scoped>
	.ui-detail {
		height: 100%;
		overflow: auto;
	}
</style>
