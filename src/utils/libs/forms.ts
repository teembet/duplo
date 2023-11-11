/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormikProps, FormikValues } from 'formik';
/** Extract values for nested object string e.g KYC Documents */
export const extractNestedObjectFormValues = (
	groupKey: string,
	values: FormikValues,
): Record<string, any> => {
	const valueKeys = Object.keys(values);

	const result = valueKeys?.reduce((acc, valueKey) => {
		if (valueKey.includes(groupKey)) {
			const actualKey = valueKey.replace(groupKey, '');
			const value = values?.[valueKey];

			acc[actualKey] = value;

			return acc;
		}
		return acc;
	}, {});

	return result;
};

/** Submission handler to check if form should be submitted */
export const formSubmissionHandler = (formik: FormikProps<FormikValues>): void => {
	const { errors, touched } = formik;

	// Convert to array of keys
	const errorKeys = Object.keys(errors);

	if (errorKeys?.length) {
		// Get first element of the array
		const { 1: firstError } = errorKeys;

		// Determine the validation state
		const isTouched = touched?.[firstError];

		// Run only when error field has been touched
		if (isTouched) {
			// Find the DOM node
			const element = document.getElementById(firstError);

			// Bring into view
			element?.parentElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	}
};

/** Convert object to Form Data */
export const convertToFormData = (obj: Record<string, any>): FormData => {
	// Declare form data
	const formData = new FormData();

	// Append all data to form data
	Object.entries(obj).forEach(entry => {
		const [key, value] = entry;

		// Only append data that has a value
		if (value) {
			formData.append(key, value);
		}
	});

	return formData;
};
