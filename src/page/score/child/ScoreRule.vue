<template>
  <div class="container">
    <mt-header fixed class="header" title="积分规则">
    	<header-item slot="left" v-bind:isBack=true v-on:onclick="goBack">
    	</header-item>
    </mt-header>
    <div class="content">
    	 <div v-html="scoreInfo.score_rule"></div>    	 
    </div>
  </div>
</template>

<script>

import { scoreGet } from '../../../api/network/score'
export default {
  methods: {
    goBack() {
    	this.$router.go(-1)
    },
  },
  data() {
  	return {
  		scoreInfo:{}
  	}
  },
  created() {
  	scoreGet().then(res => {
  		if ( res ) {
  			this.scoreInfo = res;
  		}
  	});
  }
}
</script>

<style lang="scss" scoped>
  .container {
  	background-color: #fff;
		.header {
			@include header;
			border-bottom: 1px solid $lineColor;
		}
  	.content {
  		padding: 64px;
  		border-top: 1px solid #e1e1e1;
  		h3 {
			text-align: center;
			margin-bottom: 10px;
  		}
  	}
  }  
</style>


