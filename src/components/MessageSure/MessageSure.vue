<template>
	<transition name="fade">
		<div class="message-sure" v-show="show" @click.stop="cancel">
			<div class="message-sure-wrapper">
				<div class="title" v-if="titleText">
					<span class="text">{{titleText}}</span>
				</div>
				<div class="content">
					<span class="text">{{text}}</span>
				</div>
				<div class="operation">
					<span class="cancel" @click.stop="cancel">{{cancelText}}</span>
					<span class="sure" @click.stop="sureDone">{{sureText}}</span>
				</div>
			</div>
			<div class="background"></div>
		</div>
	</transition>
</template>

<script>
	export default{
		props: {
			text: {
				type: String,
				default: ''
			},
			show: {
				type: Boolean,
				default: true
			},
			titleText: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				cancelText: '取消',
				sureText: '确认'
			}
		},
		methods: {
			cancel() {
				this.$emit('msgcancel')
			},
			sureDone() {
				this.$emit('msgsure')
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.message-sure{
		&.fade-enter-active,&.fade-leave-active{
			transition:all 0.5s;pointer-events: none;
		}
		&.fade-enter,&.fade-leave-to{
			opacity: 0;
		}
		.message-sure-wrapper{
			position: fixed;
			left:50%;top:40%;
			transform: translate(-50%,-50%);
			z-index:9999;
			padding:6px 12px;
			max-width: 400px;
			border-radius: 6px;
			box-shadow: 0 0 10px rgba(0, 0, 0, .3);
			background: #f5f5f5;
			text-align: center;
			.title{
				width:100%;padding-bottom:6px;
				.text{font-size: 14px;line-height: 16px;color:#333;}
			}
			.content{
				.border-1px(rgba(7, 17, 27, 0.1));width:100%;padding-bottom:6px;
				.text{
					font-size: 13px;line-height: 24px;color:#3a87ad;
				}
			}
			.operation{
				font-size: 0;
				span{display: inline-block;width:50%;font-size: 12px;line-height: 20px;min-width: 50px;}
				.sure{color:#468847;}
				.cancel{color:rgba(0,0,0,0.5);}
			}
		}
		.background{
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 9998;
			backdrop-filter: blur(10px);
			background: rgba(7, 17, 27, 0.6);
		}
	}
</style>
