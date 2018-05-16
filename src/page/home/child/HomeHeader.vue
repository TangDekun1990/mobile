<template>
	<div class="home-header"> 
    <input type="search" placeholder="想找什么？" autocomplete="off" @click="onSearch">      
    <div class="header-item" @click="rightClick">
      <img src="../../../assets/image/change-icon/b0_message@2x.png" class="header-icon">				
    </div>		
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'HomeHeader',
  computed: {
    ...mapState({
      isOnline: state => state.auth.isOnline
    })
  },
  methods: {
    onSearch() {
      this.$router.push({ name: 'search', params: { isFromHome: true } })
    },
    rightClick() {
      if (this.isOnline) {
        this.$router.push('news') 
      } else {
        this.$router.push({ name: 'signin' })
      }     
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
