import { json } from '@sveltejs/kit';
import type { Post } from '$lib/types';

async function getPosts() {
	let posts: Post[] = [];

	const paths = import.meta.glob('/src/content/*.md');
	for (const path in paths) {
		const module = (await paths[path]()) as { metadata?: Omit<Post, 'slug'> };
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (module?.metadata && slug) {
			const post = { ...module.metadata, slug } satisfies Post;
			post.published && posts.push(post);
		}
	}

	posts = posts.sort(
		(first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
	);

	return posts;
}

export async function GET() {
	const posts = await getPosts();
	return json(posts);
}
