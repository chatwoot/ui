import { API } from 'widget/helpers/axios';

export const fetchAppConfigAPI = async ({ token, websiteToken }) => {
  return API({
    method: 'post',
    url: '/api/v1/widget/config',
    data: {
      website_token: websiteToken,
    },
    headers: { 'X-Auth-Token': token },
  });
};
