<template>
	<div class="ui-popup-right">
		<mt-header class="header" v-bind:title="title">
			<header-item slot="left" v-bind:isBack=true v-on:onclick="goBack()"></header-item>
		</mt-header>
		<div v-if="type == 1">
			<div class="updeta-user-name ui-common-update">
				<input type="text" v-model="username" placeholder="请输入昵称">
				<img src="../../../assets/image/change-icon/e2_delete@2x.png" @click="clearUsername()" v-if="username.length > 0">
			</div>
			<div class="ui-save-btn">
				<span @click="saveBtn()">保存</span>
			</div>
		</div>
		<div v-if="type == 2">
			<div class="ui-common-update">
				<input type="password" v-model="oldpass" placeholder="请输入当前密码">
			</div>
			<div class="ui-common-update">
				<input type="password" v-model="newpass" placeholder="请输入新密码">
			</div>
			<div class="ui-common-update">
				<input type="password" v-model="confirpass" placeholder="确认新密码">
			</div>
			<div class="ui-save-btn">
				<span @click="updatePass()">保存</span>
			</div>
		</div>
	</div>
</template>

<script>
import { HeaderItem } from '../../../components/common/'
import { mapState, mapMutations } from 'vuex'
import { userProfileUpdate, userPasswordUpdate } from '../../../api/network/user'
import { Toast } from 'mint-ui';
export default {
	data() {
		return {
			username: '',
			params: { "values":'', "gender": "", "nickname": "", "avatar_url": ""},
			oldpass: '',
			newpass: '',
			confirpass: '',
			type: this.$route.params.type,
			title: this.$route.params.type == 1 ? '修改昵称': '修改密码'
		}
	},

	computed: {
		...mapState({
			user: state => state.auth.user
		}),
	},

	watch: {
		username: function (value) {
			if (value.length > 25) {
				this.username = value.substring(0, 25);
			}
		}
	},

	components: {},

	created(){
		this.setUserName();
	},

	methods: {
		...mapMutations({
			clearToken: 'signout',
			saveUser: 'saveUser',
			signout: 'signout'
		}),

			/*
			 *  返回上一页
			 */
			 goBack() {
			 	this.$router.go(-1)
			 },

			/*
			 修改用户名
			 */
			 setUserName() {
			 	this.username = this.user.nickname ? this.user.nickname : this.user.username;
			 },

			/*
			 * clearUsername: 清除用户名
			 */
			 clearUsername() {
			 	this.username = '';
			 },

			/*
			 *saveBtn:  保存
			 */
			 saveBtn() {
			 	this.userProfileUpdate();
			 },

			/*
			 * userProfileUpdate: 更新用户资料
			 */
			 userProfileUpdate() {
			 	let params = this.params;
			 	params.nickname = this.username;
			 	if (params.nickname.length <= 0) {
			 		Toast('请输入1-25个文字作为昵称');
			 		return false;
			 	}

			 	if (params.nickname.length < 1 || params.nickname.length > 25) {
			 		Toast('请输入1-25个文字作为昵称');
			 		return false;
			 	}
			 	userProfileUpdate(params.values, params.gender, params.nickname, params.avatar_url).then(res => {
			 		if (res) {
			 			Toast('修改昵称成功');
			 			this.saveUser({'user': res.user});
			 			this.$router.go(-1);
					}
				})
			 },

			/*
			 * updatePass: 修改密码
			 */
			 updatePass() {
			 	if (this.oldpass.length === 0) {
			 		Toast('当前密码不能为空');
			 		return false;
			 	}
			 	if (this.oldpass.length < 6 || this.oldpass.length > 20) {
			 		Toast('请输入6-20个字符的密码');
			 		return false;
			 	}

			 	if (this.newpass .length === 0) {
			 		Toast('新密码不能为空');
			 		return false;
			 	}
			 	if (this.newpass.length < 6 || this.newpass.length > 20) {
			 		Toast('请输入6-20个字符的密码');
			 		return false;
			 	}

			 	if (this.confirpass.length === 0) {
			 		Toast('请输入确认密码');
			 		return false;
			 	}
			 	if (this.newpass.length !== this.confirpass.length) {
			 		Toast('确认密码与输入密码不一致');
			 		return false;
			 	}
			 	userPasswordUpdate(this.oldpass, this.newpass).then(res => {
			 		if (res) {
			 			this.signout();
			 			this.$router.push({'name': 'signin'});
			 		}
			 	}, (error) => {
			 		Toast(error.errorMsg);
			 	})
			 }
			}
		}
		</script>

		<style lang='scss' scoped>
		.header {
			@include header;
		}
		.ui-popup-right {
			background-color: #fff;
		}
		.updeta-user-name {
			position: relative;
			input {
				border: 0px;
			}
			img{
				position: absolute;
				top: 17px;
				right: 5px;
				width: 16px;
				height: 16px;
				cursor: pointer;
			}
		}
		.ui-save-btn {
			padding: 36px 38px;
			span {
				display: block;
				width: 100%;
				height:40px;
				background:rgba(252,46,57,1);
				border-radius: 2px;
				border: 0px;
				font-size:16px;
				color:rgba(255,255,255,1);
				text-align: center;
				cursor: pointer;
				line-height: 40px;
				&:focus {
					outline: none;
					outline-offset: 0px;
				}
			}
		}
		</style>
