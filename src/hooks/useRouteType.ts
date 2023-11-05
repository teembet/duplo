import { useLocation } from 'react-router-dom';

import { compact } from 'lodash-es';

import routes from '@/components/router/routes/index.routes';

const useRouteType = (): {
	isPublicRoute: boolean;
	isAuthenticatedRoute?: boolean;
} => {
	const { pathname } = useLocation();
	// Get unauthenticated routes
	const unauthenticatedRoutePaths = compact(routes[0].children?.map(({ path }) => path));

	// Get authenticated routes
	const authenticatedRoutePaths = routes[1].children?.map(({ path }) => path);

	const isPublicRoute = unauthenticatedRoutePaths.some((path: string) => pathname.includes(path));
	const isAuthenticatedRoute = authenticatedRoutePaths?.some((path) => pathname.includes(path));

	return { isPublicRoute, isAuthenticatedRoute };
};

export default useRouteType;
