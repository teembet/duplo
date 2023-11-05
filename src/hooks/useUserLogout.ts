import { useLocation, useNavigate } from 'react-router-dom';
import APP_PATHS from '@/paths.constants';
import useAuthentication from '@/store/authentication';

const useUserLogout = (
	forceRefresh = false,
): ((redirect?: boolean, saveLastUrl?: boolean) => void) => {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const [, { resetAuthentication }] = useAuthentication();

	const logoutUser = (redirect = true, saveLastUrl = true) => {
		resetAuthentication();

		if (redirect) {
			navigate(APP_PATHS.SIGN_IN, { state: saveLastUrl ? { from: pathname } : {} });
		}


		if (forceRefresh) {
			window.location.href = '/';
		}
	};

	return logoutUser;
};

export default useUserLogout;
