<template>
	<div>
		<Toast ref='toast'></Toast>
		<ToggleTag :title='title' :actionIndex='actionIndex' @titleTap='toggleTag'></ToggleTag>
		<div v-show='actionIndex==0' class="content tag-zero">
			<div class="content" v-for='(item,index) in cartList' :key='index'>
				<CartCard :cartInfo='item' @delCart='delCart'></CartCard>
			</div>
			<div class="empty"></div>
			<div class="bottom">
				<div class="total">总价：￥{{totalPrice}}</div>
				<div class="pay">立即支付</div>
			</div>
			<Empty msg='暂无订单' v-if='!cartList.length'></Empty>
		</div>
		<div v-show='actionIndex==1' class="content tag-one">
			<Empty msg='暂无订单' v-if='!getList.length'></Empty>
		</div>
		<div v-show='actionIndex==2' class="content tag-tow">
			<Empty msg='暂无订单' v-if='!completeList.length'></Empty>
		</div>
		<div v-show='actionIndex==3' class="content tag-three">
			<Empty msg='暂无订单' v-if='!allList.length'></Empty>
		</div>
	</div>
</template>
<script>
	import ToggleTag from '@/components/ToggleTag'
	import Toast from '@/components/Toast'
	import Empty from '@/components/Empty'
	import http from '@/util/http'
	import CartCard from '@/components/CartCard'
	export default {
		onLoad(option) {
			this.actionIndex = option.select;
			this.getCartList();
		},
		onShow() {
			this.getCartList();
		},
		data: {
			title: ['待付款','待收货','已完成','全部订单'],
			actionIndex: '',
			cartList:[],
			getList:[],
			completeList:[],
			allList:[]
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
		methods: {
			toggleTag(index) {
				this.actionIndex = index;
			},
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
			}
		},
		components: {
			ToggleTag,
			Empty,
			CartCard,
			Toast
		}
	}
</script>
<style scoped>
	.content{
		height: 100%;
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