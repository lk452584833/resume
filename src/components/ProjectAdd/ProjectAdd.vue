<template>
	<div class="addproject">
		<div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
		<div class="cart-count " v-show="food.count>0">关注:{{food.count}}</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	export default {
		props: {
			food: {
				type: Object
			}
		},
		methods: {
			addCart() {
				if (!this.food.count) {
					Vue.set(this.food, 'count', 1)
				} else {
					this.food.count++
				}
				// 派发事件，并返回这个派发元素
				this.$root.eventHub.$emit('cart-add', event.target)
			}
		}
	}
</script>

<style lang="less" scoped>
	.addproject{
		width:50px; text-align: center;
		.cart-add{padding: 6px;line-height: 24px;font-size: 24px;color:rgb(0,220,120);}
		.cart-count{line-height:12px;text-align: center;font-size: 10px;color:rgb(147,153,159)}
	}
</style>
