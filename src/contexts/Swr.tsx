import { ReactNode } from 'react';

import { SWRConfig } from 'swr';

import { useApiRequest } from '@/hooks';

/** Wrap with SWR Config provider */
const Swr = ({ children }: { children: ReactNode }): JSX.Element => {
	// Get request method
	const [makeRequest] = useApiRequest();

	// Construct Swr fetcher
	const fetcher = (url, headers) => makeRequest.get(url, headers).then(res => res?.data?.data);

	return (
		<SWRConfig
			value={{
				dedupingInterval: 180000,
				fetcher,
				// focusThrottleInterval: 90000,
				errorRetryCount: 1,
				shouldRetryOnError: false,
				refreshWhenHidden: true,
				// refreshInterval: 120000,
				// revalidateOnFocus: false,
				revalidateIfStale: true,
				// keepPreviousData: true,
			}}
		>
			{children}
		</SWRConfig>
	);
};

export default Swr;
