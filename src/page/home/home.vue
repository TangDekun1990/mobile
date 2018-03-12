<template>
	<div id="demo">efgeygfye {{carData}}</div>
</template>

<script>
	import {cityGuess} from '../../service/service'
	export default {
		data() {
			return {
				carData: ''
			}
		},
		mounted() {
			cityGuess().then(res => {
				console.log(res);
			})
		}
	}
</script>

<style lang="scss" scoped>
</style>