<template>
	<div>
		<ul class="title-bar">
			<li class="title" v-for='(item,index) in title' :class="{action: actionIndex==index}" @click="toggleTag(index)" :key='index'>{{item}}</li>
		</ul>
	</div>
</template>
<script>
	export default {
		props: ['title', 'actionIndex'],
		methods: {
			toggleTag(index) {
				this.actionIndex = index;
				this.$emit('titleTap',index);
			}
		}
	}
</script>
<style scoped>
	.action{
		color: #EA5149;
		border-bottom: 4rpx solid #EA5149;
	}
	.title-bar{
		display: flex;
		justify-content: space-around;
		color: #999;
	}
	.title{
		display: flex;
		height: 60rpx;
		align-items: center;
		font-size: 14px;
	}
</style>