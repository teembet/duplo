import { AtomEffect } from 'recoil';
import { isEmpty } from 'lodash-es';

import { RouterState } from './types';
import dayjs from 'dayjs';

export const resolveRouterLocationEntries: AtomEffect<RouterState> = ({ onSet, setSelf }) => {
	onSet((router: RouterState) => {
		// Key locations by preferable match pathname to strip out duplicates
		const locations = router?.locations ?? [];
		const locationsLength = locations?.length;
		const locationsByPathname = locations.reduce<{
			[id: string]: {
				location: string;
				timestamp: number;
				matches: { pathname: string; params: Record<string, string | number>; id: string }[];
			};
		}>((acc, location) => {
			const { matches } = location;

			// Need to get the last preferable match as the key specifically because there are nested routes
			const lastPreferableMatch = matches[locationsLength - 1];

			// Only want to push if we have a match
			if (!isEmpty(lastPreferableMatch)) {
				acc[lastPreferableMatch?.pathname] = location;
			}
			return acc;
		}, {});

		// Get the values
		let locationsToRecord = Object.values(locationsByPathname);

		if (locationsToRecord?.length > 1) {
			// Variable to know if location routes can be stripped
			const canStripOlderLocations = locationsToRecord.some(
				({ timestamp }) => dayjs().diff(dayjs.unix(timestamp), 'minutes') > 20,
			);

			// Need to remove older location routes to avoid storing forever
			if (canStripOlderLocations) {
				locationsToRecord = locationsToRecord.filter(
					({ timestamp }) => dayjs().diff(dayjs.unix(timestamp), 'minutes') < 20,
				);
			}
		}

		// Set records
		setSelf({ ...router, locations: locationsToRecord });
	});
};
