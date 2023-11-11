/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly _API_ENDPOINT: string;
	// more env variables...
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
