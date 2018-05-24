// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue'
import App from './App'
import vueResource from 'vue-resource'
import VueRouter from 'vue-router'
import VueLocalStorage from 'vue-localstorage'
import axios from 'axios'

// Components
import home from './components/home'
import mug from './components/mug'
import mobilecover from './components/mobilecover'
import wallart from './components/wallart'
import tabletop from './components/tabletop'

Vue.use(vueResource)
Vue.use(VueRouter)
Vue.use(VueLocalStorage)

Vue.config.productionTip = false

const router = new VueRouter({
	mode: 'history',
	base: __dirname,
	routes : [
		{
			path:'/',
			component : home
		},
		{
			path:'/mug',
			component : mug
		},
		{
			path:'/mobilecover',
			component : mobilecover
		},
		{
			path:'/wallart',
			component : wallart
		},
		{
			path:'/tabletop',
			component : tabletop
		}
	]
})

/* eslint-disable no-new */
new Vue({
  router,
  template: `
  		<div id="app">
  			<nav class="navbar navbar-light bg-light">
			  <router-link to="/">Home</router-link>
			</nav>
  			<router-view></router-view>
  			<nav class="footer navbar navbar-light bg-light">
  				<div class="d-flex justify-content-center container">
  					<span class="text-muted">Picsdream | Terms | Privacy Policy</span>
  				</div>
  			</nav>
  		</div>
  `
}).$mount('#app')
