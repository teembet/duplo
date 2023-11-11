declare module '*.svg' {
	import React = require('react');
	export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
	const src: string;
	export default src;
}
declare module '*.jpg' {
	const content: string;
	export default content;
}

declare module '*.png' {
	const content: string;
	export default content;
}

declare module '*.json' {
	const content: string;
	export default content;
}

declare module 'virtual:pwa-register/react' {
	import type { Dispatch, SetStateAction } from 'react';

	export interface RegisterSWOptions {
		immediate?: boolean;
		onNeedRefresh?: () => void;
		onOfflineReady?: () => void;
		onRegistered?: (registration: ServiceWorkerRegistration | undefined) => void;
		onRegisterError?: (error: any) => void;
	}

	export function useRegisterSW(options?: RegisterSWOptions): {
		needRefresh: [boolean, Dispatch<SetStateAction<boolean>>];
		offlineReady: [boolean, Dispatch<SetStateAction<boolean>>];
		updateServiceWorker: (reloadPage?: boolean) => Promise<void>;
	};
}
