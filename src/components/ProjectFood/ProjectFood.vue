<template>
	<transition name="move">
		<div v-show='showFlag' class="food" ref='betterscoll'>
			<div class="food-content">
				<div class="img-top">
					<img :src="food.icon" alt="">
					<div class="back" @click="hide"><i class="icon-arrow_lift"></i></div>
				</div>
				<app-split></app-split>
				<div class="content">
					<h1 class="title">{{food.name}}</h1>
					<div class="address">
						<span class="now" v-show="food.address"><a :href="food.address">{{food.address}}</a></span>
					</div>
					<div class="cartcontral-wrapper">
						<project-add :food="food"></project-add>
					</div>
					<transition name="fade">
						<div class="buy" @click.stop.prevent="addFirst" v-show="!food.count || food.count === 0">加入关注项目</div>
					</transition>
				</div>
				<app-split v-show="food.info"></app-split>
				<div class="info" v-show="food.info">
					<h1 class="title">项目介绍</h1>
					<p class="text">{{food.info}}</p>
				</div>
				<app-split v-show="food.duty"></app-split>
				<div class="info" v-show="food.duty">
					<h1 class="title">项目职责</h1>
					<p class="text">{{food.duty}}</p>
				</div>
				<app-split v-show="food.apply"></app-split>
				<div class="info" v-show="food.apply">
					<h1 class="title">项目运用</h1>
					<p class="text">{{food.apply}}</p>
				</div>
				<app-split></app-split>
				<div class="info">
					<h1 class="title">项目时间</h1>
					<span class="time">{{food.starTime | formatDate}}</span>~<span class="time">{{food.endTime | formatDate}}</span>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import Vue from 'vue'
	import BScroll from 'better-scroll'
	import ProjectAdd from '../../components/ProjectAdd/ProjectAdd'
	import AppSplit from '../../components/AppSplit/AppSplit'
	import formatDate from '../../common/js/date.js'
	// 选择类型 所有2，正面0，负面1 更具数据中rateType
// 	const POSITIVE = 0
// 	const NEGATIVE = 1
	const ALL = 2
	export default{
		components: {
			ProjectAdd: ProjectAdd,
			AppSplit: AppSplit
		},
		filters: {
			formatDate(time) {
				let date = new Date(time)
				return formatDate(date, 'yyyy-MM')
			}
		},
		props: {
			food: {
				type: Object
			}
		},
		data() {
			return {
				showFlag: false,
				selectType: ALL,
				onlyContent: false,
				desc: {
					all: '全部',
					positive: '推荐',
					negative: '吐槽'
				}
			}
		},
		methods: {
			show() {
				this.showFlag = true
				this.selectType = ALL
				this.onlyContent = false
				this.$nextTick(() => {
					if (!this.onescroll) {
						this.onescroll = new BScroll(this.$refs.betterscoll, {
							click: true,
							bounceTime: 100
						})
					} else {
						this.onescroll.refresh()
					}
				})
			},
			hide() {
				this.showFlag = false
			},
			addFirst() {
				this.$emit('cartadd', event.target)
				Vue.set(this.food, 'count', 1)
			},
			needShow(type, text) {
				if (this.onlyContent && !text) {
					return false
				}
				if (this.selectType === ALL) {
					return true
				} else {
					return type === this.selectType
				}
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	// @import "../../common/css/index.less";
	.food{
		position: fixed;left:0;top:0;z-index: 30;width:100%;bottom:48px;background-color: #fff;transform: translate(0,0);
		&.move-enter-active,&.move-leave-active{
			transition:all 0.2s linear;transform: translate(0,0);
		}
		&.move-enter,&.move-leave-to{
			transform: translate(100%,0);
		}
		.img-top{
			background: rgba(0,0,0,0);text-align: center;padding: 20px 0;
			img{width:40%;height:auto;}
			.back{
				position: absolute;top:10px;left:0;
				i{display: block;padding:10px;font-size: 20px;color:#000;}
			}
		}
		.content{
			padding:20px 18px;position: relative;
			.title{
				line-height: 14px;margin-bottom: 12px;font-size: 14px;font-weight: 700;color:rgb(7,17,27);
			}
			.detail{
				margin-bottom: 18px;line-height: 10px;font-size: 0;
				.sell-count,.rating{font-size: 10px;color:rgb(147,153,159);}
				.sell-count{margin-right:12px;}
			}
			.address{
				font-weight: 700;line-height: 20px;
				.now{font-size: 12px;color:rgb(240,20,20);}
			}
			.cartcontral-wrapper{
				position: absolute;right:12px;top:12px;
			}
			.buy{
				position: absolute;right:18px;top:18px;z-index: 10;vertical-align: middle;height:24px;line-height: 24px;padding:0 12px;box-sizing: border-box;font-size: 10px;border-radius: 12px;color:#fff;background-color: rgb(0,160,220);
				&.fade-enter-active,&.fade-leave-active{
					transition: all 0.2s;opacity: 1;
				}
				&.fade-enter,&.fade-leave-to{
					opacity: 0;
				}
			}
		}
		.info{
			padding:18px;
			.title{
				line-height: 14px;margin-bottom: 6px;font-size: 14px;color:rgb(7,17,27);
			}
			.text{
				line-height: 24px;padding:0 8px;font-size: 12px;color:rgba(77,85,93);
			}
			.time{
				line-height: 24px;padding:0 8px;font-size: 12px;color:rgba(77,85,93);
			}
		}
	}
</style>
