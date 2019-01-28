<template>
	<div class="container">
		<Toast ref='toast'></Toast>
		<image class='detail-img' mode='scaleToFill' :src='productInfo.imageurl'></image>
		<div class="content">
			<div class="title">{{productInfo.title}}</div>
			<div class="desc">{{productInfo.desc}}</div>
			<div class="allprice">
				<span class="discountprice">￥{{productInfo.discountprice}}</span>
				<span class="price">￥{{productInfo.price}}</span>
			</div>
			<ul>
				<li class="item">
					<div class="item-title">满减</div>
					<div class="item-desc">
						<span class="dis">{{productInfo.discount}}</span>
					</div>
				</li>
				<li class="item">
					<div class="item-title">服务</div>
					<div class="item-desc">1H无理由退款  七天无理由退货</div>
				</li>
				<li class="item">
					<div class="item-title">品牌</div>
					<div class="item-desc">{{productInfo.brand}}</div>
				</li>
				<li class="item">
					<div class="item-title">物流公司</div>
					<div class="item-desc">{{productInfo.express}}</div>
				</li>
				<li class="item">
					<div class="item-title">预计到货时长</div>
					<div class="item-desc">{{productInfo.pushtime}} 天</div>
				</li>
				<li class="item">
					<div class="item-title">净含量</div>
					<div class="item-desc">{{productInfo.netcontent}}</div>
				</li>
				<li class="item">
					<div class="item-title">购买数量</div>
					<div class="item-desc">
						<Counter :count='count' @change='getCount'></Counter>
					</div>
				</li>
			</ul>
			<div class="empty"></div>
		</div>
		<div class="bottom">
			<ul class="icon">
				<li @click='goMall'>
					<image mode='aspectFit' src='/static/tabBar/home.png'>
					</image>
					<div class="icon-text">商城</div>
				</li>
				<li>
					<image mode='aspectFit' src='/static/tabBar/kefu.png'>		
					</image>
					<div class="icon-text">客服</div>
				</li>
				<li @click='goCart'>
					<image mode='aspectFit' src='/static/tabBar/cart.png'></image>
					<div class="icon-text">购物车</div>
				</li>
			</ul>
			<div class="addcart" @click='addCart'>
				加入购物车
			</div>
		</div>
	</div>
</template>
<script>
	import http from '@/util/http'
	import Counter from '@/components/Counter'
	import Toast from '@/components/Toast'
	export default {
		data: {
			productInfo:'',
			count:1
		},
		onLoad(op) {
			this.getProductInfo(op.id);
		},
		methods: {
			getProductInfo(id) {
				http.get('/getProductInfo',{id}).then(res => {
					if(res.code == 0){
						this.productInfo = res.data.productInfo[0];
					}
				})
			},
			getCount(count){
				this.count = count;
			},
			goMall() {
				wx.switchTab({url: '/pages/mall/main'});
			},
			goCart() {
				wx.switchTab({url: '/pages/cart/main'});
			},
			addCart() {
				if(!wx.getStorageSync('userInfo').openId){
					this.$refs.toast.show('请先登入');
				}else{
					http.post('/addCart',{productId:this.productInfo.id,openId:wx.getStorageSync('userInfo').openId,count:this.count}).then(res => {
						if(res.code == 0) {
							 this.$refs.toast.show('成功加入购物车');	
						}
					})
				}
			}
		},
		components: {
			Counter,
			Toast
		}

	}
</script>
<style>
	.container{
		color: #999;
		font-size: 14px;
	}
	.detail-img{
		width: 750rpx;
	}
	.content{
		padding: 20rpx;
	}
	.title{
		font-size: 18px;
		font-weight: bold;
		color: #000;
	}
	.desc{
		font-size: 14px;
		margin: 10rpx 0;
	}
 	.discountprice{
		font-size: 24px;
		color: #EA5149;
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
	.item{
		height: 80rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 2rpx solid #eee;
	}
	.dis{
		padding: 10rpx;
		background-color: #EA5149;
		color: #fff;
	}
	.empty{
		height: 100rpx;
		width: 750rpx;
	}                                                                  
	.bottom{
		background-color: #fff;
		position: fixed;
		bottom: 0;
		height: 100rpx;
		width: 750rpx;
		display: flex;
		align-items: center;
		border-top: 2rpx solid #999;
	}
	.icon{
		width: 450rpx;
		display: flex;
		justify-content: space-around;
	}
	.icon image{
		width: 60rpx;
		height: 40rpx;
	}
	.icon-text{
		font-size: 12px;
		text-align: center;
	}
	.addcart{
		width: 300rpx;
		height: 100rpx;
		line-height: 100rpx;
		color: #fff;
		font-size: 18px;
		background-color: #EA5149;
		text-align: center;
	}
</style>