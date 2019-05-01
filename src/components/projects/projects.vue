<template>
	<div class="projects">
		<div class="menu-wrapper">
			<ul>
				<li v-for="(item,index) in projects"
				:key="index" class="menu-item"
				:class="{'current':currentIndex === index}" @click="selectMemu(index)">
					<span class="text border-1px">
						<icon-supports v-show="item.type>=0"
						:size="3" class="icon-box"
						:className="classMap[item.type]"></icon-supports>{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="foodsWapper">
			<ul>
				<li v-for="(item,index) in projects" class="food-list food-list-hook" :key="index">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li @click="selectOneFood(food)"
						v-for="(food,index) in item.foods"
						class="food-item"
						:key="index">
							<div class="icon"><img width="57"
							:src="food.icon" alt=""></div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc">{{food.description}}</p>
								<div class="address">
									<span class="now" v-show="food.address"><a :href="food.address">{{food.address}}</a></span>
								</div>
								<div class="cartcontral-wrapper">
									<project-add :food="food"></project-add>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<project-footer ref="vfooter" :sellectFoods="selectFoods"></project-footer>
		<project-food @cartadd="cartAdd"
		:food="onefood" ref='childfood'></project-food>
		<!-- cartAdd相对于监听到了子组件的cartadd属性后做的操作 -->
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	import IconSupports from '../../components/IconSupports/IconSupports'
	import ProjectAdd from '../../components/ProjectAdd/ProjectAdd'
	import ProjectFooter from '../../components/ProjectFooter/ProjectFooter'
	import ProjectFood from '../../components/ProjectFood/ProjectFood.vue'
	const ERROR_OK = 0
	export default {
		components: {
			IconSupports: IconSupports,
			ProjectAdd: ProjectAdd,
			ProjectFooter: ProjectFooter,
			ProjectFood: ProjectFood
		},
		props: {
			info: {
				type: Object
			}
		},
		data() {
			return {
				projects: [],
				listHeight: [],
				scrollY: 0,
				onefood: {}
			}
		},
		computed: {
			currentIndex() {
				for (let i = 0; i < this.listHeight.length; i++) {
					let h1 = this.listHeight[i]
					let h2 = this.listHeight[i + 1]
					if (!h2 || (this.scrollY >= h1 && this.scrollY < h2)) {
						return i
					}
				}
				return 0 // 初始化第一个
			},
			selectFoods() {
				let foods = []
				this.projects.forEach((good) => {
					good.foods.forEach((food) => {
						if (food.count) {
							foods.push(food)
						}
					})
				})
				return foods
			}
		},
		created() {
			this.classMap = ['iconpc', 'iconphone']
			this.axios.get('/api/projects').then((res) => {
				res = res.data
				if (res.errno === ERROR_OK) {
					this.projects = res.data
					this.$nextTick(() => {
						this._initScroll()
						this._setHeight()
					})
				}
			})
			this.$root.eventHub.$on('cart-add', (event) => {
				this._drop(event) // 通过shopcart调用子组件drop方法
			})
			this.$root.eventHub.$on('food-show', (event) => {
				this.selectOneFood(event) // 通过shopcart调用子组件drop方法
			})
		},
		beforeDestory() {
			this.$root.eventHub.$off('cart-add')
			this.$root.eventHub.$off('food-show')
		},
		methods: {
			_initScroll() {
				this.$nextTick(() => {
					this.menuScroll = new BScroll('.menu-wrapper', {
						click: true,
						bounceTime: 100
					})
					this.foodsScroll = new BScroll(this.$refs.foodsWapper, {
						click: true,
						probeType: 3
					})
					this.foodsScroll.on('scroll', (res) => {
						this.scrollY = Math.abs(Math.round(res.y))
					})
				})
			},
			_setHeight() {
				let _height = 0
				this.listHeight.push(_height)
				let lists = document.querySelectorAll('.food-list-hook')
				for (let i = 0; i < lists.length; i++) {
					_height += lists[i].clientHeight
					this.listHeight.push(_height)
				}
			},
			_drop(event) {
				this.$refs.vfooter.drop(event)
			},
			selectMemu(index) {
				let lists = document.querySelectorAll('.food-list-hook')
				this.foodsScroll.scrollToElement(lists[index], 300)
			},
			selectOneFood(food) {
				this.onefood = food
				this.$refs.childfood.show()
			},
			cartAdd(target) {
				this._drop(target)
			}
		}
	}
</script>
<style lang="less" scoped="scoped">
	// @import "../../common/css/index.less";
	.projects{
		display: flex;position: absolute;width:100%;top:174px;bottom:46px;overflow:hidden;
		.menu-wrapper{
			flex: 0 0 80px;width:80px;background-color: #f3f5f7;
			.menu-item{
				display: table;height:54px;width: 56px;line-height: 14px;padding:0 12px;
				&.current{
					position: relative;z-index: 10;margin-top:-1px;font-weight: 700;background: #fff;
					.text{.border-none()}
				}
				.icon-box{
					display: inline-block;margin-right: 2px;width:12px;height:12px;vertical-align: middle;
				}
				.text{
					display: table-cell;width:56px;vertical-align: middle;.border-1px(rgba(7,17,27,0.1));font-size: 12px;
					span{font-size: 12px;}
				}
			}
		}
		.foods-wrapper{
			flex:1;
			.title{
				padding-left:14px;height:26px;line-height: 26px;border-left:2px solid #d9dde1;font-size: 12px;color:rgb(147,153,159);background: #f3f5f7;
			}
			.food-item{
				display: flex;margin:18px;padding-bottom:18px;.border-1px(rgba(7,17,27,0.1));
				&:last-child{margin-bottom:0;.border-none();}
				.icon{flex: 0 0 57px;margin-right:10px}
				.content{
					flex:1;
					.name{margin: 2px 0 8px;height:14px;line-height: 14px;font-size: 14px;color:rgb(7,17,27);}
					.desc,.extra{line-height: 10px;font-size: 12px;color:rgb(147,153,159);}
					.desc{margin-bottom: 4px;line-height: 12px;}
					.extra{
						.count{margin-right: 12px;}
					}
					.address{
						font-weight: 700;line-height: 20px;
						.now{font-size: 12px;color:rgb(240,20,20);}
					}
					.cartcontral-wrapper{
						position: absolute;right:0;top:0px;
					}
				}
			}
		}
	}
</style>
