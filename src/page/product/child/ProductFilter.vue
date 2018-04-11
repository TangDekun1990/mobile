<!-- ProductFilter.vue -->
<template>
	<div class="ui-product-filter">
		<ul class="filter-list">
			<li class="item"
				v-for='(item, index) in SORTKEY'
				v-bind:key='item.id'
				v-on:click='setActiveSortkey(item, index)'
				v-bind:class="{'sortactive': item.id == currentSortKey.id, 'sortnormal' : item.id != currentSortKey.id}">
				<a v-if='!item.isMore'>{{item.name}}</a>
				<a v-if='item.isMore' v-on:click="isShowDroupMenu()">{{sort.name}}</a>
				<img src="../../../assets/image/change-icon/triangle_click@2x.png" v-if='index == 0'>
			</li>
		</ul>

		<div class="sort-model" v-if='currentSortKey.isMore && isShowMore' >
			<div v-for='(item, index) in childSort' v-bind:key='item.id' v-on:click='getSortChild(item)' v-bind:class="{'active': item.id == sort.id}">
				<a>{{item.name}}</a>
				<img src="../../../assets/image/change-icon/c1_choose@2x.png" v-if='item.id != sort.id'>
				<img src="../../../assets/image/change-icon/d1-yes@2x.png" v-if='item.id == sort.id'>
			</div>
		</div>
	</div>
</template>

<script>
import { SORTKEY } from '../static'
import { mapState, mapMutations } from 'vuex';
export default {
	data(){
		return {
			SORTKEY: SORTKEY,
			currentSortKey: {},
			childSort: [],
			sort: {},
			isShowMore: false
		}
	},
	props:['keyword'],
	created(){
		this.currentSortKey = SORTKEY[0];
		this.childSort = this.currentSortKey.child;
		this.sort = this.childSort[0];
	},
	computed: mapState({
		isSearch: state => state.product.isSearch
	}),
	methods: {
		...mapMutations({
			isShowProductModel: 'changeIsShowProductModel',
			changeSearch: 'changeSearch'
		}),
		closeFiler() {
			this.isShowMore = false;
		},
		isShowDroupMenu(){
			let item = this.currentSortKey;
			if (item.isMore) {
				this.isShowMore = true;
			} else {
				this.isShowMore = false;
			}
			this.isShowProductModel(this.isShowMore);
		},
		setActiveSortkey(item, index) {
			this.currentSortKey = item;
			this.getValue();
		},
		getValue(){
			if (this.keyword) {
				this.changeSearch(true);
			}
			let data = this.getSortValue();
			this.$parent.$emit('change-list', {'value': data, 'isSearch': this.isSearch, 'keyword': this.keyword});
		},
		getSortChild(item){
			this.isShowProductModel(false);
			this.sort = item;
			this.isShowMore = !this.isShowMore;
			this.getValue();
		},
		getSortValue() {
			let sort = this.currentSortKey,
				value = {'sort_key': '', 'sort_value':''};
			if (sort.isMore) {
				value.sort_key = this.sort.key;
				value.sort_value = this.sort.value;
			} else {
				value.sort_key = sort.key;
				value.sort_value = sort.value;
			}
			return value;
		}
	}
}
</script>

<style scoped lang='scss'>
	.ui-product-filter {
		width: auto;
		ul.filter-list{
			display: flex;
			width: auto;
			justify-content: space-around;
			align-content: center;
    		align-items: center;
    		border: 1px solid #E8EAED;
    		border-left: 0px;
    		border-right: 0px;
    		li{
    			padding: 15px 0px;
    			font-size: 14px;
    			color: #4E545D;
    			font-family: 'PingFangSC';
    			border-bottom: 2px solid transparent;
    			position: relative;
    			flex-basis: 100px;
				text-align: center;
				img {
					height: 4px;
				    width: 8px;
				    vertical-align: middle;
				}
    		}
    		li.sortactive {
    			border-bottom-color: #F23030;
    			a {
    				color: #F23030;
    			}
    		}
    		li.sortnormal {
    			border-bottom-color: transparent;
    			a {
    				color: #4E545D;
    			}
    		}
		}
		.sort-model {
			position: absolute;
			left: 0px;
			width: 100%;
			z-index: 10;
			div {
				color: #4E545D;
				padding: 15px;
				font-size: 13px;
				font-family: 'PingFangSC';
				background-color: #fff;
				margin: 0px;
				border-bottom: 1px solid #E8EAED;
				cursor: pointer;
				display: flex;
				width: auto;
				justify-content: space-between;
				align-content: center;
				align-items: center;
				img {
					float: right;
					width: 13px;
					height: 9px;
				}
				&.active {
					color: #F23030;
				}
			}
		}
	}
</style>
