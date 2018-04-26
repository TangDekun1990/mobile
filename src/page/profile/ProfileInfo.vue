<template>
	<div class="container">
		<mt-header class="header" title="个人资料">
			<header-item slot="left" v-bind:isBack=true v-on:onclick="goBack"></header-item>
		</mt-header>
		<div class="ui-user-wrapper">
			<!-- 修改头像 -->
			<v-update-avatar></v-update-avatar>
			<!-- 修改昵称 -->
			<div class="ui-update-name">
				<div class="common-update-avatar" @click="goStatus(1)">
					<span>修改昵称</span>
					<span class="info update-user-name">{{username}}</span>
				</div>
			</div>
			<!-- 修改性别 -->
			<div class="ui-update-sexs">
				<div class="common-update-avatar" @click="isShowSheet()">
					<span>性别</span>
					<span class="info">{{setGender(user.gender)}}</span>
				</div>
			</div>
			<!-- 修改密码 -->
			<div class="ui-update-pass">
				<div class="common-update-avatar" @click="goStatus(2)">
					<span>修改密码</span>
				</div>
			</div>
		</div>
		<mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
	</div>
</template>

<script>
import { HeaderItem } from '../../components/common'
import { Header } from 'mint-ui'
import { mapState, mapMutations } from 'vuex'

import updateAvatar from './child/Updata-avatar'
import updateUserName from './child/Updata-name'

import { userProfileUpdate } from '../../api/network/user'
export default {

	computed: {
		...mapState({
			user: state => state.auth.user,
			config: state => state.config.config
		}),
	},

	data(){
		return {
			params: { "values":'', "gender": "", "nickname": "", "avatar_url": ""},
			username: '',
			actions: [
				{
					'name': '男',
					'method': this.getGender
				},
				{
					'name': '女',
					'method': this.getGender
				}
			],
			sheetVisible: false
		}
	},

	created() {
		this.setUserName();
		this.$on('update-user-info', (data) => {
			if (data) {
				this.setParams(data);
				this.userProfileUpdate();
			}
		})
	},

	components: {
		'v-update-avatar': updateAvatar,
		'v-update-name': updateUserName
	},

	methods: {
		...mapMutations({
			clearToken: 'signout',
			saveUser: 'saveUser'
		}),

		/*
		 *  返回上一页
		 */
		goBack() {
			this.$router.go(-1)
		},

		/*
		 * setParams: 设置请求参数
		 */
		setParams(data) {
			let request = this.params;
			if (data) {
				for (const key in data) {
					for (const item in request) {
						if (key == item) {
							request[item] = data[key];
						}
					}
				}
			}
			this.params = Object.assign({}, this.params, request);
		},

		/*
		 * userProfileUpdate: 更新用户资料
		 */
		userProfileUpdate() {
			let params = this.params;
			userProfileUpdate(params.values, params.gender, params.nickname, params.avatar_url).then(res => {
				if (res) {
					this.saveUser({'user': res.user});
				}
			})
		},
		/*
		 *  goStatus: 路由跳转
		 */
		goStatus(type) {
			this.$router.push({'name': 'updateinfo', 'params': {'type': type}})
		},
		/*
		 * setUserName: 设置用户名
		 */
		setUserName() {
			this.username = this.user.nickname ? this.user.nickname : this.user.username
		},

		/*
		 * 设置性别
		 */
		setGender(value) {
			if (value == 0) {
				return '保密';
			} else if ( value == 1 ) {
				return '男';
			} else if(value == 2) {
				return '女';
			}
		},
		/*
		 * isShowSheet: 是否显示性别action
		 */
		isShowSheet() {
			this.sheetVisible = !this.sheetVisible;
		},

		getGender(value) {
			if ( value.name == '男') {
				this.params.gender = 1;
			} else if (value.name == '女') {
				this.params.gender = 2;
			} else if(value.name == '女'){
				this.params.gender = 0;
			}
			this.userProfileUpdate();
		}
	}
}
</script>

<style lang="scss" scoped>
.container {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
}
.header {
	@include header;
}

.ui-user-wrapper {
	height: auto;
	background-color: #fff;
	padding: 0px 20px;
	.user-avtor {
		background: url('../../assets/image/change-icon/enter@2x.png') no-repeat center right;
		background-size: 7px 11px;
		display: flex;
		justify-content: space-between;
		align-content: center;
		align-items: center;
		background-color: #fff;
		height: 50px;
		padding-right: 11px;
		border-bottom: 1px solid #E8EAED;
	}
	span {
		color: #4E545D;
		font-size:15px;
		&.info {
			color: #7C7F88;
			font-size: 12px;
		}
	}
	span.update-user-name {
		flex-basis: 70%;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    text-align: right;
	}
}
</style>


