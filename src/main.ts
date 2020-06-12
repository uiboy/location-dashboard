import Vue from 'vue';
import App from './App.vue';
import store from './store';
import { appContainer } from '@/InversifyContainer';
import IHttpService from '@/services/http/IHttpService';
import { TYPES } from '@/types/Inversify';
import axios from 'axios';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';

Vue.config.productionTip = false;

const httpService = appContainer.get<IHttpService>(TYPES.HttpService);
httpService.setAxiosInstance(axios);

Vue.use(Buefy);

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
