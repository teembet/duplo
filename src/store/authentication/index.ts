import { atom, useRecoilState } from 'recoil';
import { isEmpty } from 'lodash-es';

import recoilPersistIndexDB from '../recoilPersistIndexDB';
import type { AdminUser, AuthenticationActions, AuthenticationState } from './types';

const key = 'authentication';
const { persistAtom } = recoilPersistIndexDB({ key });

const authenticationDefaultState = atom<AuthenticationState>({
	key,
	default: {
		isAuthenticated: false,
		user: {},
		anonymousUser: {},
		token: '',
	},
	effects_UNSTABLE: [persistAtom],
});

const useAuthentication = (): [AuthenticationState, AuthenticationActions] => {
	const [store, updateAuthenticationState] = useRecoilState(authenticationDefaultState);

	const addUser = (user: AdminUser) => {
		if (!isEmpty(user)) {
			updateAuthenticationState(prevProps => ({
				...prevProps,
				user: {
					...(prevProps?.user ?? {}),
					...user,
				},
			}));
		}
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const addAnonymousUser = (anonymousUser: any, token: string) => {
		if (!isEmpty(anonymousUser)) {
			updateAuthenticationState(prevProps => ({
				...prevProps,
				anonymousUser,
				token,
			}));
		}
	};

	const addToken = (token: string) => {
		if (!isEmpty(token)) {
			updateAuthenticationState(prevProps => ({
				...prevProps,
				token,
				isAuthenticated: true,
			}));
		}
	};

	const resetAuthentication = () => {
		updateAuthenticationState({
			user: {},
			isAuthenticated: false,
			token: '',
			anonymousUser: {},
		});
	};

	return [store, { addUser, addToken, resetAuthentication, addAnonymousUser }];
};

export default useAuthentication;
