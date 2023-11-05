import { useEffect } from 'react';
import { useLocation, useMatches } from 'react-router-dom';

import useRouterState from '@/store/router';

// In your component
const useRouterLocationListener = () => {
	const [, { updateLocation }] = useRouterState();
	const location = useLocation();
	const matches = useMatches();

	useEffect(() => {
		// Update the Recoil state with the current URL
		updateLocation(location.pathname, matches);

		// Cleanup the effect
		return () => {
			// Optionally, you can perform any cleanup here
		};
	}, [location]);
};

export default useRouterLocationListener;
