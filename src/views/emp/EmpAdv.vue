<template>
	<div style="margin-top:100px">
		父组件=>子组件传过来的值:{{sonmsg}}
		<Son :famsg="famsg" @getsonmsg="getsonmsg" style="margin-bottom:50px"/>
		<BrotherOne/>
		<BrotherTwo/>
	</div>
</template>

<script>
import Son from './son.vue'
import BrotherOne from './brotherone.vue'
import BrotherTwo from './brothertwo.vue'
export default {
	name: '',
	components: {Son,BrotherOne,BrotherTwo},
	props: {},
	data() {
		return {
			sonmsg:'',
			famsg: '我是父组件的内容'
		}
	},
	computed: {},
	watch: {},
	created() {},
	mounted() {},
	methods: {
		getsonmsg(msg){
			this.sonmsg=msg
		}
	}
}
</script>

<style lang="less" scoped></style>
