<template>
  <div class="container">
    <mt-header class="header" title="积分规则">
    	<header-item slot="left" v-bind:isBack=true v-on:onclick="goBack">
    	</header-item>
    </mt-header>
    <div class="content">
    	 <div v-html="scoreInfo.score_rule"></div>    	 
    </div>
  </div>
</template>

<script>

import { scoreInfo} from '../../../api/network/score'
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
  	scoreInfo().then(res => {
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
  	.content {
  		padding: 20px;
  		border-top: 1px solid #e1e1e1;
  		h3 {
			text-align: center;
			margin-bottom: 10px;
  		}
  	}
  }  
</style>


