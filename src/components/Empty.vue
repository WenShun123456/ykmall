<template>
	<div>
		<div class="wrap">
			<div>
				<image mode='aspectFit' src='/static/util/empty.png'></image>
				<div class="content">{{msg}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['msg']
	}
</script>

<style scoped>
	.wrap{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		margin-top: 400rpx;
	}
	image{
		width: 100rpx;
		height: 80rpx;
	}
	.content{
		font-size: 14px;
		color: #999;
	}
</style>