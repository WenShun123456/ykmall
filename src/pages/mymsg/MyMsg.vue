<template>
	<div>
		<Empty msg='暂无消息' v-if='!msgList.length'></Empty>
	</div>
</template>
<script>
	import Empty from '@/components/Empty'
	export default {
		data: {
			msgList: []
		},
		components: {
			Empty
		}
	}
</script>