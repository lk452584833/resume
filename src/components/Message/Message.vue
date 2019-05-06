<template>
	<transition name="messagefade">
		<div class="message" :class="type" v-show="show">
			<i class="icon"></i>
			<span class="text">{{text}}</span>
		</div>
	</transition>
</template>

<script>
	// Vue.extend()来做一个全局提示组件
	// 封装一个包含操作dom的的全局组件的
	export default{
		name: 'message',
		props: {
			type: {
				type: String,
				default: 'info',
				validator: function(val) {
					return ['info', 'success', 'warning', 'error'].includes(val) // arr.includes() es6 判断是否包含某个元素，只返回ture,false
				}
			},
			show: {
				type: Boolean,
				default: false
			},
			text: {
				type: String,
				default: ''
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.message{
		&.messagefade-enter-active,&.messagefade-leave-active{
			transition:all 0.3s linear;
		}
		&.messagefade-enter,&.messagefade-leave-to{
			opacity: 0;
		}
		position:fixed;top: 45%;left: 50%;transform: translate(-50%,-50%);z-index: 1000;max-width: 400px;
		padding:6px 12px;color:#333;background: #f5f5f5;font-size: 14px;line-height: 2;
		text-align: center;border-radius: 6px;box-shadow: 0 0 10px rgba(0, 0, 0, .3);
		&.info{
			color:#3a87ad;
		}
		&.success{
			color:#468847;
		}
		&.error{
			color:#b94a48;
		}
		&.warning{
			color:#faa732;
		}
	}
</style>
