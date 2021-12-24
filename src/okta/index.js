import OktaSignIn from '@okta/okta-signin-widget';
import { OktaAuth } from '@okta/okta-auth-js';

const oktaSignIn = new OktaSignIn({
  baseUrl: 'https://dev-5812657.okta.com',
  clientId: '0oavzxa1dSRsQO4gU5d6',
  redirectUri: 'http://localhost:8080/callback',
  authParams: {
    pkce: true,
    issuer: 'https://dev-5812657.okta.com/oauth2/default',
    display: 'page',
    scopes: ['openid', 'profile', 'email'],
  },
});

const oktaAuth = new OktaAuth({
  issuer: 'https://dev-5812657.okta.com/oauth2/default',
  clientId: '0oavzxa1dSRsQO4gU5d6',
  redirectUri: 'http://localhost:8080/callback',
  scopes: ['openid', 'profile', 'email'],
});

export { oktaAuth, oktaSignIn };
