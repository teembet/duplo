/* eslint-disable @typescript-eslint/no-explicit-any */
import { showSuccessToast } from "./toast";

/**
 * Fallback for older browsers for copy to clipboard
 *
 * @param {string} text Item to be copied
 */
export const fallbackCopyTextToClipboard = (text: string): void => {
	const textArea = document.createElement('textarea');
	textArea.value = text;

	// Avoid scrolling to bottom
	textArea.style.top = '0';
	textArea.style.left = '0';
	textArea.style.position = 'fixed';

	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();

	document.body.removeChild(textArea);

	showSuccessToast('Copied');
};

/**
 * Copy to clipboard action
 *
 * @param {string} text Text string
 * @param {Event} event Event object
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const copyToClipboard = (text: string, event: any): void => {
	const link = text || event?.getAttribute('data-clipboard-text');

	if (!navigator.clipboard) {
		fallbackCopyTextToClipboard(link);
		return;
	}
	navigator.clipboard.writeText(link);
	showSuccessToast('Copied');
};
