import endPoints from 'widget/api/endPoints';
import { API } from 'widget/helpers/axios';

const createConversationAPI = async content => {
  const urlData = endPoints.createConversation(content);
  const result = await API.post(urlData.url, urlData.params);
  return result;
};

const sendMessageAPI = async content => {
  const urlData = endPoints.sendMessage(content);
  const result = await API.post(urlData.url, urlData.params);
  return result;
};

const sendAttachmentAPI = async attachment => {
  const urlData = endPoints.sendAttachment(attachment);
  const result = await API.post(urlData.url, urlData.params);
  return result;
};

const getMessagesAPI = async ({ before }) => {
  const urlData = endPoints.getConversation({ before });
  const result = await API.get(urlData.url, { params: urlData.params });
  return result;
};

const getConversationAPI = async () => {
  return API.get(`/api/v1/widget/conversations${window.location.search}`);
};

const toggleTyping = async ({ typingStatus }) => {
  return API.post(
    `/api/v1/widget/conversations/toggle_typing${window.location.search}`,
    { typing_status: typingStatus }
  );
};

const setUserLastSeenAt = async ({ lastSeen }) => {
  return API.post(
    `/api/v1/widget/conversations/update_last_seen${window.location.search}`,
    { contact_last_seen_at: lastSeen }
  );
};
const sendEmailTranscript = async ({ email }) => {
  return API.post(
    `/api/v1/widget/conversations/transcript${window.location.search}`,
    { email }
  );
};

export {
  createConversationAPI,
  sendMessageAPI,
  getConversationAPI,
  getMessagesAPI,
  sendAttachmentAPI,
  toggleTyping,
  setUserLastSeenAt,
  sendEmailTranscript,
};
