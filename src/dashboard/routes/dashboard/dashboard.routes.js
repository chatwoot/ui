import AppContainer from './Dashboard';
import conversation from './conversation/conversation.routes';
import { routes as notificationRoutes } from './notifications/routes';
import { frontendURL } from '../../helper/URLHelper';

export default {
  routes: [
    {
      path: frontendURL('accounts/:account_id'),
      component: AppContainer,
      children: [
        ...conversation.routes,
        ...notificationRoutes,
      ],
    },
  ],
};
