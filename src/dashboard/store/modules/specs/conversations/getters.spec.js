import commonHelpers from '../../../../helper/commons';
import getters from '../../conversations/getters';

// loads .last() helper
commonHelpers();

describe('#getters', () => {
  describe('#getAllConversations', () => {
    it('order conversations based on last message date', () => {
      const state = {
        allConversations: [
          {
            id: 1,
            messages: [
              {
                created_at: 1466424480,
              },
            ],
          },
          {
            id: 2,
            messages: [
              {
                created_at: 2466424490,
              },
            ],
          },
        ],
      };
      expect(getters.getAllConversations(state)).toEqual([
        {
          id: 2,
          messages: [
            {
              created_at: 2466424490,
            },
          ],
        },
        {
          id: 1,
          messages: [
            {
              created_at: 1466424480,
            },
          ],
        },
      ]);
    });
  });
  describe('#getUnAssignedChats', () => {
    it('order returns only chats assigned to user', () => {
      const conversationList = [
        {
          id: 1,
          inbox_id: 2,
          status: 1,
          meta: { assignee: { id: 1 } },
          labels: ['sales', 'dev'],
        },
        {
          id: 2,
          inbox_id: 2,
          status: 1,
          meta: {},
          labels: ['dev'],
        },
        {
          id: 11,
          inbox_id: 3,
          status: 1,
          meta: { assignee: { id: 1 } },
          labels: [],
        },
        {
          id: 22,
          inbox_id: 4,
          status: 1,
          meta: { team: { id: 5 } },
          labels: ['sales'],
        },
      ];

      expect(
        getters.getUnAssignedChats({ allConversations: conversationList })({
          status: 1,
        })
      ).toEqual([
        {
          id: 2,
          inbox_id: 2,
          status: 1,
          meta: {},
          labels: ['dev'],
        },
        {
          id: 22,
          inbox_id: 4,
          status: 1,
          meta: { team: { id: 5 } },
          labels: ['sales'],
        },
      ]);
    });
  });
  describe('#getConversationById', () => {
    it('get conversations based on id', () => {
      const state = {
        allConversations: [
          {
            id: 1,
          },
        ],
      };
      expect(getters.getConversationById(state)(1)).toEqual({ id: 1 });
    });
  });
});
