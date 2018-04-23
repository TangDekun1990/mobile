<!-- redetail.vue -->
<template>

</template>

<script>
	export default{
		data(){
			return{
				id: this.$route.params.id ? this.$route.params.id : '',
			}
		},

		created() {
			this.$router.push({'name': 'detail', 'params': {'id':this.id}});
		}
	}
</script>
