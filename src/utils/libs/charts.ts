
import { produce } from 'immer';
import { lowerCase, startCase } from 'lodash';


export const convertToTitleCase = (string: string): string => startCase(lowerCase(string));
export const generatePieChartData = (
	label: Record<string, string>,
	data: Record<string, string | number>,
) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const pieData = produce({ ...label, ...data }, (draft: any) => {
		const refinedData = Object.entries(draft).reduce((acc, [key, value]) => {
			const values = [convertToTitleCase(key), value];

			acc.push(values);
			return acc;
		}, []);

		return refinedData;
	});

	return pieData;
};

