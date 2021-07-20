/* global axios */
import ApiClient from './ApiClient';

class CSATReportsAPI extends ApiClient {
  constructor() {
    super('csat_survey_responses', { accountScoped: true });
  }

  get({ page, from, to } = {}) {
    return axios.get(this.url, {
      params: { page, since: from, until: to, sort: '-created_at' },
    });
  }

  getMetrics({ from, to } = {}) {
    return axios.get(`${this.url}/metrics`, {
      params: { since: from, until: to },
    });
  }
}

export default new CSATReportsAPI();
