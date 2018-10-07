<template>
	<div>
		<ToggleTag :title='title' :actionIndex='actionIndex' @titleTap='toggleTag'></ToggleTag>
		<div v-show='actionIndex==0'>	
			<Empty msg='暂无卡券' v-if='!discountList.length'></Empty>	
		</div>
		<div v-show='actionIndex==1'>
			<Empty msg='暂无卡券' v-if='!overdueList.length'></Empty>		
		</div>
		<div v-show='actionIndex==2'>
			<Empty msg='暂无卡券' v-if='!usedList.length'></Empty>		
		</div>
	</div>
</template>
<script>
	import ToggleTag from '@/components/ToggleTag' 
	import Empty from '@/components/Empty' 
	export default {
		data: {
			title: ['未使用','已过期','已使用'],
			actionIndex: 0,
			discountList : [],
			overdueList: [],
			usedList: []
		},
		methods: {
			toggleTag(index) {
				this.actionIndex = index;
			}
		},
		components: {
			ToggleTag,
			Empty
		}
	}
</script>