/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { RouteObject } from 'react-router-dom';

import { AdminUser } from '@/store/authentication/types';

export interface AuthState {
	isAuthenticated?: boolean;
	user?: Partial<AdminUser>;
	isSuperAdmin: boolean;
	permissions: AdminUser['permissions'];
}

export enum AdminRoles {
	SUPER_ADMIN = 'SUPER_ADMIN',
	ADMIN = 'ADMIN',
}

export interface HeaderContextProps {
	setHeaderState?: (args: { title?: string; description?: string }) => void;
	headerState?: {
		title?: string;
		description?: string;
	};
	toggleMobileMenu?: () => void;
	showMobileMenu?: boolean;
}

export interface PermissionsContextProps {
	permissibleRoutes?: RouteObject[];
	navigationMenuList?: {
		key?: string;
		icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
		label: string;
		path: string;
		matchingPaths?: string[];
		subMenus?: {
			key: string;
			label: string;
			path: string;
			matchingPaths?: string[];
		}[];
	}[];
}
