/* eslint-disable @typescript-eslint/no-explicit-any */
import { AtomEffect, DefaultValue } from 'recoil';

import localforage from 'localforage';

// Create Config
localforage.config({
	name: 'Test Project',
	storeName: 'test_project',
	description: 'Storage site for test project',
});

/**
 * Recoil module to persist state to storage
 */
const recoilPersistIndexDB = ({ key = '' }: { key: string }): { persistAtom: AtomEffect<any> } => {
	if (typeof window === 'undefined') {
		return {
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			persistAtom: () => {},
		};
	}

	const persistAtom: AtomEffect<any> = ({ onSet, node, trigger, setSelf }) => {
		if (trigger === 'get') {
			getState().then(state => {
				if (typeof state.then === 'function') {
					state.then((s: any) => {
						if (Object.getOwnPropertyDescriptor(s, node.key)) {
							setSelf(s[node.key]);
						}
					});
				}
				if (Object.getOwnPropertyDescriptor(state, node.key)) {
					setSelf(state[node.key]);
				}
			});
		}

		onSet(async newValue => {
			const state = await getState();
			if (typeof state.then === 'function') {
				state.then((s: any) => updateState(newValue, s, node.key));
			} else {
				await updateState(newValue, state, node.key);
			}
		});
	};

	const updateState = async (newValue: any, state: any, key: string) => {
		if (
			newValue !== null &&
			newValue !== undefined &&
			newValue instanceof DefaultValue &&
			Object.getOwnPropertyDescriptor(state, key)
		) {
			delete state[key];
		} else {
			state[key] = newValue;
		}

		setState(state);
	};

	const getState = async () => {
		const toParse = await localforage.getItem<any>(key);
		if (toParse === null || toParse === undefined) {
			return {};
		}
		if (typeof toParse === 'string') {
			return parseState(toParse);
		}
		if (typeof toParse.then === 'function') {
			return toParse.then(parseState);
		}
		return {};
	};

	const parseState = (state: string) => {
		if (state === undefined) {
			return {};
		}
		try {
			return JSON.parse(state);
		} catch (e) {
			return {};
		}
	};

	const setState = async (state: any) => {
		try {
			await localforage.setItem(key, JSON.stringify(state));
		} catch (e) {
			console.error(e);
		}
	};

	return { persistAtom };
};

export default recoilPersistIndexDB;
