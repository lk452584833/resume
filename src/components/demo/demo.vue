<template>
	<div class="msg">
		<span class="name">{{GetName}}</span>
		<span class="height">{{GetHeight}}</span>
		<span @click="add">高度+1</span>
	</div>
</template>

<script>
	import {mapState, mapGetters, mapActions} from 'vuex'
	export default{
		created() {
			console.log(this.$store.state.demo)
		},
		computed: {
			...mapState({
				// GetName: state => state.demo.info.name,
				// GetHeight: state => state.demo.height
			}),
			...mapGetters('demo', {
				GetName: 'myName',
				GetHeight: 'myHeight'
			})
		},
		methods: {
			...mapActions('demo', [
				'addHeight'
			]),
			add() {
				this.addHeight(1)
			}
		}
	}
</script>

<style>
</style>
