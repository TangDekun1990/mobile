<template>
	<div class="home-header"> 
    <input type="search" placeholder="想找什么？" autocomplete="off" @click="onSearch">      
    <div class="header-item" @click="rightClick">
      <img src="../../../assets/image/change-icon/b0_message@2x.png" class="header-icon">				
    </div>		
	</div>
</template>

<script>
	export default {
    name: 'HomeHeader',
    methods: {
      onSearch() {
        this.$router.push('search')
      },
      rightClick() {
				this.$router.push('news')
			},
    },
	}
</script>

<style lang="scss" scoped>
	.home-header {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .header-item {
      width: 50px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
    input {
      margin-left: 15px;
      flex: 1;
      flex-basis: 200px;
      border-radius: 4px;
      border: 0px;
      background: url('../../../assets/image/change-icon/search@2x.png') no-repeat 8px center;
      background-size: 16px;
      background-color: #E9ECF0;
      padding: 9px;
      padding-left: 30px;
      color: #A4AAB3;
      font-family: 'PingFangSC';
      font-size: 14px;
      height: 32px;
      border: 0px;
      padding-top: 0px;
      padding-bottom: 0px;
      &:focus {
        outline-offset: 0px;
        outline: none;
      }
    }
		.header-icon {
      width: 20px;
      height: 20px;
    }
	}
</style>
