import { MESSAGE_TYPE } from 'shared/constants/messages';
import axios from 'axios';
import { showBadgeOnFavicon } from './faviconHelper';

export const getAlertAudio = async () => {
  window.playAudioAlert = () => {};
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const playsound = audioBuffer => {
    window.playAudioAlert = () => {
      const source = audioCtx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioCtx.destination);
      source.loop = false;
      source.start();
    };
  };

  try {
    const response = await axios.get('/dashboard/audios/ding.mp3', {
      responseType: 'arraybuffer',
    });

    audioCtx.decodeAudioData(response.data).then(playsound);
  } catch (error) {
    // error
  }
};

export const notificationEnabled = (enableAudioAlerts, id, userId) => {
  if (enableAudioAlerts === 'mine') {
    return userId === id;
  }
  if (enableAudioAlerts === 'all') {
    return true;
  }
  return false;
};

export const shouldPlayAudio = (
  message,
  conversationId,
  userId,
  isDocHidden
) => {
  const {
    conversation_id: incomingConvId,
    sender_id: senderId,
    message_type: messageType,
    private: isPrivate,
  } = message;
  const isFromCurrentUser = userId === senderId;

  const playAudio =
    !isFromCurrentUser && (messageType === MESSAGE_TYPE.INCOMING || isPrivate);
  if (isDocHidden) return playAudio;
  if (conversationId !== incomingConvId) return playAudio;
  return false;
};

export const getAssigneeFromNotification = currentConv => {
  let id;
  if (currentConv.meta) {
    const assignee = currentConv.meta.assignee;
    if (assignee) {
      id = assignee.id;
    }
  }
  return id;
};
export const newMessageNotification = data => {
  const { conversation_id: currentConvId } = window.WOOT.$route.params;
  const currentUserId = window.WOOT.$store.getters.getCurrentUserID;
  const { conversation_id: incomingConvId } = data;
  const currentConv =
    window.WOOT.$store.getters.getConversationById(incomingConvId) || {};
  const assigneeId = getAssigneeFromNotification(currentConv);
  const isDocHidden = document.hidden;
  const {
    enable_audio_alerts: enableAudioAlerts = false,
  } = window.WOOT.$store.getters.getUISettings;
  const playAudio = shouldPlayAudio(
    data,
    currentConvId,
    currentUserId,
    isDocHidden
  );
  const isNotificationEnabled = notificationEnabled(
    enableAudioAlerts,
    currentUserId,
    assigneeId
  );
  if (playAudio && isNotificationEnabled) {
    window.playAudioAlert();
    showBadgeOnFavicon();
  }
};
