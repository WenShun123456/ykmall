<template>
	<div>
		<div class="user">
			<image class="avatar"  mode='aspectFit' :src='userInfo.avatarUrl' ></image>
			<div class="nick">{{userInfo.nickName}}</div>
		</div>
		<div id="persons">
	        <button v-if='!userInfo.openId' type='primary'  open-type="getUserInfo" lang="zh_CN" @getuserinfo="doLogin">点   此   登   录</button>
	    </div>
	    <div class="product">
	    	<ul>
	    		<li @click='goMyOrder(0)'>
	    			<image class='icon' mode='aspectFit' src='/static/me/paying.png' ></image>
					<div class="icon-text">待付款</div>
	    		</li>
	    		<li @click='goMyOrder(1)'>
	    			<image class='icon' mode='aspectFit' src='/static/me/getting.png' ></image>
					<div class="icon-text">待收货</div>
	    		</li>
	    		<li @click='goMyOrder(2)'>
	    			<image class='icon' mode='aspectFit' src='/static/me/complete.png' ></image>
					<div class="icon-text">已完成</div>
	    		</li>
	    		<li @click='goMyOrder(3)'>
	    			<image class='icon' mode='aspectFit' src='/static/me/myorder.png' ></image>
					<div class="icon-text">全部订单</div>
	    		</li>
	    	</ul>
	    </div>
	    <div class="info">
	    	<ul>
	    		<li @click='goMyAddress'>
	    			<image class='info-icon' mode='aspectFit' src='/static/me/address.png' ></image>
	    			<span>地址管理</span>
	    			<span class="go-r">></span>
	    		</li>
	    		<li @click='goMyDiscount'>
	    			<image class='info-icon' mode='aspectFit' src='/static/me/mydiscount.png' ></image>
	    			<span>优惠卡券</span>
	    			<span class="go-r">></span>
	    		</li>
	    		<li @click='goMyMsg'>
	    			<image class='info-icon' mode='aspectFit' src='/static/me/message.png' ></image>
	    			<span>我的消息</span>
	    			<span class="go-r">></span>
	    		</li>
	    		<li @click='goFeedback'>
	    			<image class='info-icon' mode='aspectFit' src='/static/me/feedback.png' ></image>
	    			<span>意见反馈</span>
	    			<span class="go-r">></span>
	    		</li>
	    	</ul>
	    </div>
	</div>
</template>
<script>
	import getUserIn from '@/util/login'
	import store from '@/store/index'
	export default {
		data: {	
			userInfo:{}
		},
		onLoad() {
			this.userInfo = wx.getStorageSync('userInfo') || 
							{avatarUrl: '/static/me/avatar.png', nickName: '未登入'};
		},
		computed:{
		},
		methods: {
		 	doLogin() {
				getUserIn().then((userInfo) => {
					this.userInfo = userInfo;
				})
			},
			goMyOrder(index) {
				wx.navigateTo({
					url: '/pages/myorder/main?select=' + index
				})
			},
			goMyAddress() {
				wx.navigateTo({
					url: '/pages/myaddress/main'
				})
			},
			goMyDiscount() {
				wx.navigateTo({
					url: '/pages/mydiscount/main'
				})
			},
			goMyMsg() {
				wx.navigateTo({
					url: '/pages/mymsg/main'
				})
			},
			goFeedback() {
				wx.navigateTo({
					url: '/pages/feedback/main'
				})
			}

		},
		store
	}
</script>
<style scoped>
	button{margin:50rpx;}
	.user{
		display: flex;
		align-items: center;
	}
	.avatar{
		border-radius: 50%;
		width: 200rpx;
		height: 200rpx;
		margin : 25rpx 0 0 50rpx;	
	}
	.nick{
		margin-left: 25rpx;
		font-size: 28px;
	}
	.product{
		width: 650rpx;
		height: 200rpx;
		border: solid 3rpx #eee;
		box-shadow : 5rpx 5rpx 5rpx #eee;
		border-radius: 10rpx;
		margin-top: 25rpx;
		margin : 25rpx auto;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.product ul {
		display: flex;
		width: 100%;
		justify-content: space-around;
	}
	.icon {
		width: 100rpx;
		height: 100rpx;
	}
	.icon-text {
		font-size: 12px;
		color: #999;
		text-align: center;
	}
	.info {
		padding: 50rpx;
		color: #555;
	}
	.info li{
		height: 100rpx;
		display: flex;
		align-items: center;
		font-size: 16px;
		border-bottom: 1rpx solid #eee;
	}
	.info-icon{
		margin-right: 40rpx;
		width: 60rpx;
		height: 60rpx;
	}
	.go-r{
		margin-left: 400rpx;
		color: #aaa;
	}
</style>
