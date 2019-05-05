<template>
	<div class="header">
		<div class="header-wrapper">
			<div class="avatar">
				<img :src="info.avatar" width="64" height="64" alt=""
				v-preview="info.avatar"
				data-title="head"
				>
				<!-- <vue-preview :slides="slide1" @close="handleClose"></vue-preview> -->
				</div>
			<div class="info">
				<h1 class="title">
					<span class="brand"></span><span class="name">{{info.name}}</span>
				</h1>
				<p class="des"><span class="tel"></span><a :href="'tel:'+info.tel">{{info.tel ? info.tel : $store.state.myinfo.userInfo.telphone}}</a></p>
				<div class="supports" @click="showDetail">
					<span class="more"></span>
					<span class="description">查看更多个人信息</span>
				</div>
			</div>
			<div class="num" v-if="info.supports" @click="showDetail">
				<span class="count">SEE</span><span class="icon-keyboard_arrow_right"></span>
			</div>
		</div>
		<div class="bulletin-wrapper" @click="showDetail">
			<span class="icon"></span><span class="des">{{info.bulletin}}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
		<div class="background-header"><img :src="info.backgroundImg" alt=""></div>
		<transition name="fade">
			<div class="detail stick-footer" v-show="detail">
				<div class="stick-wrapper">
					<div class="stick-main">
						<h1 class="name">{{info.name}}</h1>
						<div class="star-wrapper">
							<!-- <header-star :score="info.score" :size='48'></header-star> -->
							<header-star :score="GetMyStar" :size='48'></header-star>
							<span class="score">评分:{{GetMyStar}}</span>
						</div>
						<div class="addstar">您的评分(0.1~5):
							<input type="number" class="starscore" :placeholder="GetMyStar" ref='mystar' v-on:keyup.13="subMyStar">
							<span @click="subMyStar" class="btn">确定</span>
						</div>
						<div class="line">
							<div class="line-item"></div>
							<div class="text">个人信息</div>
							<div class="line-item"></div>
						</div>
						<ul class="supports">
							<li v-for="(support,index) in info.supports" class="support-item" :key="index">
								<icon-supports class="icon"
								:className="classMap[support.type]"></icon-supports><span class="des">{{support.description}}</span>
							</li>
						</ul>
						<div class="line">
							<div class="line-item"></div>
							<div class="text">自我评价</div>
							<div class="line-item"></div>
						</div>
						<p class="bulletin">{{info.bulletin}}</p>
					</div>
				</div>
				<div class="stick-close" @click="hideDetail"><span class="icon-close"></span></div>
			</div>
		</transition>
	</div>
</template>

