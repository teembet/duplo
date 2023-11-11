import { ReactNode, createContext, useContext, useMemo } from 'react';

import useAuthentication from '@/store/authentication';

import { getPermissibleMenuList, getPermissibleRoutes } from './constants';
import { PermissionsContextProps } from './types';

// Setup Authentication context
const PermissionsContext = createContext<PermissionsContextProps>({});

/** Setup the permissions provider to house `{children}` */
export const PermissionsProvider = ({ children }: { children: ReactNode }): JSX.Element => {
	const [store] = useAuthentication();
	const { user = {}, isAuthenticated } = store;
	const { permissions = [] } = user;

	const permissibleRoutes = useMemo(
		() => getPermissibleRoutes(permissions),
		[isAuthenticated, user],
	);

	const navigationMenuList = useMemo(
		() => getPermissibleMenuList(permissions),
		[isAuthenticated, permissions],
	);

	return (
		<PermissionsContext.Provider value={{ permissibleRoutes, navigationMenuList }}>
			{children}
		</PermissionsContext.Provider>
	);
};

/** Hook to use Authentication provider values */
const usePermissionsContext = (): PermissionsContextProps =>
	useContext<PermissionsContextProps>(PermissionsContext);

export default usePermissionsContext;
