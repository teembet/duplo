import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import PageNotFound from '@/components/reuseables/Misc/PageNotFound';
import usePermissionsContext from '@/contexts/Permission';

/** Application Router Component */
const AppRouter = (): JSX.Element => {
	// Get permissions context hook
	const { permissibleRoutes = [] } = usePermissionsContext();

	return (
		<RouterProvider
			router={createBrowserRouter([
				...permissibleRoutes,
				{
					path: '*',
					element: <PageNotFound />,
					id: '404',
				},
			])}
		/>
	);
};

export default AppRouter;
