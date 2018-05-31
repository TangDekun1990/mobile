<!-- CategoryBody.vue -->
<template>
	<div class="ui-category-body">
		<div class="category-flex">
			<div class="category-sidebar">
				<ul>
					<li class="item" v-for='item in items' v-bind:key="item.id" v-on:click='setIsActiveByClick(item)' v-bind:class="{'sidbaractive': item.id == currentItem.id, 'noActive' : item.id != currentItem.id}">
						<a>{{ item.name }}</a>
					</li>
				</ul>
			</div>
			<div class="category-content" v-if='currentItem.more'>
				<ul>
					<li class="item" v-on:click='goProduct(currentItem.id)'><a>全部</a></li>
					<li class="item" v-for='item in currentItem.categories' v-bind:key = "item.id" v-on:click='goProduct(item.id)'>
						<a>{{item.name}}</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import { categoryList } from '../../../api/network/category';
export default {
	data(){
		return {
			items: [],
			currentItem: {}
		}
	},
	created(){
		this.getCategoryList()
	},
	methods: {
		getCategoryList() {
			categoryList('', '', 1, 10).then(res => {
				let data = res.categories
				this.items = Object.assign([], data, this.items);
				this.currentItem = this.items[0]
			})
		},
		setIsActiveByClick(item) {
			this.currentItem = item;
		},
		goProduct(id) {
			let params = {'category': id};
			this.$router.push({'name':'products', 'query': params});
		}
	}
}
</script>

<style scoped lang="scss">
.ui-category-body{
	@include pd(44px, 50px, 0px, 0px);
	width: 100%;
	.category-flex {
		display: flex;
		display: -webkit-box;
		display: -moz-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		width: 100%;
		position: absolute;
		bottom: 0px;
		width: 100%;
		top: 0px;
		.category-sidebar {
			flex-basis: 140px;
			background-color: $mainbgColor;
			overflow-y: scroll;
			ul {
				border-right: 0.5px solid #E8EAED;
				li {
					display: block;
					padding: 20px 11px;
					a {
						color: #4E545D;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 1;
						overflow: hidden;
					}
				}
				li.noActive {
					background-color: $mainbgColor;
					border-left: 2px solid transparent;
					a {
						color: #4E545D;
					}
				}
				li.sidbaractive{
					background-color: #FFFFFF;
					border-left: 2px solid #FC2E39;
					a {
						color: #FC2E39;
					}
				}
			}
		}
		.category-content {
			width: 100%;
			background-color: #fff;
			overflow: auto;
			ul {
				height: 100%;
				li {
					display: block;
					padding: 20px 0px;
					text-align: center;
					cursor: pointer;
					border-bottom: 0.5px solid rgb(232,234,237);
					a {
						color: #4E545D;
					}
				}
			}
		}
	}
}
</style>
