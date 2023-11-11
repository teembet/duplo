import { isEmpty } from 'lodash-es';

/** Generate google maps link */
export const generateGoogleMapsLink = (coordinates: {
	lat: number;
	lng: number;
	long?: number;
}): string => {
	if (!isEmpty(coordinates)) {
		const { lat, lng, long } = coordinates;
		const resolvedLng = long ?? lng;

		if (resolvedLng !== 0 && lat !== 0) {
			return `https://www.google.com/maps/search/?api=1&query=${lat}%2C${resolvedLng}`;
		}
	}

	return '';
};
