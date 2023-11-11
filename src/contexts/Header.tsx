import { ReactNode, createContext, memo, useContext, useState } from 'react';

import { useToggle } from '@/hooks';

import { HeaderContextProps } from './types';

// Setup Header for authenticated context
const HeaderContext = createContext<HeaderContextProps>({});

/** Setup the header provider to house `{children}` */
const Header = ({ children }: { children: ReactNode }): JSX.Element => {
	const [showMobileMenu, toggleMobileMenu] = useToggle();

	// Set up to hold header state
	const [headerState, setHeaderState] = useState<{ title?: string; description?: string }>({
		title: '',
		description: '',
	});

	return (
		<HeaderContext.Provider
			value={{
				setHeaderState,
				headerState,
				toggleMobileMenu,
				showMobileMenu,
			}}
		>
			{children}
		</HeaderContext.Provider>
	);
};

export const HeaderProvider = memo(Header);

/** Hook to use header provider values */
const useHeaderContext = (): HeaderContextProps => useContext<HeaderContextProps>(HeaderContext);

export default useHeaderContext;
