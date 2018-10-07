<template>
	<div>
		<Toast ref='toast'></Toast>
		<form>
			<ul>
				<li class="f-li">
					<span>收件人:</span>
					<input v-model='submitInfo.receicer' placeholder="姓名">
				</li>
				<li class="f-li">
					<span>手机号:</span>
					<input v-model='submitInfo.phonenumber' type="tel" name="phonenumber" placeholder="手机号码">
				</li>
				<li class="f-li">
					<span>省市区:</span>
					<picker mode='region' @change='selectAdd'>
						<div :class='{picked : !picked}'>
							{{addressrough[0]}}  {{addressrough[1] }}  {{addressrough[2]}}
						</div>
					</picker>
				</li>
				<li class="f-li">
					<span>详细址:</span>
					<input name="addressdetail" v-model="submitInfo.addressdetail" placeholder="详细街道地址">
				</li>
			</ul>
		</form>
		<div class="submitbtn" @click='submitAdd'>
			确定
		</div>
	</div>
</template>
<script>
	import Toast from '@/components/Toast'
	import store from '@/store/index'
	import http from '@/util/http'
	export default {
		data: {
			addressrough: ['请选择'],
			submitInfo: {
				receicer: '',
				phonenumber: '',
				addressrough: '',
				addressdetail:'',
				isdefault: false,
				openId: ''
			},
			picked: false 
		},
		methods: {
			selectAdd(e) {
				this.addressrough = e.mp.detail.value;
				this.submitInfo.addressrough = e.mp.detail.value.join(' ');
				this.picked = true;
			},
			submitAdd() {
				this.submitInfo.openId = wx.getStorageSync('userInfo').openId || '';
				if(!this.submitInfo.openId){
					this.$refs.toast.show('未登入');
					return
				}
				if(this.submitInfo.receicer && this.submitInfo.phonenumber && this.submitInfo.addressrough&& this.submitInfo.addressdetail){
					http.post('/addAddress',this.submitInfo).then((res)=>{
						if(res.code == 0){
							this.submitInfo = {
								receicer: '',
								phonenumber: '',
								addressrough: '',
								addressdetail:'',
								isdefault: false,
								openId: ''
							};
							this.addressrough = ['请选择'];
							this.picked = false;
							this.$refs.toast.show('添加成功');
						} 
					})		
				}else{
					this.$refs.toast.show('信息不全');
				}
			}
		},
		components: {
			Toast
		},
		store
	}
</script>
<style scoped>
	form{
		font-size: 16px;
	}
	input {
		display: inline-block;
	}
	.f-li{
		height: 80rpx;
		border-bottom: 1rpx solid #eee;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	picker div{
		width: 360rpx;
	}
	.picked{
		color: #777;
	}
	.submitbtn{
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