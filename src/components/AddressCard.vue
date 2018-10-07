<template>
	<div class="container" :class='{default:address.isdefault}'>
		<div class="top">
			<div>收件人: {{address.receicer}}</div>
			<image class='icon' mode='aspectFit' src='/static/util/delete.png' @click='delAddress(address.id)'></image>
		</div>
		<div>手机号: {{address.phonenumber}}</div>
		<div>地址: {{address.addressrough}}</div>
		<div class="bottom">
			<div>详细地址: {{address.addressdetail}}</div>
			<div v-if='!address.isdefault' @click='setDefault(address.id)'>设为默认</div>
			<div v-if='address.isdefault'>默认地址</div>
		</div>
	</div>
</template>

<script>
	import http from '@/util/http'
	export default {
		props:['address'],
		methods: {
			delAddress(id) {
				this.$emit('delAddress',id);
			},
			setDefault(id) {
				this.$emit('setDefault',id);
			}
		}
	}
</script>

<style scoped>
	.container{
		margin: 10rpx;
		padding: 10rpx;
		font-size: 16px;
		border: solid 3rpx #eee;
		box-shadow : 5rpx 5rpx 5rpx #eee;
		border-radius: 10rpx;
		line-height: 24px;
	}
	.default{
		border: solid 3rpx #EA5149;
		box-shadow : 5rpx 5rpx 5rpx #EA5149;
	}
	.top{
		display: flex;
		justify-content: space-between;
	}
	.bottom{
		display: flex;
		justify-content: space-between;
	}
	.icon{
		height: 40rpx;
		width: 50rpx;
	}
</style>