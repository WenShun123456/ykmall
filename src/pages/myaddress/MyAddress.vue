<template>
	<div>
		<div v-for='(item, index) in addressList' :key='index'>
			<AddressCard :address='item' @delAddress='delAddress' @setDefault='setDefault'></AddressCard>
		</div>
		<div class="addadd" @click='addAddress'>
			添加新地址
		</div>
		<Empty msg='暂无地址' v-if='!addressList.length'></Empty>
	</div>
</template>
<script>
	import Empty from '@/components/Empty'
	import AddressCard from '@/components/AddressCard'
	import http from '@/util/http'
	export default {
		data: {
			addressList: []
		},
		mounted() {
			this.getAddressList();
		},
		onShow() {
			this.getAddressList();
		},
		methods: {
			addAddress() {
				wx.navigateTo({
					url: '/pages/addaddress/main'
				})
			},
			getAddressList() {
				http.get('/getAddressList',{openId:wx.getStorageSync('userInfo').openId}).then((res) => {
					if(res.code == 0){
						this.addressList = res.data.addressList;
					}
				});
			},
			delAddress(id){
				let that = this;
				wx.showModal({title:'提示',content:'是否要删除此地址？',
					success:function (res) {
						if(res.confirm){
							http.post('/delAddress',{id}).then((res) => {
								if(res.code == 0){
									that.getAddressList();
								}
							})
						}else{
							return
						}
					}
				})
			},
			setDefault(id) {
				http.post('/setDefault',{id ,openId:wx.getStorageSync('userInfo').openId}).then(res => {
					if(res.code == 0){
						this.getAddressList();
					}
				})
			}
		},
		components: {
			Empty,
			AddressCard
		}
	}
</script>
<style scoped>
	.addadd{
		line-height: 80rpx;
		position: fixed;
		text-align: center;
		font-size: 16px;
		bottom: 0;
		width: 100%;
		height: 80rpx;
		background: #EA5149;
		color: #fff;
	}
</style>