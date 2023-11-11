import { ReactNode } from 'react';
import AuthenticationChecker from './Authentication';
import { ToastProvider } from './ToastContext';
import { PermissionsProvider } from './Permission';

/** Application context group */
const AppContext = ({ children }: { children: ReactNode }): JSX.Element => {
	return (
		<AuthenticationChecker>
			 <ToastProvider>
					<PermissionsProvider>
			{children}
			</PermissionsProvider>
			 </ToastProvider>
		</AuthenticationChecker>
	);
};

export default AppContext;
