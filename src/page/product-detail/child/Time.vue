<!-- Time.vue -->
<template>
	<div class="show-promotions-time" v-if="detailInfo && detailInfo.activity && detailInfo.activity.display_time">
		<div class="time-body">
			<span class="title">距离活动结束时间</span>
			<div>
				<span>{{ day }}</span>&nbsp;天&nbsp;<span>{{ hours }}</span>&nbsp;时&nbsp;<span>{{minute}}</span>&nbsp;分&nbsp;<span>{{second}}</span>&nbsp;秒
			</div>
		</div>
	</div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex';
	export default {
		data() {
			return {
				flag: false,
				day: '',
				hours: '',
				minute:'',
				second:'',
				time: ''

			}
		},

		computed: {
	      	...mapState({
				detailInfo: state => state.detail.detailInfo
			})
		},

		mounted() {
			this.time = setInterval(()=>{
                if(this.flag == true){
                   clearInterval(time);
                } else {
                	this.timeDown();
                }
           }, 1000);
		},

		methods : {
			/*
			 * timeDown: 倒计时
			 */
            timeDown () {
            	if (this.detailInfo && this.detailInfo.activity && this.detailInfo.activity.end_at) {
            		const endTime = new Date(this.detailInfo.activity.end_at * 1000);
	                const nowTime = new Date();
	                let leftTime = parseInt((endTime.getTime()-nowTime.getTime())/1000);
	                this.day = parseInt(leftTime/(24*60*60));
	                this.hours = this.formate(parseInt(leftTime/(60*60)%24));
	                this.minute = this.formate(parseInt(leftTime/60%60));
	                this.second = this.formate(parseInt(leftTime%60));
	                if(leftTime <= 0){
	                   this.flag = true
	                   this.$emit('time-end')
	                }
            	}
            },

            /*
             * 格式化时间
             */
            formate (time) {
                if(time>=10){
                   return time
                }else{
                   return `0${time}`
                }
            }
        }
	}
</script>

<style lang="scss" scoped>
 	.show-promotions-time {
 		margin: 8px 0px;
		div.time-body {
			height:50px;
			background:rgba(255,255,255,1);
			padding: 0px 15px;
			line-height: 50px;
			span.title {
				font-size:14px;
				color:rgba(239,51,56,1);
			}
			div {
				float: right;
				font-size: 12px;
				color:#ABAEB3;
				span {
					color: #EF3338;
					padding: 2px 3px;
					border-radius: 2px ;
					border: 1px solid #ADAFB3;
				}
			}
		}
 	}
</style>
