/* eslint-disable no-param-reassign */
import { useState } from 'react';

import { showErrorToast } from '@/utils/libs/toast';
import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { nanoid } from 'nanoid';

import { AuthenticationState } from '@/store/authentication/types';

import useAppStorage from './useAppStorage';
import useUserLogout from './useUserLogout';

// Const Base Url
const baseURL = import.meta.env._GATEWAY;

// Construct axios instance for general requests
const makeRequest = axios.create({
	baseURL, // Initialize with base url
	timeout: 1 * 60 * 1000, // Set timeout at 60s
});

/** Make an api request call */
const useApiRequest = (
	isServiceRequest?: boolean,
	ignoreToken?: boolean,
): [AxiosInstance, number] => {
	// Resolve request type
	const request = makeRequest;
	const [progress, setProgress] = useState(0);
	const { getFromStore } = useAppStorage();

	const logoutUser = useUserLogout(); // Get logout hook method

	// Handle upload progress
	const onUploadProgress = progressEvent => {
		if (progressEvent.lengthComputable) {
			const calculatedProgress = Math.floor((progressEvent.loaded * 100) / progressEvent.total);

			setProgress(calculatedProgress);
		}
	};

	// Add a request interceptor
	request.interceptors.request.use(
		async (config: AxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
			if (config) {
				const controller = new AbortController();
				config = { ...config, signal: controller.signal, onUploadProgress };
				// Add platform headers
				config.headers['request-id'] = 'api-test';
				config.headers['X-Platform'] = 'WEB_ADMIN';

				// If the method requested is not a get request attach the idempotent key
				if (config?.method?.toLowerCase() !== 'get') {
					config.headers['x-idempotent-key'] = nanoid();
				}

				// Get state from store on each call
				const data = await getFromStore('authentication');

				// Get state from store
				const { authentication = {} } = (data && JSON.parse(data)) ?? {};
				const { token = '', user = {} } = authentication as AuthenticationState;

				// If no token, do nothing else and return config
				if (!token || ignoreToken) {
					return config as InternalAxiosRequestConfig;
				}
				// If no token, do nothing else and return config
				if (!token || ignoreToken) {
					return config as InternalAxiosRequestConfig;
				}

				// If token has expired, log the user out
				// if (token && isTokenExpired(token) && !ignoreToken) {
				// 	// Notify the user of their session timeout
				// 	showErrorToast('Session expired.');

				// 	controller.abort();
				// 	logoutUser();
				// 	return config as InternalAxiosRequestConfig;
				// }

				// If none of above match then modify the headers appropriately
				config.headers['Authorization'] = `Bearer ${token}`;
			}

			return config as InternalAxiosRequestConfig;
		},
		error => {
			Promise.reject(error);
		},
	);

	return [request, progress];
};

export default useApiRequest;
