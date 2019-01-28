<template>
	<div>
		<div class="swiper">
			<swiper autoplay="true" >
 				 <block v-for="(item,index) in imgUrl" :key='index'>
    				<swiper-item>
     					 <image class='swiper-img' @click='bannerGo(index)' mode='aspectFill' :src="item"></image>
   					 </swiper-item>
 				 </block>
			</swiper>
		</div>
		<div class="prodList">
			<div v-for='(item,index) in productList' :key='index'>
				<ProductCard  :product='item' @toDetail='toDetail'></ProductCard>
			</div>
		</div>
		<div class="more" v-if='!more'>已加载全部</div>
	</div>
</template>
<script>
	import ProductCard from '@/components/ProductCard'
	import http from '@/util/http'
	export default {
		data: {
			imgUrl:[
				'/static/mall/banner-1.png',	
				'/static/mall/banner-2.png',	
				'/static/mall/banner-3.png',	
				'/static/mall/banner-4.png'	
			],
			productList:[],
			page: 0,
			more: true   
		},
		mounted() {
			this.getProductList();
		},
		onReachBottom() {
			if(!this.more) {
				return
			}
			this.page ++;
			this.getProductList();
		},
		methods: {
			getProductList() {
				http.get('/getProductList',{page:this.page}).then(res => {
					if(res.code == 0){
						if(res.data.productList.length < 4) {
							this.more = false;
						}
						this.productList = this.productList.concat(res.data.productList);
					}
				});
			},
			toDetail(id) {
				wx.navigateTo({url:'/pages/productdetail/main?id=' + id});
			},
			bannerGo(id) {
				wx.navigateTo({url:'/pages/productdetail/main?id=' + id});
			}
		},
		components: {
			ProductCard
		}
	}
</script>
<style scoped>
	.swiper-img{
		width: 750rpx;
	}
	.prodList{
		display: flex;
		flex-wrap: wrap;
	}
	.more{
		text-align: center;
		margin: 10rpx 0;
		font-size: 12px;
		color: #999;
	}
</style>
