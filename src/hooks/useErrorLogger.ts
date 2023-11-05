import { ErrorLogger } from '.';

// Use fullstory to record error events
const useErrorLogger = (): ErrorLogger => {
	const logError = error => {
		console.log(error);
	};

	return logError;
};

export default useErrorLogger;
