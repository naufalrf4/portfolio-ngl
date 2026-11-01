import adapter from '@sveltejs/adapter-cloudflare';
import adapterNode from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const runtimeAdapter = process.env.CF_PAGES === '1' ? adapter() : adapterNode();

const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: runtimeAdapter
	}
};

export default config;
