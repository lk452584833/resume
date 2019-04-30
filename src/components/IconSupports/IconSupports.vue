<template>
	<div>
		<span :class="classType" class="supports-icon"></span>
	</div>
</template>

<script>
	export default{
		props: {
			size: {
				type: Number,
				default: 1
			},
			className: {
				type: String
			}
		},
		computed: {
			classType() {
				// return this.className + ' styl' + this.size
				return `${this.className} styl${this.size}`
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.supports-icon{
		display:inline-block;width:100%;height:100%;background-repeat: no-repeat;background-size: 100% 100%;
		&.styl1{
			&.decrease{.bg-image('../../common/images/decrease_1');}
			&.discount{.bg-image('../../common/images/discount_1');}
			&.guarantee{.bg-image('../../common/images/guarantee_1');}
			&.invoice{.bg-image('../../common/images/invoice_1');}
			&.special{.bg-image('../../common/images/special_1');}
			&.birthage{.bg-image('../../common/images/birthage');}
			&.school{.bg-image('../../common/images/school');}
			&.sex{.bg-image('../../common/images/sex');}
			&.nation{.bg-image('../../common/images/nation');}
			&.education{.bg-image('../../common/images/education');}
		}
		&.styl2{
			&.decrease{.bg-image('../../common/images/decrease_2');}
			&.discount{.bg-image('../../common/images/discount_2');}
			&.guarantee{.bg-image('../../common/images/guarantee_2');}
			&.invoice{.bg-image('../../common/images/invoice_2');}
			&.special{.bg-image('../../common/images/special_2');}
		}
		&.styl3{
			&.decrease{.bg-image('../../common/images/decrease_3');}
			&.discount{.bg-image('../../common/images/discount_3');}
			&.guarantee{.bg-image('../../common/images/guarantee_3');}
			&.invoice{.bg-image('../../common/images/invoice_3');}
			&.special{.bg-image('../../common/images/special_3');}
			&.iconpc{.bg-image('../../common/images/iconpc');}
			&.iconphone{.bg-image('../../common/images/iconphone');}
			&.birthage{.bg-image('../../common/images/birthage');}
			&.school{.bg-image('../../common/images/school');}
			&.sex{.bg-image('../../common/images/sex');}
			&.nation{.bg-image('../../common/images/nation');}
			&.education{.bg-image('../../common/images/education');}
		}
		&.styl4{
			&.decrease{.bg-image('../../common/images/decrease_4');}
			&.discount{.bg-image('../../common/images/discount_4');}
			&.guarantee{.bg-image('../../common/images/guarantee_4');}
			&.invoice{.bg-image('../../common/images/invoice_4');}
			&.special{.bg-image('../../common/images/special_4');}
		}
	}
</style>
