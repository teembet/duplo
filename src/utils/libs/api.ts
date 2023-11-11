/* eslint-disable @typescript-eslint/no-explicit-any */
import { isString } from 'lodash-es';

/**
 * Handle response or error message parsing
 *
 * @param {object} args Contains either a response or error object per time
 * @returns {string} String message
 */
export const apiMessageHandler = ({ response, error }: { response?: any; error?: any }): string => {
	if (error) {
		// If error is a string then return it
		if (!error?.response?.data?.message && isString(error)) return error;

		// If type of error is an array
		if (Array.isArray(error)) {
			return error[0]?.value?.data?.message;
		}

		return error?.response?.data?.message ?? 'An error occurred';
	}

	// If type of response is an array
	if (Array.isArray(response)) {
		return response[0]?.value?.data?.message;
	}

	return response?.data?.message ?? 'Success';
};

// Handle action to view file
export const handleOpenInTab = (fileUrl?: string) =>
	fileUrl && window.open(fileUrl, '_blank', 'noreferrer noopener');
