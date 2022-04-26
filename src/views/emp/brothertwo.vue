<template>
	<div>兄弟组件二=>{{msg}}</div>
</template>

<script>
import bus from '../../utils/eventBus'
export default {
	name: 'BrotherTwo',
	components: {},
	props: {},
	data() {
		return {
      msg:''
    }
	},
	computed: {},
	watch: {},
	created() {},
	mounted() {
    bus.$on('sendBus',(data)=>{
      console.log(data);
      this.msg=data
    })
  },
	methods: {}
}
</script>

<style lang="less" scoped></style>
