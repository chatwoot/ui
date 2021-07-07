/* eslint no-console: 0 */
/* eslint-env browser */
/* eslint-disable no-new */
/* Vue Core */

import Vue from 'vue';
import VueI18n from 'vue-i18n';
import VueRouter from 'vue-router';
import axios from 'axios';
// Global Components
import hljs from 'highlight.js';
import Multiselect from 'vue-multiselect';
import WootSwitch from 'components/ui/Switch';
import WootWizard from 'components/ui/Wizard';
import { sync } from 'vuex-router-sync';
import Vuelidate from 'vuelidate';
import VTooltip from 'v-tooltip';
import WootUiKit from '../dashboard/components';
import App from '../dashboard/App';
import AppNav from '../navbar/App';
import i18n from '../dashboard/i18n';
import createAxios from '../dashboard/helper/APIHelper';
import commonHelpers from '../dashboard/helper/commons';
import { getAlertAudio } from '../shared/helpers/AudioNotificationHelper';
import { initFaviconSwitcher } from '../shared/helpers/faviconHelper';
import router from '../dashboard/routes';
import store from '../dashboard/store';
import vueActionCable from '../dashboard/helper/actionCable';
import constants from '../dashboard/constants';
import {
  verifyServiceWorkerExistence,
  registerSubscription,
} from '../dashboard/helper/pushHelper';
import * as Sentry from '@sentry/vue';
import 'vue-easytable/libs/theme-default/index.css';
import { Integrations } from '@sentry/tracing';

Vue.config.env = process.env;

if (window.errorLoggingConfig) {
  Sentry.init({
    Vue,
    dsn: window.errorLoggingConfig,
    integrations: [new Integrations.BrowserTracing()],
  });
}

Vue.use(VueRouter);
Vue.use(VueI18n);
Vue.use(WootUiKit);
Vue.use(Vuelidate);
Vue.use(VTooltip, {
  defaultHtml: false,
});
Vue.use(hljs.vuePlugin);

Vue.component('multiselect', Multiselect);
Vue.component('woot-switch', WootSwitch);
Vue.component('woot-wizard', WootWizard);

const i18nConfig = new VueI18n({
  locale: 'en',
  messages: i18n,
});

sync(store, router);
// load common helpers into js
commonHelpers();

window.WootConstants = constants;
window.axios = createAxios(axios);
window.bus = new Vue();


let loadedApp = false;

window.loadChatApp = () => {
  if (loadedApp) {
    return;
  }
  console.log('Loading Hiver Chat');
  loadedApp = true;

  const main_gmail_body = '.nH.bkK.nn';
  const chatContainerId = 'h-chat-container';
  const inboxContainerId = 'h-chat-inbox--container';

  //Check if inbox container is present
  const inboxContainer = document.getElementById(inboxContainerId);
  if (!inboxContainer) {
    console.log('inboxContainer not present');
    return;
  }

  //Creates chat conversations container
  const hiverChatContainer = document.getElementById(chatContainerId);
  if (!hiverChatContainer) {
    const chatContainerEle = document.createElement('div');
    chatContainerEle.setAttribute("id", chatContainerId);
    document.querySelector(main_gmail_body).appendChild(chatContainerEle);
  }
  //Loads Conversations vue instance
  window.WOOT = new Vue({
    router,
    store,
    i18n: i18nConfig,
    components: { App },
    template: '<App/>',
  }).$mount(`#${chatContainerId}`);
  vueActionCable.init();

  //Loads Inboxes vue instance
  vueActionCable.init();
  new Vue({
      components: { AppNav },
      template: '<AppNav/>',
      router,
      store,
      i18n: i18nConfig,
  }).$mount(`#${inboxContainerId}`);

  const onInboxClick = () => {
    window.location.hash = '#liveChat';
    const conversationList = document.querySelector(main_gmail_body + '> .nH');
    conversationList.style.opacity = 0;
    conversationList.style.transition = 'all .5s ease-in-out';
    conversationList.style.height = 0;
    conversationList.style.overflow = 'auto';
  };
  const inboxClassName = "h-icon-container hiver-left-sidebar-name-container h-left-sidebar-name-container";
  setTimeout(onInboxClick, 3000)
}

window.addEventListener('load', () => {
  verifyServiceWorkerExistence(registration =>
    registration.pushManager.getSubscription().then(subscription => {
      if (subscription) {
        registerSubscription();
      }
    })
  );
  getAlertAudio();
  initFaviconSwitcher();
});
