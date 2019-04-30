<template>
	<div class="star-icon" :class="className">
		<span v-for='(icon,index) in starGroups' :class="icon"  class="star-item" :key="index"></span>
	</div>
</template>

<script>
	const LEN = 5
	const ON = 'on'
	const HALF = 'half'
	const OFF = 'off'
	export default{
		props: {
			size: {
				type: Number,
				default: 24
			},
			score: {
				type: Number
			}
		},
		computed: {
			className() {
				return `star${this.size}`
			},
			starGroups() {
				const starGroups = []
				const scoreOn = Math.floor(this.score)
				let starNum = scoreOn >= LEN ? LEN : scoreOn
				const half = (Math.floor(this.score * 2) / 2) % 1 !== 0
				for (let i = 0; i < starNum; i++) {
					starGroups.push(ON)
				}
				if (scoreOn < LEN) {
					if (half) {
						starGroups.push(HALF)
					}
				}
				while (starGroups.length < LEN) {
					starGroups.push(OFF)
				}
				return starGroups
			}
		}
	}
</script>

<style lang="less">
	.star-icon{
		.star-item{display: inline-block;background-size: 100% 100%;background-repeat: no-repeat;}
		&.star24{
			.star-item{width:10px;height:10px;margin-right:3px;}
			.on{.bg-image('../../common/images/star24_on');}
			.half{.bg-image('../../common/images/star24_half');}
			.off{.bg-image('../../common/images/star24_off');}
		}
		&.star36{
			.star-item{width:15px;height:15px;margin-right:6px;}
			.on{.bg-image('../../common/images/star36_on');}
			.half{.bg-image('../../common/images/star36_half');}
			.off{.bg-image('../../common/images/star36_off');}
		}
		&.star48{
			.star-item{width:20px;height:20px;margin-right:20px;}
			.on{.bg-image('../../common/images/star36_on');}
			.half{.bg-image('../../common/images/star36_half');}
			.off{.bg-image('../../common/images/star36_off');}
		}
	}
</style>