<script>
	import {mapState, mapGetters, mapActions} from 'vuex'
	import IconSupports from '@/components/IconSupports/IconSupports.vue'
	import HeaderStar from '@/components/HeaderStar/HeaderStar.vue'
	export default{
		components: {
			IconSupports: IconSupports,
			HeaderStar: HeaderStar
		},
		props: {
			info: {
				type: Object
			}
		},
		data() {
			return {
				detail: false
			}
		},
		computed: { // 这里的...是超引用，ES6的语法，意思是state里有多少属性值我可以在这里放多少属性值
			...mapState({ // 1.通过 this.$store.state 直接获取参数 2.通过getters获取参数
				// GetMyStar() {
				// 	return this.$store.state.myinfo.mystar // 获取得分
				// }
				// GetMyStar: state => state.myinfo.mystar
			}),
			...mapGetters('myinfo', { // 通过 getters 获取参数。映射
				GetMyStar: 'myStar' // 对应myinfo.js geeters 里面的mystar 方法
			})
		},
		watch: {
			info2() {
				console.log(this.info2.data)
			}
		},
		created() {
			// this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
			this.classMap = ['birthage', 'sex', 'school', 'nation', 'education']
		},
		methods: {
			// actions中的方法映射到methods
			...mapActions('myinfo', [ // myinfo 是指modules文件夹下的myinfo.js
				'addmystar'// myinfo.js文件中的actions里的方法，在上面的@click中执行并传入实参
			]),
			subMyStar() {
				const substar = Number(this.$refs.mystar.value)
				if (substar && typeof substar === 'number') {
					let num = Number(substar.toFixed(1)) // 小数点后保留1位
					if (substar > 5) {
						this.$_message.warning('评分为0.1~5之间')
						// this.$_showBackMsg('评分为0.1~5之间')
						return false
					}
					this.addmystar(num)
				} else {
					this.$_message.info('请输入您的评分')
					// this.$_showBackMsg('请输入您的评分')
				}
			},
			showDetail() {
				this.detail = true
			},
			hideDetail() {
				this.detail = false
			},
			handleClose() {
				console.log('close event')
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.header{
		position: relative;background: rgba(7,17,27,0.5);
		.header-wrapper{
			position: relative;padding:24px 12px 18px 24px;color:#fff;font-size: 0;
			.avatar{
				display: inline-block;vertical-align: top;width:64px;height:64px;border-radius: 4px;overflow: hidden;
			}
			.info{
				display: inline-block;margin-left: 16px;font-size: 12px;
				.title{
					margin:2px 0 8px 0;
					.brand{
						display: inline-block;vertical-align: top;width:40px;height:18px;.bg-image('../../common/images/name');background-size: 40px 18px;background-repeat: no-repeat;
					}
					.name{
						vertical-align: top;margin-left: 6px;font-size: 16px;font-weight: 700;line-height: 18px;
					}
				}
				.des{
					margin-bottom: 10px;font-size: 12px;line-height: 12px;
					a{color:#fff;font-size: 12px;line-height: 12px;}
					.tel{display: inline-block;margin-right:6px;vertical-align: top;width:25px;height:12px;.bg-image('../../common/images/tel');background-size: 25px 12px;background-repeat: no-repeat;}
				}
				.supports{
					margin-bottom: 2px;font-size:0;
					.icon{display: inline-block;width:12px;height:12px;vertical-align: top;margin-right: 4px;}
					.more{display: inline-block;margin-right:6px;vertical-align: top;width:25px;height:12px;.bg-image('../../common/images/topmore');background-size: 25px 12px;background-repeat: no-repeat;}
					.description{vertical-align: top;font-size: 10px;line-height: 12px;}
				}
			}
			.num{
				position: absolute;right:12px;bottom:18px;padding:0 8px;height:24px;line-height: 24px;font-size: 10px;background:rgba(0,0,0,0.2);border-radius: 14px;
				.count{
					line-height: 24px;
					&::after{content: '';width:100%;height:50%;margin-bottom:-2px;}
				}
				.icon-keyboard_arrow_right{font-size: 10px;color:#fff;margin-left: 2px;}
			}
		}
		.bulletin-wrapper{
			position: relative;padding:0 22px 0 12px;height: 28px;color:#fff;background:rgba(7,17,27,0.2);overflow:hidden; white-space: nowrap; text-overflow: ellipsis;
			.icon{display: inline-block;vertical-align: top;margin-top:7px;width:22px;height:12px;.bg-image('../../common/images/bulletin');background-size: 22px 12px;background-repeat: no-repeat;}
			.des{margin:0 4px;font-size: 10px;line-height: 28px; }
			.icon-keyboard_arrow_right{position: absolute;right:12px;top:9px;font-size: 10px;}
		}
		.background-header{
			position: absolute;top:0;left:0;width:100%;height:100%;z-index: -1;filter: blur(10px);
			img{width:100%;height:100%;}
		}
		.stick-footer{
			position: fixed;left:0;top:0;width:100%;height:100%;z-index: 999;background-color: rgba(7,17,27,0.8);overflow: scroll;color:#fff;
			&.fade-enter-active,&.fade-leave-active{
				transition:all 0.4s linear;
			}
			&.fade-enter,&.fade-leave-to{
				opacity: 0;
			}
			.stick-wrapper{
				min-height: 100%;
				.stick-main{
					padding: 64px 0;width:80%;margin:0 auto;
					.name{margin-bottom:16px;font-size: 20px;line-height: 20px;font-weight: 700;color:#fff;text-align: center;}
					.star-wrapper{
						position: relative;margin-bottom:16px;text-align: center;
						.score{
							position: absolute;right:0;top:0;line-height: 22px;font-size: 12px;
						}
					}
					.addstar{
						text-align: center; line-height: 18px; font-size: 12px;
						.starscore{
							margin-left:8px;width:60px;border-radius:2px; text-indent: 10px;line-height: 18px;vertical-align: top;
						}
						.btn{display: inline-block;margin-left: 6px;background: rgba(255,255,255,0.3);line-height: 18px;padding:0 6px;border-radius: 2px;font-size: 14px;}
					}
					.line{
						display: flex;margin: 28px 0 24px 0;
						.line-item{
							flex:1;position: relative;top:6px;border-top:1px solid rgba(255,255,255,0.2);width:100%;
						}
						.text{
							padding:0 12px;font-size: 16px;line-height: 14px;font-weight: 700;
						}
					}
					.supports{
						padding:0 12px;
						.support-item{
							margin-bottom:12px;width:50%; display: inline-block;
							&:last-child{margin-bottom:0;}
							.icon{display: inline-block;margin-right:6px;width:48px;height:16px;vertical-align: top;}
							.des{display: inline-block;vertical-align: top;font-size: 16px;line-height: 16px;}
						}
					}
					.bulletin{
						padding:0 12px;font-size: 14px;line-height: 24px;
					}
				}
			}
			.stick-close{
				position: relative;margin: -64px auto 0;text-align: center;
				span{display: inline-block;font-size:32px;width:32px;height:32px;color:rgba(255,255,255,0.5);}
			}
		}
	}
</style>
