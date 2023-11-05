import { Outlet, RouteObject } from 'react-router-dom';
import APP_PATHS from '@/paths.constants';
import { RouteSignal } from '../types';
import UnauthenticatedLayout from '@/components/layouts/UnAuthenticated'
import Authenticated from '@/components/layouts/Authenticated'
import {
	SignIn,
	Dashboard
} from './views';

const {
	SIGN_IN,
	DASHBOARD
} = APP_PATHS;

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
				element: <SignIn  />,
				index: true,
			},
			
		],
	},
	{
		id: RouteSignal.PRIVATE,
		element: (
			
				<Authenticated>
					<Outlet />
				</Authenticated>
	
		),
		
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
