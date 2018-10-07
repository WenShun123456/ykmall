<template>
	<div class="container">
			<image class='prodimg' mode='aspectFit' :src='cartInfo.imageurl'></image>
		<div class="content">
			<div class="prodtitle">{{cartInfo.title}}</div>
			<div class="prodIinfo">
				<span class="discountprice">￥{{cartInfo.discountprice}}</span>
				<span class="count">×{{cartInfo.count}}</span>
			</div>
		</div>
		<div class="del" @click='delCart(cartInfo.id)'>
			<image class='icon' mode='aspectFit'  src='/static/util/delete.png'></image>
		</div>
	</div>
</template>

<script>
	export default {
		props:['cartInfo'],
		methods: {
			delCart(id) {
				this.$emit('delCart',id);
			}
		}
	}
</script>

<style scoped>
	.container{
		display: flex;
		margin: 10rpx;
		justify-content: space-around;
		align-items: center;
		border: 2rpx solid #eee;
	}
	.content{
		width: 400rpx;
		height: 200rpx;
		font-size: 16px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.prodtitle{
		margin-top: 20rpx;
	}
	.prodIinfo{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.discountprice{
		font-size: 24px;
		color: #EA5149;
	}
	.prodimg{
		display: flex;
		width: 200rpx;
		height: 200rpx
	}
	.del{
		width: 50rpx;
		height: 200rpx;
		display: flex;
		align-items: center;
	}
	.icon{
		width: 50rpx;
		height: 50rpx;
	}
</style>