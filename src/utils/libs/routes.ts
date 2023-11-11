/* eslint-disable @typescript-eslint/no-explicit-any */
import { To, matchPath } from 'react-router-dom';

import { compact, flattenDeep, isEmpty, isObject, isString } from 'lodash-es';

import routes from '../../components/router/routes/index.routes';
// Determine if the current browser instance is localhost
export const isLocalHost = window.location.origin.includes('localhost');

/** Determine if the current instance is development */
export const isDevelopmentMode = import.meta.env.NODE_ENV === 'development';

/** Determine if instance is running on staging */
export const isStagingInstance = window.location.origin.includes('staging');

// Compile all paths found recursively into a single array string object
const getAllPathsInRoutes = routes => {
	const acc = [];
	routes.forEach(route => {
		const { path, groupElements = [] } = route;

		if (path) {
			acc.push(path);
		}

		if (groupElements.length) {
			const result = getAllPathsInRoutes(groupElements);
			acc.push(...result);
		}

		return acc;
	}, []);

	return acc;
};

export const isAuthenticatedPath = (path = window.location.pathname) => {
	// Get all authenticated paths as defined in the routes file
	const allAuthenticatedPaths = getAllPathsInRoutes(routes);

	// Deduce if the current path is authenticated
	const result = allAuthenticatedPaths.some(pathPattern => {
		const matchResults = matchPath(pathPattern, path);

		return !!matchResults && !isEmpty(matchResults);
	});

	return result;
};



/** Flatten route paths */
export const resolveRoutePaths = (path: string | string[]): string | string[] => {
	// Check if is an array and then flatten
	if (Array.isArray(path)) {
		return flattenDeep(path);
	}

	return path;
};

export const flattenByString = obj => {
	const stringResult = [];

	if (isObject(obj)) {
		Object.values(obj).forEach(value => {
			if (isString(value)) {
				stringResult.push(value);
			}

			if (Array.isArray(value)) {
				stringResult.push(value.forEach(val => flattenByString(val)));
			}

			if (isObject(value)) {
				stringResult.push(flattenByString(value));
			}
		});
	}

	if (Array.isArray(obj)) {
		stringResult.push(obj.forEach(val => flattenByString(val)));
	}

	return compact(flattenDeep(stringResult));
};

/** Get all query url parameters */
export const getUrlQueryEntries = (
	urlQuery = window.location.search as string,
): Record<string, string> => {
	// Get the query end from the url provided using a false base
	const query = new URL(urlQuery, window.location.origin).searchParams;

	// Construct pair empty object
	const urlPairs = {};

	// Loop through each entry
	for (const pair of query.entries()) {
		const { 0: key, 1: value } = pair;

		// Add to object
		urlPairs[key] = value;
	}

	// Return result
	return urlPairs;
};


export const getPaginatedDataKey =
	({ url, pages = 5, rowLength = 15 }: { url: string; pages?: number; rowLength?: number }) =>
	(pageIndex: number, previousPageData) => {
		if (url) {
			// Get the last data path
			const lastDataPath = previousPageData?.lastDataPath;

			// Check if string already includes query params;
			const hasQueryParams = !isEmpty(getUrlQueryEntries(url));

			const newUrl = hasQueryParams
				? `${url}&pages=${pages}&rowLength=${rowLength}`
				: `${url}?pages=${pages}&rowLength=${rowLength}`;

			if (previousPageData && !Object.keys(previousPageData).length) return null;

			// first page, we don't have `previousPageData`
			if (pageIndex === 0) {
				return newUrl;
			}

			if (lastDataPath) {
				return `${newUrl}&lastDataPath=${lastDataPath}`;
			}
		}

		return null;
	};

export const convertToStoreValue = ({
	pathname,
	storeValue = 'search',
}: {
	pathname: string;
	storeValue?: string;
}) => `${pathname}?${storeValue}`;

/** Check if argument is a valid http url */
export const isValidHttpUrl = (string: string): boolean => {
	let url;

	try {
		url = new URL(string);
	} catch (_) {
		return false;
	}

	return url.protocol === 'http:' || url.protocol === 'https:';
};

/** Resolve if the url to resolve or can go back to previous entry */
export const resolveBackNavigation = (urlToResolve): To => {
	// Check that the referrer url is the same domain
	if (document?.referrer?.includes(window?.location?.origin)) {
		return -1 as To;
	}

	return urlToResolve;
};
