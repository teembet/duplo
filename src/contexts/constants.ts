import { RouteObject } from 'react-router-dom';
import { keyBy } from 'lodash-es';
import { NAVIGATION_MENU } from '@/components/reuseables/constants';
import routerRoutes from '@/components/router/routes/index.routes';
import { RouteSignal } from '@/components/router/types';
import { AdminUser } from '@/store/authentication/types';

export const getPermissibleRoutes = (permissions: AdminUser['permissions']) => {
	const ADMIN_PERMISSIONS_BY_KEY = keyBy(permissions, 'name');
	const ADMIN_PERMISSIONS = Object.keys(ADMIN_PERMISSIONS_BY_KEY);

	const publicRoutes = routerRoutes.find(({ id }) => id === RouteSignal.PUBLIC);
	// if (!permissions?.length) {
	// 	return [publicRoutes];
	// }
	const privateRoutes = routerRoutes.find(({ id }) => id === RouteSignal.PRIVATE);
	const { children = [] } = privateRoutes ?? {};
	const allowedChildren = children?.reduce((acc, child) => {
		const { id } = child;
		// let { children: constructedChildren } = child;

		// We want to make sure the admin has the access
		if (ADMIN_PERMISSIONS?.includes(id) || id?.includes('DEFAULT_')) {
			// const { actions = [], role } = ADMIN_PERMISSIONS_BY_KEY[id] ?? {};
			// const isEditorRole = role === ModulePermissionRole.EDITOR;
			acc.push(child);
		}
		return acc;
	}, [] as RouteObject[]);
	// Get allowed private routes
	const allowedPrivateRoutes = { ...privateRoutes, children: allowedChildren };

	return [publicRoutes, allowedPrivateRoutes] as RouteObject[];
};

export const getPermissibleMenuList = (permissions: AdminUser['permissions']) => {
	const ADMIN_PERMISSIONS_BY_KEY = keyBy(permissions, 'name');
	const ADMIN_PERMISSIONS = Object.keys(ADMIN_PERMISSIONS_BY_KEY);

	const MENU_LIST = NAVIGATION_MENU.reduce((acc, NAVIGATION) => {
		const { key} = NAVIGATION;

		const isParentModuleRoute = ADMIN_PERMISSIONS.includes(key);

	

		// Only show menus that have a corresponding permission or a default view
		if (ADMIN_PERMISSIONS.includes(key) || key.includes('DEFAULT_')) {
			acc.push(NAVIGATION);
		}

		return acc;
	}, []);

	return MENU_LIST;
};
