/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom, useRecoilState } from 'recoil';
import { produce } from 'immer';
import { resolveRouterLocationEntries } from './effects';
import type { RouterActions, RouterState } from './types';
import dayjs from 'dayjs';

const key = 'router';

const routerDefaultState = atom<RouterState>({
	key,
	default: {
		locations: [],
	},
	// TODO: Decide if this should be persisted or not
	effects: [resolveRouterLocationEntries],
});

/** State config for router */
const useRouterState = (): [RouterState, RouterActions] => {
	const [store, updateRouterState] = useRecoilState(routerDefaultState);

	/** Update locations */
	const updateLocation = (location, matches) => {
		const updatedState = produce(store, draft => {
			draft['locations']?.push({ location, timestamp: dayjs().unix(), matches });
		});

		updateRouterState(updatedState);
	};

	/** Get last URL */
	const getLastRouterUrl = fallbackUrl => {
		const locations = store.locations;
		const locationsLength = locations?.length - 1;

		return store.locations[locationsLength - 1]?.location ?? fallbackUrl;
	};

	return [store, { updateLocation, getLastRouterUrl }];
};

export default useRouterState;
