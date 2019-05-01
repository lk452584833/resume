<template>
	<div :class="$style.works" ref='works'>
		<div :class="$style['works-content']">
			<div :class="$style['work-wrapper']">
				<div :class="$style['work-item']" v-for="(work,index) in works" :key="index">
					<app-split></app-split>
					<div :class="$style.content">
						<div :class="$style.web">{{work.web}}</div>
						<h1 :class="$style.name">{{work.name}}</h1>
						<ul :class="$style.dutys " v-show="work.dutys && work.dutys.length">
							<li v-for="(item,index) in work.dutys" :key="index" :class="$style.item">{{item}}</li>
						</ul>
						<div :class="$style.title">工作时间</div>
						<div :class="$style.time">
							<span>{{work.starTime | timeChange}}</span>~<span>{{work.endTime | timeChange}}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	import formatDate from '../../common/js/date.js'
	import AppSplit from '../../components/AppSplit/AppSplit'
	const ERROR_OK = 0
	export default{
		components: {
			AppSplit: AppSplit
		},
		filters: {
			timeChange(time) {
				let date = new Date(time)
				return formatDate(date, 'yyyy-MM')
			}
		},
		props: {
			info: {
				type: Object
			}
		},
		data() {
			return {
				works: []
			}
		},
		created() {
			this.axios.get('/api/works').then((res) => {
				res = res.data
				if (res.errno === ERROR_OK) {
					this.works = res.data
					this.$nextTick(() => {
						this._initScroll()
					})
				}
			})
		},
		watch: {
			works() {
				this._initScroll()
			}
		},
		methods: {
			_initScroll() {
				this.worksscroll = new BScroll(this.$refs.works, {
					click: true,
					bounceTime: 100
				})
			}
		}
	}
</script>

<style lang="less" module>
	.works{
		position: absolute;top:174px;bottom:0;width:100%;overflow: hidden;
		.work-wrapper{
			.content{
				position: relative;padding:15px;
				.name{
					line-height: 16px;margin-bottom: 8px;font-size: 16px;color: #07111b;
				}
				.web{
					position: absolute;right:22px;top:18px;font-size: 12px;
				}
				.title{
					font-size: 14px;line-height: 14px;margin: 6px 0;color: #07111b;
				}
				.dutys{
					.item{
						padding: 6px 12px;font-size: 12px;line-height: 24px;color: #07111b;list-style:inside;
					}
				}
				.time{
					font-size: 12px;padding: 4px 12px;
				}
			}
		}
	}
</style>
