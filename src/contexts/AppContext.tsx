import { ReactNode } from 'react';
import AuthenticationChecker from './Authentication';

/** Application context group */
const AppContext = ({ children }: { children: ReactNode }): JSX.Element => {
	return (
		<AuthenticationChecker>
			{children}
		</AuthenticationChecker>
	);
};

export default AppContext;
