<template>
	<div>
		<span :class='{disable:count==1}' @click.stop='minus'>-</span>
		<span>{{count}}</span>
		<span @click.stop='add'>+</span>
	</div>
</template>

<script>
	export default {
		props:['count'],
		mounted() {
			this.count = 1;
			console.log('init')
		},
		methods: {
			add() {
				this.count++;
				this.$emit('change',this.count);
			},
			minus() {
				if(this.count <= 1) {
					return
					this.$emit('change',1);
				}
				this.count--;
				this.$emit('change',this.count);
			}
		}
	}
</script>

<style scoped>
	span{
		display: inline-block;
		width: 80rpx;
		height: 40rpx;
		color: #000;
		text-align: center;
		border: 2rpx solid #aaa;
	}
	.disable{
		background-color: #999;
	}
</style>