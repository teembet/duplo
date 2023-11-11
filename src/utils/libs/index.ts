/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent } from 'react';

import { Buffer } from 'buffer';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { isBoolean, isNaN, isNumber, isPlainObject, isString, trim } from 'lodash-es';

// Base 64 regex
export const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

// Determine if the current browser instance is localhost
export const isLocalHost = window.location.origin.includes('localhost');

/** Determine if the current instance is development */
export const isDevelopmentMode = import.meta.env.NODE_ENV === 'development';

/** Determine if instance is running on staging */
export const isStagingInstance = window.location.origin.includes('staging');

/** Normalize any number to a percentage range with min at zero */
export const normalizeToPercentage = ({ value, max }: { value: number; max: number }) => {
	const result = ((value - 0) * 100) / (max - 0);

	return isNaN(result) ? 0 : result;
};

/**
 * @function
 * Transform a non event change into an event change to mimic a normal event change.
 *
 * @param {string} args - The supposed input name and value
 * @param {object} domEvent - The actual dom event if provided
 * @returns {object} A mimicked event object
 */
export const transformNonEventChange = (
	{ name, value }: { name: string; value?: string | number | File | Blob | any },
	domEvent = {},
): ChangeEvent<HTMLInputElement> => {
	const event = {
		...domEvent,
		target: {
			...domEvent,
			name,
			value,
		},
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return event as any;
};

/**
 * Decode token details
 *
 * @param {string} token Token String
 * @returns {object} Decoded token result
 */
export const getTokenDetails = (token: string): Record<string, any> => {
	const decodedToken: JwtPayload = jwtDecode(token);
	return decodedToken;
};

/** Get dom element by ID */
export const getDomElementById = (id: string): Element => document.getElementById(id);

/** Determine if instance of file */
export const isFileInstance = (arg: unknown): boolean => arg instanceof File;

/** Determine if instance of Blob */
export const isBlobInstance = (arg: unknown): boolean => arg instanceof Blob;

/** Trim values */
export const trimValues = <T>(args: T): typeof args => {
	// Don't trim boolean
	if (isBoolean(args)) {
		return args;
	}

	// Don't trim number
	if (isNumber(args)) {
		return args;
	}

	// Don't manipulate blobs or files
	if (isFileInstance(args) || isBlobInstance(args)) {
		return args;
	}

	// Run if it is an object {}
	if (isPlainObject(args)) {
		const trimmedObject = Object.entries(args).reduce((acc, [key, value]) => {
			// Don't manipulate blobs or files
			if (isFileInstance(value) || isBlobInstance(value)) {
				acc[key] = value;
				return acc;
			}

			// Don't trim boolean
			if (isBoolean(value)) {
				acc[key] = value;
				return acc;
			}

			// Don't trim number
			if (isNumber(value)) {
				acc[key] = value;
				return acc;
			}

			// If value is an object
			if (typeof value === 'object') {
				acc[key] = trimValues(value);
				return acc;
			}

			acc[key] = trim(value);
			return acc;
		}, {});

		return trimmedObject as T;
	}

	// Run if it is an array
	if (Array.isArray(args)) {
		// Make sure array is not empty
		if (args?.length) {
			const trimmedArray = args.map(item => {
				if (isString(item)) {
					return trim(item);
				}

				// Don't manipulate boolean
				if (isBoolean(item)) {
					return item;
				}

				// Don't manipulate number
				if (isNumber(item)) {
					return item;
				}

				if (isPlainObject(item)) {
					return trimValues(item);
				}

				return item;
			});

			return trimmedArray as unknown as T;
		}

		return args;
	}

	// Trim normally if it is a string
	if (isString(args)) {
		return trim(args) as unknown as T;
	}

	// Return original to avoid transformation of non-acceptable types
	return args;
};

/** Replace objects within an array with new input */
export const replaceObjectInArray = ({
	finders = [],
	replacements = {},
	list = [],
}: {
	finders: string[];
	replacements: Record<string, any>;
	list: Record<string, any>[];
}) => {
	let finderValues = finders;

	// Convert to  array if a single string is passed
	if (typeof finders === 'string') {
		finderValues = [finders];
	}

	const replacedList = list.reduce((acc, listItem, index) => {
		//  Convert the list item values to lowercase
		const listItemValues = Object.values(listItem);

		// Push the current list
		acc.push(listItem);

		finderValues?.forEach(finderValue => {
			// If the values includes the finder values
			if (listItemValues.includes(finderValue?.toLowerCase())) {
				// Replace object at the index with the replacement
				acc[index] = replacements[finderValue?.toLowerCase()];
			}

			return acc;
		});

		return acc;
	}, []);

	return replacedList;
};

/** Insert a additions into an array at a point index */
export const insertIntoArray = ({
	list = [],
	point = 0,
	additions,
}: {
	list: Record<string, any>[];
	point: number;
	additions: any[];
}) => {
	const newList = [...list.slice(0, point), ...additions, ...list.slice(point)];

	return newList;
};

// Resolve negative numbers to zero
export const resolveNegativeNumbers = value => {
	const formattedValue = parseFloat(value);

	if (!isNaN(formattedValue)) {
		if (formattedValue < 0) {
			return 0;
		}

		return formattedValue;
	}

	return value;
};

export const renameKeyInObject = ({
	obj,
	oldKey,
	newKey,
}: {
	obj: Record<string, any>;
	oldKey: string;
	newKey: string;
}) => {
	// eslint-disable-next-line no-prototype-builtins
	if (!obj.hasOwnProperty(oldKey)) {
		return false;
	}

	obj[newKey] = obj[oldKey];
	delete obj[oldKey];
	return true;
};

export const encodeBase64 = data => {
	return Buffer.from(data, 'utf8').toString('base64');
};

export const decodeBase64 = data => {
	return Buffer.from(data, 'base64').toString('utf8');
};

/** Other Exports */
export { default as REQUEST_URLS } from './requests';
