/* eslint-disable @typescript-eslint/no-explicit-any */
export type RouterActions = {
	updateLocation: (location: string, matches?: any[]) => void;
	getLastRouterUrl: (fallbackUrl: string) => string;
};

export type RouterState = {
	locations: {
		location: string;
		timestamp: number;
		matches: { pathname: string; params: Record<string, string | number>; id: string }[];
	}[];
};

export type RouterStateKeys = 'locations';
