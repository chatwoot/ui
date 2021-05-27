import Auth from './Auth';
import Confirmation from './Confirmation';
import Signup from './Signup';
import PasswordEdit from './PasswordEdit';
import ResetPassword from './ResetPassword';
import { frontendURL } from '../../helper/URLHelper';

export default {
  routes: [
    {
      path: frontendURL('auth'),
      name: 'auth',
      component: Auth,
      children: [
        {
          path: 'confirmation',
          name: 'auth_confirmation',
          component: Confirmation,
          props: route => ({
            config: route.query.config,
            confirmationToken: route.query.confirmation_token,
            redirectUrl: route.query.route_url,
          }),
        },
        {
          path: 'password/edit',
          name: 'auth_password_edit',
          component: PasswordEdit,
          props: route => ({
            config: route.query.config,
            resetPasswordToken: route.query.reset_password_token,
            redirectUrl: route.query.route_url,
          }),
        },
        {
          path: 'signup',
          name: 'auth_signup',
          component: Signup,
          meta: { requireSignupEnabled: true },
        },
        {
          path: 'reset/password',
          name: 'auth_reset_password',
          component: ResetPassword,
        },
      ],
    },
  ],
};
