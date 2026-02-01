// Cognito Configuration
// Initializes AWS Amplify with Cognito settings from environment variables

import { Amplify, ResourcesConfig } from '@aws-amplify/core';

const cognitoConfig: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
      userPoolClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
      loginWith: {
        oauth: {
          domain: `${import.meta.env.VITE_COGNITO_DOMAIN}.auth.${import.meta.env.VITE_COGNITO_REGION}.amazoncognito.com`,
          scopes: ['openid', 'email', 'profile'] as const,
          redirectSignIn: [import.meta.env.VITE_REDIRECT_URI || 'http://localhost:5173'],
          redirectSignOut: [`${import.meta.env.VITE_REDIRECT_URI || 'http://localhost:5173'}/login`],
          responseType: 'code' as const,
          providers: [{ custom: 'Google' }],
        },
      },
    },
  },
};

export function configureCognito() {
  Amplify.configure(cognitoConfig);
}

export default cognitoConfig;
