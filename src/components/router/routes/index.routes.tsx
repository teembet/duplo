import { Outlet, RouteObject } from 'react-router-dom';
import APP_PATHS from '@/paths.constants';
import { RouteSignal } from '../types';
import { SignIn, Dashboard } from './views';
import { AuthenticatedLayout } from '@/components/layouts';
import UnauthenticatedLayout from '@/components/layouts/UnAuthenticated';
import AppErrorBoundary from '@/components/reuseables/Misc/ErrorBoundary';
import { Suspense } from 'react';
import SuspenseLoader from '@/components/reuseables/Misc/SuspenseLoader';

const { SIGN_IN, DASHBOARD } = APP_PATHS;

const routes: RouteObject[] = [
	{
		id: RouteSignal.PUBLIC,
		element: (
			<UnauthenticatedLayout>
				<Outlet />
			</UnauthenticatedLayout>
		),
		children: [
			{
				path: SIGN_IN,
				element: <SignIn />,
				index: true,
			},
		],
	},
	{
		id: RouteSignal.PRIVATE,
		element: (
			<Suspense fallback={<SuspenseLoader />}>
				{/* <AuthenticatedLayout> */}
				<Outlet />
				{/* </AuthenticatedLayout> */}
			</Suspense>
		),
		errorElement: <AppErrorBoundary />,

		children: [
			//Dashboard
			{
				id: 'DEFAULT_DASHBOARD',
				path: DASHBOARD,
				element: <Dashboard />,
			},
		],
	},
];

export default routes;
