import Vue from 'vue';
import App from './App.vue';
import Vuelidate from 'vuelidate';
import VueTheMask from 'vue-the-mask';
import Notifications from 'vue-notification';
import VueI18n from 'vue-i18n';
import vuetify from './plugins/vuetify';

import router from './router'
import store from './store'

import "./assets/scss/app.scss";
import {messages} from './assets/localize/init';

Vue.use(Vuelidate);
Vue.use(VueTheMask);
Vue.use(Notifications);
Vue.use(VueI18n);

Vue.config.productionTip = false;
const i18n = new VueI18n({
  locale: 'ru',
  messages,
});

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App),
  i18n
}).$mount('#app');
