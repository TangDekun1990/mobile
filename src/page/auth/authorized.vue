<template></template>

<script>
	import { Indicator} from 'mint-ui'
	import { userProfileGet } from '../../api/network/user'
	import { mapMutations, mapActions, mapState } from 'vuex'
	export default {
		created(){
			this.onAuthSuccess();
		},

		methods: {
			...mapMutations({
				saveUser: 'saveUser',
				saveToken: 'saveToken'
			}),

			onAuthSuccess () {
				let openid = this.$cookie.get('openid')
		  		let token = this.$cookie.get('token')
		  		if (openid && token) {
		  			Indicator.open()
		  			this.saveToken({ 'token': token, 'isOnline': 'isOnline'})
			  		userProfileGet().then(response => {
		  				Indicator.close()
		  				console.log(response);
		  				debugger;
		  				if (response && response.user) {
		  					if (response.user.mobile_binded) {
		  						this.saveUser(response.user);
		  						this.saveToken({ 'token': token, 'isOnline': 'online'})
		  						this.goHome();
		  					} else {
		  						this.goSignup();
		  					}
		  				}
			  		},error => {
		  				Indicator.close()
			  		});
		  		}
			},

			goSignup() {
				this.$router.push({'name': 'signup', 'query': {'mode': 'bind'}})
			},

			goSingIn() {
				this.$router.push({'name': 'signin', 'params': {'isTokenInvalid': false}})
			},

			goHome() {
	  			this.$router.push('/home')
	  		}
		}
	}
</script>
