import Vue from 'vue'
import App from "./App"
import store from '@/store/index'

Vue.config.productionTip = false

const app = new Vue(App);
app.$mount();

export default {
	store
}