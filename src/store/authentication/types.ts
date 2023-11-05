/* eslint-disable @typescript-eslint/no-explicit-any */

export type AdminUser = {
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  role?: string;
};

export interface Admins {
  createdAt?: number;
  email?: string;
  id?: string;
  isArchived?: boolean;
  name?: string;
  partnerId?: string;
  permissions?: string[];
  role?: string;
}
export type AuthenticationActions = {
  addToken: (token: string) => void;
  addUser: (user: AdminUser) => void;
  addAnonymousUser: (anonymousUser: any, token: string) => void;
  resetAuthentication: () => void;
};

export type AuthenticationState = {
  isAuthenticated: boolean;
  token: string;
  user?: AdminUser;
  anonymousUser?: Record<string, any>;
};
