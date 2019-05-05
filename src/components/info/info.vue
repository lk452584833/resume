<template>
	<div class="person" ref="infowrapper">
		<div class="info-content">
			<div class="overview">
				<h1 class="title">{{info.name}}</h1>
				<div class="des">
					<header-star :score="GetMyStar" :size='36'></header-star>
				</div>
				<div class="favorite" @click="toggleFavorite">
					<span class="icon-favorite" :class="{'active':favorite}" ref='iconfavorite'></span>
					<span class="text">{{favoriteText}}</span>
				</div>
			</div>
			<app-split></app-split>
			<div class="bulletin">
				<h1 class="title">个人信息</h1>
				<div class="supports" v-show="info.supports && info.supports.length > 0">
					<ul class="clearfix">
						<li v-for="(support,index) in info.supports" :key="index" class="support-item">
							<icon-supports class="support-icon"
							:className="classMap[support.type]"
							:size="3"></icon-supports>
							<span class="text">{{support.description}}</span>
						</li>
					</ul>
				</div>
			</div>
			<app-split></app-split>
			<div class="infomsg">
				<h1 class="title">技能</h1>
				<div class="info-wapper">
					<ul>
						<li v-for="(info,index) in info.infos" :key="index" class="info-item">{{info}}</li>
					</ul>
				</div>
			</div>
			<app-split v-show="info.pics && info.pics.length > 0"></app-split>
			<div class="info-pics" v-show="info.pics && info.pics.length > 0">
				<h1 class="title">商家实景</h1>
				<div class="pic-wapper" ref="pics">
					<ul class="pic-list" ref="piclist">
						<li class="pic-item" v-for="(pic,index) in info.pics" :key="index">
							<img :src="pic" alt="" width="120" height="90">
						</li>
					</ul>
				</div>
			</div>
			<app-split></app-split>
			<div class="bulletin">
				<h1 class="title">自我评价</h1>
				<div class="content-wrapper">
					<p class="content">{{info.bulletin}}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState, mapGetters} from 'vuex'
	import BScroll from 'better-scroll'
	import {saveToLocal, loadFromLocal} from '@/common/js/store.js'
	import AppSplit from '@/components/AppSplit/AppSplit'
	import IconSupports from '@/components/IconSupports/IconSupports'
	import HeaderStar from '@/components/HeaderStar/HeaderStar.vue'
	export default{
		components: {
			AppSplit: AppSplit,
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
				favorite: (() => {
					return loadFromLocal(this.info.id, 'favorite', false)
				})()
			}
		},
		computed: {
			favoriteText() {
				return this.favorite ? '已支持' : '支持'
			},
			...mapState({ // 这里的...是超引用，ES6的语法，意思是state里有多少属性值我可以在这里放多少属性值
				// GetMyStar: state => state.myinfo.mystar
				// GetMyStar:  ((state) => {
				// 	return state.myinfo.mystar
				// })
			}),
			...mapGetters('myinfo', {
				GetMyStar: 'myStar'
			})
		},
		watch: {
			info() {
				this._initScroll()
				this._setPicHeight()
			}
		},
		created() {
			// this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
			this.classMap = ['birthage', 'sex', 'school', 'nation', 'education']
		},
		mounted() {
			this.$nextTick(function() {
				// 代码保证 this.$el 在 document 中
				this._initScroll()
				this._setPicHeight()
			})
		},
		methods: {
			_setPicHeight() {
				if (this.info.pics) {
					let _w = 120
					let _pr = 6
					let len = this.info.pics.length
					let setW = _w * len + _pr * (len - 1)
					this.$refs.piclist.style.width = setW + 'px'
					this.$nextTick(() => {
						if (!this.picscroll) {
							this.picscroll = new BScroll(this.$refs.pics, {
								scrollX: true
							})
						} else {
							this.picscroll.refresh()
						}
					})
				}
			},
			_initScroll() {
				this.$nextTick(() => {
					if (!this.infoscroll) {
						this.infoscroll = new BScroll(this.$refs.infowrapper, {
							click: true,
							bounceTime: 100
						})
					} else {
						this.infoscroll.refresh()
					}
				})
			},
			toggleFavorite() {
				let self = this
				if (this.favorite) {
					// this.$_messagesure('不支持了!') // 参数为string titleText显示默认
					// this.$_messagesure({text: '不支持了!'}) // 参数为obj 不存在titleText，title显示默认
					// this.$_messagesure({text: '不支持了!',titleText: ''}) // 空表示，不显示title
					this.$_messagesure({text: '不支持了!', titleText: '温馨提示'}, function() { // 回调函数，最后执行
						self.favorite = !self.favorite
						saveToLocal(self.info.id, 'favorite', self.favorite)
					})
				} else {
					this.$_message.success('感谢您的支持')
					this.favorite = !this.favorite
					saveToLocal(this.info.id, 'favorite', this.favorite)
				}
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.person{
		position:absolute;top:174px;left:0;bottom:0;width:100%;overflow:hidden;
		.info-content{
			h1.title{margin-bottom: 16px;line-height: 14px;color:rgb(7,17,27);font-size: 14px;}
			.overview{
				padding: 18px;
				.des{
					padding-bottom: 0px;font-size: 0;
					.star{display: inline-block;margin-right: 8px;vertical-align: top;}
					.tel{font-size: 14px;color:rgb(77,85,93);line-height: 18px;}
				}
				.remark{
					display: flex;padding-top:18px;
					.block{
						flex:1;text-align: center;border-right: 1px solid rgba(7,17,27,0.1);
						&:last-child{border:none;}
						h2{margin-bottom: 4px;line-height: 10px;font-size: 10px;color:rgb(147,153,159);}
						.content{
							line-height: 24px;font-size: 10px;color:rgb(7,17,27);
							.stress{font-size: 24px;}
						}
					}
				}
				.favorite{
					position: absolute;right:11px;top:18px;text-align: center;width:50px;
					.icon-favorite{
						display: block;margin-bottom: 4px;font-size: 24px;line-height:24px;color:#d4d6d9;
						transition:all 0.5s ease-out;transform: translate(0,0);
						&.active{
							transition:all 0.5s ease-out;transform: translate(0,-3px);
							color:rgb(240,20,20);
						}
					}
					.text{font-size: 10px;line-height: 10px;color:rgb(77,85,93)}
				}
			}
			.bulletin{
				padding: 18px 18px 0 18px;
				.content-wrapper{
					padding: 0 12px 16px 12px;font-size: 12px;line-height: 28px;.border-1px(rgba(7,17,27,0.1));
					.content{color:#07111b;}
				}
				.supports{
					font-size: 0;
					.support-item{
						float: left;padding:16px 12px;.border-1px(rgba(7,17,27,0.1)); box-sizing: border-box;width:50%;
						&:last-child{.border-none()}
						.support-icon{
							display: inline-block;width:60px;height:20px;margin-right: 6px;vertical-align: top;
						}
						.text{
							display: inline-block;vertical-align: top;font-size: 12px;line-height: 20px;color:rgb(7,17,27);
						}
					}
				}
			}
			.info-pics{
				padding:18px;
				.pic-wapper{
					width:100%;overflow: hidden;white-space: nowrap;
					.pic-list{
						font-size: 0;
						.pic-item{
							display: inline-block;margin-right: 6px;width:120px;height:90px;
							&:last-chld{margin-right: 0;}
						}
					}
				}
			}
			.infomsg{
				padding:18px;
				.title{padding-bottom:12px;margin-bottom:0;.border-1px(rgba(7,17,27,0.1));}
				.info-item{
					padding:16px 12px;font-size: 12px;line-height: 16px;color:rgb(7,17,27);.border-1px(rgba(7,17,27,0.1));
					&:last-child{.border-none();}
				}
			}
		}
	}
</style>
