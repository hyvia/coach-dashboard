import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  GetUserCommand,
  GlobalSignOutCommand,
} from '@aws-sdk/client-cognito-identity-provider';

const cognitoClient = new CognitoIdentityProviderClient({
  region: import.meta.env.VITE_COGNITO_REGION || 'eu-central-1',
});

const CLIENT_ID = import.meta.env.VITE_COGNITO_CLIENT_ID || '';

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  clubId: string;
  clubName: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isRestoring: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  restoreSession: () => void;
}

const getUserAttr = (
  attrs: { Name?: string; Value?: string }[] | undefined,
  name: string,
): string => attrs?.find((a) => a.Name === name)?.Value ?? '';

export const loginWithCredentials = async (
  email: string,
  password: string,
): Promise<{ user: User; token: string }> => {
  const authResult = await cognitoClient.send(
    new InitiateAuthCommand({
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: CLIENT_ID,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    }),
  );

  const idToken = authResult.AuthenticationResult?.IdToken;
  const accessToken = authResult.AuthenticationResult?.AccessToken;

  if (!idToken || !accessToken) {
    throw new Error('Authentication failed — no tokens received.');
  }

  const userResponse = await cognitoClient.send(
    new GetUserCommand({ AccessToken: accessToken }),
  );

  const attrs = userResponse.UserAttributes;
  const role = getUserAttr(attrs, 'custom:role');

  if (role !== 'coach') {
    await cognitoClient.send(
      new GlobalSignOutCommand({ AccessToken: accessToken }),
    );
    throw new Error('Access denied. Coach account required.');
  }

  return {
    user: {
      email: getUserAttr(attrs, 'email'),
      firstName: getUserAttr(attrs, 'given_name'),
      lastName: getUserAttr(attrs, 'family_name'),
      role,
      clubId: getUserAttr(attrs, 'custom:club_id'),
      clubName: getUserAttr(attrs, 'custom:club_name'),
    },
    token: idToken,
  };
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isRestoring: true,

      setAuth: (user, token) =>
        set({ user, token, isAuthenticated: true, isRestoring: false }),

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isRestoring: false,
        });
      },

      restoreSession: () => {
        const { token } = useAuthStore.getState();
        if (token) {
          // Token exists in persisted storage — consider authenticated
          // Token validity will be checked on first API call
          set({ isRestoring: false });
        } else {
          set({ isAuthenticated: false, isRestoring: false });
        }
      },
    }),
    {
      name: 'hyvia-coach-auth',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
