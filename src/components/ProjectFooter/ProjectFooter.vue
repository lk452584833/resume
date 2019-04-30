<template>
	<div class="shopcart-warpper">
		<div class="shopcart">
			<div class="content" @click="toggleList">
				<div class="content-left">
					<div class="logo-wrapper">
						<div class="logo" :class="{'hightlight':totalCount>0}">
							<i class="icon-book" :class="{'hightlight':totalCount>0}"></i>
						</div>
						<div class="num" v-show="totalCount>0">{{totalCount}}</div>
					</div>
					<div class="price" :class="{'hightlight':totalPrice>0}">感兴趣{{totalCount}}个项目</div>
				</div>
				<div class="content-right" >
					<div :class="payClass" class="pay">{{payDesc}}</div>
				</div>
			</div>
			<div class="ball-container">
				<transition-group name="drop" tag="div"
				v-on:before-enter="beforeEnter"
				v-on:enter="enter"
				v-on:after-enter="afterEnter"
				>
					<div v-for="(ball,index) in balls" v-show="ball.show" :key="'ball'+index" class="ball">
						<div class="inner inner-hook"></div>
					</div>
				</transition-group>
			</div>
			<transition name="fold">
				<div class="shopcart-list" v-show="listShow">
					<div class="list-header">
						<h1 class="title">感兴趣项目</h1>
						<span class="empty" @click="empty">清空</span>
					</div>
					<div class="list-content" ref="listContent">
						<ul>
							<li @click="showParent(food)" class="food" v-for="(food,index) in filterFood" :key="index">
								<span class="name">{{food.name}}</span>
								<div class="cartcontral-wrapper">
									<project-add-control :food="food"></project-add-control>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</transition>
		</div>
		<transition name="fade">
			<div class="list-mask" @click="hideList" v-show="listShow"></div>
		</transition>
	</div>
</template>

