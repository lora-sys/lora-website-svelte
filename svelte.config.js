import adapterAuto from '@sveltejs/adapter-auto';
import adapterStatic from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

import { mdsvex, escapeSvelte } from 'mdsvex';
import { createHighlighter } from 'shiki';
import remarkHeadingId from 'remark-heading-id';
import rehypeSlug from 'rehype-slug';

const SUPPORTED_LANGS = [
	'javascript',
	'typescript',
	'svelte',
	'py',
	'python',
	'tsx',
	'jsx',
	'bash',
	'shell',
	'json',
	'css',
	'html',
	'markdown',
	'yaml',
	'rust',
	'go'
];

let _highlighter = null;
async function getHighlighter() {
	if (!_highlighter) {
		_highlighter = await createHighlighter({
			themes: ['github-dark-dimmed'],
			langs: SUPPORTED_LANGS
		});
	}
	return _highlighter;
}

const mdsvexOptions = {
	extensions: ['.md'],
	remarkPlugins: [remarkHeadingId],
	rehypePlugins: [rehypeSlug],
	highlight: {
		highlighter: async (code, lang = 'text') => {
			const highlighter = await getHighlighter();
			const validLang = SUPPORTED_LANGS.includes(lang) ? lang : 'text';
			const html = escapeSvelte(
				highlighter.codeToHtml(code, {
					lang: validLang,
					theme: 'github-dark-dimmed'
				})
			);
			return `{@html \`${html}\` }`;
		}
	}
};
/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],

	kit: {
		adapter:
			process.env.ADAPTER === 'static'
				? adapterStatic({ pages: 'build', assets: 'build', fallback: '404.html' })
				: adapterAuto()
	}
};

export default config;
