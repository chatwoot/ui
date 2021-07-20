import { fetchAppConfigAPI } from '../../api/appConfig';
import { SET_APP_CONFIG, SET_APP_CONFIG_UI_FLAGS } from '../types';

const state = {
  webChannelConfig: {
    enabledFeatures: [],
    widgetColor: '',
  },
  authToken: '',
  contact: {
    pubsubToken: '',
  },
  globalConfig: {
    brandName: '',
    logoThumbnail: '',
    widgetBrandURL: '',
  },
  uiFlags: {
    isFetching: false,
    isWidgetConfigured: false,
  },
};

const getters = {
  getWidgetColor: $state => $state.webChannelConfig.widgetColor,
  getWebChannelConfig: $state => $state.webChannelConfig,
  getWidgetConfigured: $state => $state.uiFlags.isWidgetConfigured,
  getGlobalConfig: $state => $state.globalConfig,
  getAuthToken: $state => $state.authToken,
  getContact: $state => $state.contact || {},
};

const actions = {
  setAppConfig({ commit }, data) {
    commit(SET_APP_CONFIG, data);
  },
  async fetchAppConfig({ commit }, params) {
    commit(SET_APP_CONFIG_UI_FLAGS, { isFetching: true });
    try {
      const { data } = await fetchAppConfigAPI(params);
      commit(SET_APP_CONFIG, data);
      commit(SET_APP_CONFIG_UI_FLAGS, { isWidgetConfigured: true });
    } catch (error) {
      // Ignore error
    } finally {
      commit(SET_APP_CONFIG_UI_FLAGS, { isFetching: false });
    }
  },
};

const mutations = {
  [SET_APP_CONFIG]($state, data) {
    const {
      chatwoot_website_channel: webChannelConfig,
      chatwoot_widget_defaults: widgetDefaults,
      global_config: globalConfig,
    } = data;
    $state.webChannelConfig = {
      avatarUrl: webChannelConfig.avatar_url,
      csatSurveyEnabled: webChannelConfig.csat_survey_enabled,
      enabledFeatures: webChannelConfig.enabled_features,
      enabledLanguages: webChannelConfig.enabled_languages,
      hasAConnectedAgentBot: webChannelConfig.has_a_connected_agent_bot,
      locale: webChannelConfig.locale,
      outOfOfficeMessage: webChannelConfig.out_of_office_message,
      preChatFormEnabled: webChannelConfig.pre_chat_form_enabled,
      preChatFormOptions: webChannelConfig.pre_chat_form_options,
      replyTime: webChannelConfig.reply_time,
      useInboxAvatarForBot: widgetDefaults.use_inbox_avatar_for_bot,
      utcOffset: webChannelConfig.utc_off_set,
      websiteName: webChannelConfig.website_name,
      websiteToken: webChannelConfig.website_token,
      welcomeTagline: webChannelConfig.welcome_tagline,
      welcomeTitle: webChannelConfig.welcome_title,
      widgetColor: webChannelConfig.widget_color,
      workingHours: webChannelConfig.working_hours,
      workingHoursEnabled: webChannelConfig.working_hours_enabled,
    };
    $state.contact = {
      pubsubToken: data.contact.pubsub_token,
    };
    $state.authToken = data.auth_token;
    $state.globalConfig = {
      brandName: globalConfig.BRAND_NAME,
      logoThumbnail: globalConfig.LOGO_THUMBNAIL,
      widgetBrandURL: globalConfig.WIDGET_BRAND_URL,
    };
  },
  [SET_APP_CONFIG_UI_FLAGS]($state, uiFlags) {
    $state.uiFlags = {
      ...$state.uiFlags,
      ...uiFlags,
    };
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
