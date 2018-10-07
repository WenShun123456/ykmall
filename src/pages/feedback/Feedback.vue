<template>
	<div class="content">
		<Toast ref='toast'></Toast>
		<div class="top"></div>
		<textarea class="msg" row='10' v-model='suggest' placeholder="填写您宝贵的建议以便我们能为您提供更好的服务"></textarea>
		<input class="msg" type="number" v-model='phone' placeholder="手机号，以便和您取得联系">
		<div class="btn">
			<button open-type='feedback' type='primary' @click='sub'>提交</button>
		</div>
	</div>
</template>
<script>
	import Toast from '@/components/Toast'
	export default {
		data: {
			suggest:'',
			phone:''
		},
		methods: {
			sub(e) {
				if(this.suggest && this.phone) {

				}else{
					this.$refs.toast.show('不能为空');
				}
			}
		},
		components: {
			Toast
		}
	}
</script>
<style scoped>
	.content{background-color: #eee;}
	.top{
		width: 100%;
		height: 20rpx;
	}
	.msg{
		width: 730rpx;
		background-color: #fff;
		margin: 0rpx 0 50rpx 0;
		padding: 20rpx;
	}
</style>