/* eslint-disable @typescript-eslint/no-explicit-any */
import { base64StringToBlob } from 'blob-util';

/** Read pdf file */
export const readStatementFile: (file: any) => Promise<number> = file => {
	return new Promise(resolve => {
		const reader = new FileReader();
		reader.onloadend = () => {
			const { result } = reader as { result: string };

			return resolve(result?.match(/\/Type[\s]*\/Page[^s]/g)?.length);
		};
		reader.readAsBinaryString(file);
	});
};

/** Converts bytes to megabytes */
export const convertByteToMegaByte = (bytes: number): number => Number(bytes / 1024 / 1024);

/** Convert base64 to blob */
export const base64toBlob: (base64Data: string, contentType: string) => Blob = (
	base64Data: string,
	contentType: string,
) => {
	contentType = contentType || '';

	const blob = base64StringToBlob(base64Data, contentType);

	return blob;
};
export const downloadFile = ({ fileName, data }: { fileName: string; data: any }) => {
	const link = document.createElement('a');
	link.download = fileName;
	link.href = URL.createObjectURL(data);
	link.click();
};
/**
 *
 * @param {object} arguments The function arguments
 * @param {number} arguments.bytes Bytes to be converted
 * @param {number} arguments.decimals Decimal place to use
 * @returns {string} The converted bytes
 */
export const formatFileBytes = ({
	bytes,
	decimals = 2,
}: {
	bytes: number;
	decimals?: number;
}): string => {
	if (bytes === 0) return '0 Bytes';

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	// eslint-disable-next-line no-restricted-properties
	return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};
