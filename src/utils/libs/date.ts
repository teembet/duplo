import dayjs from "dayjs";


/** Get the current year now */
export const getCurrentYear = dayjs().format('YYYY');

/**
 * Gets the correct greeting time based now
 *
 * @returns {string} Greeting text
 */
export const getGreetingTime = (): string => {
	const dateNow = dayjs().format('HH');
	let g;

	const splitAfternoon = 12; // 24hr time to split the afternoon
	const splitEvening = 17; // 24hr time to split the evening
	const currentHour = parseFloat(dateNow);

	if (currentHour >= splitAfternoon && currentHour <= splitEvening) {
		g = 'Good Afternoon';
	} else if (currentHour >= splitEvening) {
		g = 'Good Evening';
	} else {
		g = 'Good Morning';
	}

	return g;
};
// Format date
export const formatDate = (createdAt, format?: string) =>
	dayjs.unix(createdAt?.['_seconds'] || createdAt?.['seconds'] || createdAt);
