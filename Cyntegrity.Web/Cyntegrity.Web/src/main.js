import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store';
import App from './App.vue';

Vue.config.productionTip = true;
Vue.use(VueRouter);

new Vue({
    render: h => h(App),
    store: store
}).$mount('#app');
