<template>
	<div class="container">
		<!-- header -->
		<mt-header class="header" title="设置">
			<header-item slot="left" v-bind:isBack=true v-on:onclick="goBack">
			</header-item>
		</mt-header>
		<!-- body -->
		<div class="settings-body">
			<ul>
				<li>
					<span>展示高清图片</span>
					<mt-switch v-model ="isSwitch" v-on:change="setSwitch()"></mt-switch>
				</li>
			    <li v-on:click="about()">
			      	<span>关于我们</span>
			      	<img src="../../assets/image/change-icon/enter@2x.png" >
			    </li>
  			</ul>
		</div>
		<gk-button class="button" type="primary" v-on:click="signout" v-if="isOnline">退出登录</gk-button>
	</div>
</template>

<script>
import { HeaderItem, Button } from '../../components/common'
import { mapState, mapMutations } from 'vuex';
import { Header, MessageBox, Switch } from 'mint-ui'
export default {
	computed: {
		...mapState({
			isOnline: state => state.auth.isOnline,
			time: state => state.profile.time,
			type: state => state.profile.type
		}),
		isSwitch: {
			get:function() {
				return this.$store.state.profile.isSwitch;
			},
			set: function () {}
		}
	},

	methods: {
		...mapMutations({
			clearToken: 'signout',
			changeOpen: 'changeOpen',
			changeType: "changeType",
			saveMessageTime: "saveMessageTime"
		}),
		goBack() {
			this.$router.go(-1)
		},
		signout() {
			MessageBox.confirm('确认退出', '').then(action => {
				this.clearToken()
				this.goBack()
				
				// 清除cookie
				let host = window.location.host
				let parts = host.split('.')
				let domain = ''
				for (let i = 1; i < parts.length; i++) {
					const element = parts[i];
					domain = domain + '.' + element
				}				
				this.$cookie.delete('openid', { domain: domain })
				this.$cookie.delete('token', { domain: domain })
				
				this.changeType(false);
				if(this.user != null) {
					this.saveMessageTime(this.user.joined_at)
				}
			})
		},

		about() {
			this.$router.push('/SettingAbout');
		},

		setSwitch() {
			this.changeOpen(!this.isSwitch)
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
	background-color: #fff;
	.header {
		@include header;
		@include thin-border();
	}
	.button {
		@include button;
		position: absolute;
		width: 90%;
		left: 5%;
		right: 5%;
		bottom: 36px;
		margin: 0px;
	}
	.text {
		color: #ffffff;
		font-size: 18px;
	}
	.settings-body {
		width:100%;
		ul {
			li{
				height: 60px;
				display: flex;
				flex-wrap: nowrap;
				justify-content:space-between;
				align-items: center;
				padding:0px 20px;
				@include thin-border();
				span {
					height:16px;
					font-size:15px;
					color:rgba(78,84,93,1);
					line-height:16px;
				}
				img {
					width:7px;
					height:11px;
				}
			}
		}
	}
}


</style>

<style>
.mint-switch-input:checked+.mint-switch-core {
	border-color: red !important;
	background-color: red !important;
}
</style>

