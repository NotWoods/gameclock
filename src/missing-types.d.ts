declare module 'https://cdn.skypack.dev/insights-js@v1.2.10' {
	export * from 'insights-js';
}

declare module 'rollup-plugin-url-resolve' {
	import { Plugin } from 'rollup';

	export default function urlResolve(options?: object): Plugin;
}
