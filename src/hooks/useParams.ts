import { useSearchParams } from 'react-router-dom';

import { isString, omit, set } from 'lodash-es';

import { UseParamsResult } from './types';

const useParams = (): UseParamsResult => {
	const [searchParams, setSearchParams] = useSearchParams();

	// Add this to keep parameter in state
	const params = {};
	for (const [key, value] of searchParams.entries()) {
		set(params, key, value);
	}

	// Remove params
	const removeParams = (key: string | string[]) => {
		const paramKeys = isString(key) ? [key] : key;
		setSearchParams(omit(params, paramKeys), { replace: true });
	};

	// Set params
	const setParams = data => {
		setSearchParams(
			{
				...params,
				...data,
			},
			{ replace: true },
		);
	};

	// Get value of params
	const getParamsValue = key => (searchParams.has(key) ? searchParams.get(key) : null);

	return { setParams, removeParams, getParamsValue };
};

export default useParams;
