<template>
	<div class="container">
		<Toast ref='toast'></Toast>
		<div class="content" v-for='(item,index) in cartList' :key='index'>
			<CartCard :cartInfo='item' @delCart='delCart'></CartCard>
		</div>
		<div class="empty"></div>
		<div class="bottom">
			<div class="total">总价：￥{{totalPrice}}</div>
			<div class="pay">立即支付</div>
		</div>
		<Empty v-if='cartList.length == 0' msg='暂无商品'></Empty>
		<div @click='goMall' v-if='cartList.length == 0' class="go-mall">逛一逛</div>
	</div>
</template>
<script>
	import CartCard from '@/components/CartCard'
	import Toast from '@/components/Toast'
	import Empty from '@/components/Empty'	
	import http from '@/util/http'
	export default {
		data: {
			cartList:[]
		},
		mounted() {
			this.getCartList();
		},
		computed: {
			totalPrice() {
				let total = 0
				this.cartList.forEach(v => {
					total += ~~v.discountprice * ~~v.count
				});
				return total;
			}
		},
		onShow() {
			this.getCartList();
		},
		methods: {
			getCartList() {
				if(!wx.getStorageSync('userInfo').openId){
					this.$refs.toast.show('未登入')
				}else{
					http.get('/getCartList',{openId:wx.getStorageSync('userInfo').openId}).then(res => {
						if(res.code == 0){
							this.cartList = res.data.cartList;
						}
					})
				}
			},
			delCart(id) {
				let that = this;
				wx.showModal({title:'提示',content:'是否要删除此商品？',
					success:function (res) {
						if(res.confirm){
							http.post('/delCart',{id}).then((res) => {
								if(res.code == 0){
									that.getCartList();
								}
							})
						}else{
							return
						}
					}
				})
			},
			goMall() {
				wx.switchTab({url: '/pages/mall/main'});
			}
		},
		components: {
			CartCard,
			Toast,
			Empty
		}
	}
</script>
<style scoped>
	.go-mall{
		margin: 80rpx auto;
		background-color: #999;
		width: 400rpx;
		padding: 20rpx;
		text-align: center;
		border: 2rpx solid #eee;
		border-radius: 10rpx;
	}
	.empty{
		height: 100rpx;
		width: 750rpx;
	}
	.bottom{
		display: flex;
		height: 100rpx;
		justify-content: space-between;
		align-items: center;
		font-size: 18px;
		position: fixed;
		background-color: #fff;
		bottom: 0;
		border-top: 2rpx solid #999;
	}
	.total{
		width: 450rpx;
		font-size: 20px;
		text-align: center;
		color: #EA5149;
		font-weight: bold;
	}
	.pay{
		background-color: #EA5149;
		color: #fff;
		font-size:24px;
		width: 300rpx;
		height: 100rpx;
		display: flex;
		justify-content:center;
		align-items: center;
	}
</style>