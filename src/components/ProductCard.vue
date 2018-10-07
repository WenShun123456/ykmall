<template>
	<div class="container" @click='clickItem(product.id)'>
		<image class='img' :src='product.imageurl' mode='aspectFit'></image>
		<div class="productInfo">
			<div class="title">{{product.title}}</div>
			<div class="allprice">
				<span class="discountprice">￥{{product.discountprice}}</span>
				<span class="price">￥{{product.price}}</span>
			</div>
			<div class="btn">立即购买</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['product'],
		methods: {
			clickItem(id) {
				this.$emit('toDetail',id);
			}
		}
	}
</script>


<style scoped>
	.container{
		width: 350rpx;
		height: 550rpx;
		border: 2rpx solid #eee;
		margin: 10rpx;
	}
	.img{
		width: 350rpx;
		height: 300rpx;
	}
	.title{
		height: 50rpx;
		color: #999;
		font-size: 14px;
	}
	.discountprice{
		font-size: 24px;
		color: #EA5149;
	}
	.productInfo{
		height: 250rpx;
		padding: 20rpx;
	}
	.allprice{
		margin: 20rpx 0;
	}
	.price{
		margin-left: 10rpx;
		text-decoration: line-through;
		color: #999;
		font-size: 14px;
	}
	.btn{
		background-color: #EA5149;
		color: #fff;
		line-height: 28px;
		font-size: 16px;
		text-align: center;
		border-radius: 5rpx;
	}
</style>