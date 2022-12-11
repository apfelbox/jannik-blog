import {glob} from 'glob';
import {BlogPostMeta} from '../../components/blog/BlogPost';
import {join, dirname} from 'path';
import {fileURLToPath} from 'url';
import {promisify} from 'util';
import compareDesc from 'date-fns/compareDesc';

/**
 * Fetches the posts list
 */
export async function fetchPostsList () : Promise<Array<BlogPostMeta>>
{
	const contentDir = join(dirname(fileURLToPath(import.meta.url)), "../../pages/read");

	const files = await promisify(glob)("*/index.mdx", {
		cwd: contentDir,
	});

	return (await Promise.all(files.map(async indexFilePath =>
	{
		const {meta} = await import(`../../pages/read/${indexFilePath}`);

		return {
			...meta,
			slug: dirname(indexFilePath).replace(/^\d{4}-\d{2}-\d{2}-/, ""),
		};

	})))
		.sort(
			(left: BlogPostMeta, right: BlogPostMeta) =>
			{
				if (left.featured !== right.featured)
				{
					return left.featured ? -1 : 1;
				}

				return compareDesc(new Date(left.date), new Date(right.date));
			},
		);
}
