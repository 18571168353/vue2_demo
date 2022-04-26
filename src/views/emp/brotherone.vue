<template>
	<div> <button @click="sendtobrothertwo">传递</button> </div>
</template>

<script>
import bus from '../../utils/eventBus'
export default {
	name: 'BrotherOne',
	components: { },
	props: {},
	data() {
		return {
      brotherOneMsg:'兄弟组件一的内容'
    }
	},
	computed: {},
	watch: {},
	created() {
  },
	mounted() {
	},
	methods: {
		sendtobrothertwo() {
			bus.$emit('sendBus',this.brotherOneMsg)
		}
	}
}
</script>

<style lang="less" scoped></style>
