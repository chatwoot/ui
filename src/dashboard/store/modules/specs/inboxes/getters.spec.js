import { getters } from '../../inboxes';
import inboxList from './fixtures';

describe('#getters', () => {
  it('getInboxes', () => {
    const state = {
      records: inboxList,
    };
    expect(getters.getInboxes(state)).toEqual(inboxList);
  });

  it('getInbox', () => {
    const state = {
      records: inboxList,
    };
    expect(getters.getInbox(state)(1)).toEqual({
      id: 1,
      channel_id: 1,
      name: 'Test FacebookPage 1',
      channel_type: 'Channel::FacebookPage',
      avatar_url: 'random_image.png',
      page_id: '12345',
      widget_color: null,
      website_token: null,
      enable_auto_assignment: true,
    });
  });

  it('getUIFlags', () => {
    const state = {
      uiFlags: {
        isFetching: true,
        isFetchingItem: false,
        isCreating: false,
        isUpdating: false,
        isUpdatingAutoAssignment: false,
        isDeleting: false,
      },
    };
    expect(getters.getUIFlags(state)).toEqual({
      isFetching: true,
      isFetchingItem: false,
      isCreating: false,
      isUpdating: false,
      isUpdatingAutoAssignment: false,
      isDeleting: false,
    });
  });
});
