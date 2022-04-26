<template>
	<div>子组件=>父组件传过来的值:{{famsg}}</div>
</template>

<script>
export default {
	name: '',
	components: {},
	props: {
		famsg: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			sonmsg: '我是子组件的内容'
		}
	},
	computed: {},
	watch: {},
	created() {},
	mounted() {
    this.$emit('getsonmsg',this.sonmsg)
  },
	methods: {}
}
</script>

<style lang="less" scoped></style>
