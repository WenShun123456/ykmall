<template>
	<div v-if='isShow' class="content">
		<div>
			<div class="msg">{{msg}}</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isShow: false,
				msg: ''
			}
		},
		props:{
				'time':{
					type: Number,
					default : 2000
				}
		},	
		methods: {
			show(msg) {
				this.msg = msg;
				this.isShow = true;
				setTimeout(() => {
					this.isShow = false;
				},this.time)
			}
		}
	}
</script>

<style scoped>
	.content{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		position: fixed;
		top: 100rpx;
	}
	.msg{
		font-size: 14px;
		color: #fff;
		width: 200rpx;
		height: 100rpx;
		border-radius: 10rpx;
		display: flex;
		background-color: #333;
		opacity: 0.8;
		justify-content: center;
		align-items: center;
	}
</style>