<script>
	import ProjectAddControl from '../../components/ProjectAddControl/ProjectAddControl'
	import BScroll from 'better-scroll'
	export default {
		components: {
			ProjectAddControl: ProjectAddControl
		},
		props: {
			sellectFoods: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		data() {
			return {
				balls: [{show: false}, {show: false}, {show: false}, {show: false}, {show: false}],
				balldrops: [],
				fold: true
			}
		},
		computed: {
			filterFood() { // count最大的排在最前面
				let orderfoods = this.sellectFoods
				let max = {}
				for (let i = 0; i < orderfoods.length; i++) {
					for (let j = i; j < orderfoods.length; j++) {
						if (orderfoods[i].count < orderfoods[j].count) {
							max = orderfoods[j]
							orderfoods[j] = orderfoods[i]
							orderfoods[i] = max
						}
					}
				}
				return orderfoods
			},
			totalCount() {
				let count = 0
				for (let i = 0; i < this.sellectFoods.length; i++) {
					if (this.sellectFoods[i].count) {
						count += 1
					}
				}
				return count
			},
			totalPrice() {
				let price = 0
				for (let i = 0; i < this.sellectFoods.length; i++) {
					if (this.sellectFoods[i].count) {
						price += this.sellectFoods[i].count
					}
				}
				return price
			},
			payClass() {
				if (this.totalPrice === 0) {
					return 'not-enough'
				} else {
					return 'enough'
				}
			},
			payDesc() {
				if (this.totalPrice === 0) {
					return '暂无关注'
				} else if (this.totalPrice) {
					return '关注度:' + this.totalPrice
				}
			},
			listShow() {
				if (!this.totalCount) {
					return
				}
				let show = !this.fold
				return show
			}
		},
		watch: {
			listShow() {
				if (!this.totalCount) {
					this.fold = true
					return
				}
				let show = !this.fold
				if (show) {
					this.$nextTick(() => {
						if (!this.foldscroll) {
							this.foldscroll = new BScroll(this.$refs.listContent, {
								click: true,
								bounceTime: 300
							})
						} else {
							this.foldscroll.refresh()
						}
					})
				}
			}
		},
		methods: {
			showParent(food) {
				this.fold = true
				this.$root.eventHub.$emit('food-show', food) // 派发事件
			},
			toggleList() {
				if (!this.totalCount) {
					return
				}
				this.fold = !this.fold
			},
			empty() {
				if (this.totalCount) {
					this.sellectFoods.forEach((food) => {
						food.count = 0
					})
				}
			},
			hideList() {
				console.log(2)
				this.fold = true
			},
			drop(event) {
				for (let i = 0; i < this.balls.length; i++) {
					let ball = this.balls[i]
					if (!ball.show) {
						ball.show = true
						ball.ele = event
						this.balldrops.push(ball)
						return
					}
				}
			},
			beforeEnter(el) {
				let count = this.balls.length
				while (count--) {
					let ball = this.balls[count]
					if (ball.show) {
						let inner = el.getElementsByClassName('inner-hook')[0]
						let pos = ball.ele.getBoundingClientRect()
						let x = pos.left - 32
						let y = -(window.innerHeight - pos.top - 22)
						el.style.display = ''
						el.style.transform = 'translate3d(0,' + y + 'px,0)'
						inner.style.transform = 'translate3d(' + x + 'px,0,0)'
						el.style.webkitTransform = 'translate3d(0,' + y + 'px,0)'
						inner.style.webkitTransform = 'translate3d(' + x + 'px,0,0)'
					}
				}
			},
			enter(el) {
				this.$nextTick(() => {
					let inner = el.getElementsByClassName('inner-hook')[0]
					el.style.transform = 'translate3d(0,0,0)'
					inner.style.transform = 'translate3d(0,0,0)'
					el.style.webkitTransform = 'translate3d(0,0,0)'
					inner.style.webkitTransform = 'translate3d(0,0,0)'
				})
			},
			afterEnter(el) {
				let ball = this.balldrops.shift()
				if (ball) {
					ball.show = false
					el.style.display = 'none'
				}
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	// @import "../../common/css/index.less";
	.shopcart-warpper{
		.shopcart{
			position: fixed;left:0;bottom:0;width:100%;z-index: 100;height:48px;
			.content{
				display: flex;background:#000;
				.content-left{
					flex:1; display: flex;
					.logo-wrapper{
						flex:0 1 56px;position: relative;top:-10px;margin:0 12px;padding:6px;width:56px;height:56px;box-sizing: border-box;vertical-align: top;border-radius: 50%;background: #141d27; text-align: center;
						.logo{
							width:100%;height:100%;border-radius: 50%;background: #2b343c;
							&.hightlight{background: rgb(0,160,220);}
							.icon-book{
								display: inline-block;margin-top:12px;;width:24px;height:20px; background-image: url('../../common/images/icon/book.png');background-repeat:no-repeat; background-size: 100% 100%;
								&.hightlight{ background-image: url('../../common/images/icon/book-on.png');}
							}
						}
						.num{position: absolute;top:0;right:0;width:24px;height: 16px;line-height: 16px;text-align: center;border-radius: 16px;font-size: 9px;font-weight: 700;color:#fff;background: rgb(240,20,20);box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);}
					}
					.price{
						flex:1;text-align: center;vertical-align: top;margin-top:12px;line-height: 24px;box-sizing: border-box;font-size: 16px;font-weight: 700;color:rgba(255,255,255,0.4);
						&.hightlight{color:#fff;}
					}
					.desc{display: inline-block;vertical-align: top;margin:12px 0 0 12px;line-height: 24px;color:rgba(255,255,255,0.4);font-size: 10px;}
				}
				.content-right{
					flex:0 1 105px;
					.pay{
						height: 48px;line-height: 48px;text-align: center;font-size: 12px;font-weight: 700;color:rgba(255,255,255,0.4);background: #2b333b;
						&.not-enough{background: #2b333b;}
						&.enough{background:rgb(0,160,220);color:#fff;}
					}
				}
			}
			.ball-container{
				.ball{
					position: fixed;left:32px;bottom:22px;z-index: 200;
					&.drop-enter-active,&.drop-leave-active{
						transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
						.inner{
							transition: all 0.4s linear;
						}
					}
					.inner{
						width:16px;height:16px;border-radius: 50%;background: rgb(0, 160, 200)
					}
				}
			}
			.shopcart-list{
				position: absolute;left:0;top:0;z-index: -1;width:100%;transform: translate3d(0, -100%, 0);
				&.fold-enter-active{
					transition: all 0.5s;
				}
				&.fold-leave-active{
					transition: all 0.5s;transform: translate3d(0,0,0);
				}
				&.fold-enter,&fold-leave-to{
					transform: translate3d(0,0,0);
				}
				.list-header{
					height: 40px;line-height: 40px;padding:0 18px;background: #f3f5f7;border-bottom: 2px solid rgba(7,17,27,0.1);
					.title{float:left;font-size: 14px;color:rgb(7,17,27);}
					.empty{float:right;font-size: 12px;color:rgb(0,160,220);}
				}
				.list-content{
					padding:0 18px;max-height: 217px;overflow: hidden;background: #fff;
					.food{
						&.change-enter-active,&.change.leave-active{
							transition: all 1s;
						}
						&.change-enter,&.change-leave-to{
							opacity: 0;
						}
						&.change-move{
							transition: 1s;
						}
						position: relative;padding:12px 0;box-sizing: border-box;.border-1px(rgba(7,17,27,0.1));
						.name{line-height: 24px;font-size: 14px;color:rgb(7,17,27);}
						.price{position: absolute;right:90px;bottom:12px;line-height: 24px;font-size: 14px;font-weight: 700;color:rgb(240,20,20);}
						.cartcontral-wrapper{position: absolute;right:0;bottom: 6px;}
					}
				}
			}
		}
		.list-mask{
			position: fixed;left:0;top:0;width:100%;height:100%;z-index: 40;backdrop-filter:blur(10px);background: rgba(7,17,27,0.6);
			&.fade-enter-active,&.fade-leave-active{
				transition: all 0.5s;opacity: 1;
			}
			&.fade-enter,&.fade-leave{
				opacity: 0;background: rgba(7,17,27,0);
			}
		}
	}
</style>
