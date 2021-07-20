import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({ webChannelConfig: 'appConfig/getWebChannelConfig' }),
    hasAConnectedAgentBot() {
      return !!this.webChannelConfig.hasAConnectedAgentBot;
    },
    inboxAvatarUrl() {
      return this.webChannelConfig.avatarUrl;
    },
    channelConfig() {
      return this.webChannelConfig;
    },
    hasEmojiPickerEnabled() {
      return this.channelConfig.enabledFeatures.includes('emoji_picker');
    },
    hasAttachmentsEnabled() {
      return this.channelConfig.enabledFeatures.includes('attachments');
    },
    preChatFormEnabled() {
      return this.webChannelConfig.preChatFormEnabled;
    },
    preChatFormOptions() {
      let requireEmail = false;
      let preChatMessage = '';
      const options = this.webChannelConfig.preChatFormOptions || {};
      if (!this.isOnNewConversation) {
        requireEmail = options.require_email;
        preChatMessage = options.pre_chat_message;
      }
      return {
        requireEmail,
        preChatMessage,
      };
    },
  },
};
