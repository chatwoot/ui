import {
  createConversationAPI,
  sendMessageAPI,
  getMessagesAPI,
  sendAttachmentAPI,
  toggleTyping,
  setUserLastSeenAt,
} from 'widget/api/conversation';
import { refreshActionCableConnector } from '../../../helpers/actionCable';

import { createTemporaryMessage, onNewMessageCreated } from './helpers';

export const actions = {
  createConversation: async ({ commit }, params) => {
    commit('setConversationUIFlag', { isCreating: true });
    try {
      const { data } = await createConversationAPI(params);
      const {
        contact: { pubsub_token: pubsubToken },
        messages,
      } = data;
      const [message = {}] = messages;
      commit('pushMessageToConversation', message);
      refreshActionCableConnector(pubsubToken);
    } catch (error) {
      console.log(error);
      // Ignore error
    } finally {
      commit('setConversationUIFlag', { isCreating: false });
    }
  },
  sendMessage: async ({ commit }, params) => {
    const { content } = params;
    commit('pushMessageToConversation', createTemporaryMessage({ content }));
    await sendMessageAPI(content);
  },

  sendAttachment: async ({ commit }, params) => {
    const {
      attachment: { thumbUrl, fileType },
    } = params;
    const attachment = {
      thumb_url: thumbUrl,
      data_url: thumbUrl,
      file_type: fileType,
      status: 'in_progress',
    };
    const tempMessage = createTemporaryMessage({
      attachments: [attachment],
    });
    commit('pushMessageToConversation', tempMessage);
    try {
      const { data } = await sendAttachmentAPI(params);
      commit('updateAttachmentMessageStatus', {
        message: data,
        tempId: tempMessage.id,
      });
    } catch (error) {
      // Show error
    }
  },

  fetchOldConversations: async ({ commit }, { before } = {}) => {
    try {
      commit('setConversationListLoading', true);
      const { data } = await getMessagesAPI({ before });
      commit('setMessagesInConversation', data);
      commit('setConversationListLoading', false);
    } catch (error) {
      commit('setConversationListLoading', false);
    }
  },

  clearConversations: ({ commit }) => {
    commit('clearConversations');
  },

  addMessage: async ({ commit }, data) => {
    commit('pushMessageToConversation', data);
    onNewMessageCreated(data);
  },

  updateMessage({ commit }, data) {
    commit('pushMessageToConversation', data);
  },

  toggleAgentTyping({ commit }, data) {
    commit('toggleAgentTypingStatus', data);
  },

  toggleUserTyping: async (_, data) => {
    try {
      await toggleTyping(data);
    } catch (error) {
      // IgnoreError
    }
  },

  setUserLastSeen: async ({ commit, getters: appGetters }) => {
    if (!appGetters.getConversationSize) {
      return;
    }

    const lastSeen = Date.now() / 1000;
    try {
      commit('setMetaUserLastSeenAt', lastSeen);
      await setUserLastSeenAt({ lastSeen });
    } catch (error) {
      // IgnoreError
    }
  },
};
