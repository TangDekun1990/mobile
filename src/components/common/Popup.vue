<!-- Popup.vue -->
<template>
	<div class="ui-common-popup">
		<!-- <popup :visible.sync="show" position="bottom">efgyegyegy</popup> -->
		<!-- <mt-popup v-model="show" position="bottom">
			efgyegyegy
		</mt-popup> -->
		<mt-popup v-model="popupVisible4" position="bottom" class="mint-popup-4">
			fgrygfyrgfr
	      <!-- <mt-picker :slots="dateSlots" @change="onDateChange" :visible-item-count="5" :show-toolbar="false"></mt-picker> -->
	    </mt-popup>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	export default {
		data() {
			return {
				show: true,
				popupVisible4: false
			}
		},
		props: {
			location:{
				type: String,
				default: 'bottom'
			}
		},
		computed:{
			...mapState({
				isShowCartPopup: state => state.cart.isShowCartPopup
			})
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>

</style>
