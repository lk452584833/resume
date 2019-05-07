<template>
  <div id="app">
    <v-header :info="info"></v-header>
		<div class="tab">
			<div class="tab-item"><router-link to="/projects">项目查看</router-link></div>
			<div class="tab-item"><router-link to="/works">工作经历</router-link></div>
			<div class="tab-item"><router-link to="/info">个人信息</router-link></div>
		</div>
		<keep-alive>
			<router-view :info="info"></router-view>
		</keep-alive>
		<lg-preview></lg-preview>
  </div>
</template>

<script>
import vheader from './components/header/header.vue'
const ERRO_OK = 0
export default {
  name: 'App',
	components: {
	'v-header': vheader
	},
	data() {
		return {
			info: {
				id: (() => {
					let urlpass = this.$_urlParam()
					return urlpass.id
				})()
			}
		}
	},
	created() {
		// this.axios.get('/api/info?id=' + this.info.id).then((response) => {
		// 	response = response.data
		// 	if (response.errno === ERRO_OK) {
		// 		this.info = Object.assign({}, this.info, response.data)
		// 	}
		// })
		this.$_axios.getInfo({id: this.info.id}).then((response) => {
			// console.log(response)
			if (response.errno === ERRO_OK) {
				this.info = Object.assign({}, this.info, response.data)
			}
		})
	}
}
</script>

<style lang="less">
html,body{
	font-style: normal;
	font-weight: 200;
}
#app {
  .tab{
		display: flex;width:100%;.border-1px(rgba(7,17,27,0.1));height:40px;line-height:40px;
		.tab-item{
			flex:1;text-align: center;
			a{
				display: block;font-size: 14px;color: rgb(77,85,93);
				&.active{color:rgb(240,20,20);}
			}
		}
	}
}
</style>
