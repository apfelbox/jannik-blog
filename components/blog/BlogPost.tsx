import {PropsWithChildren, ReactElement} from 'react';
import {StaticImageData} from 'next/image';
import styles from "./BlogPost.module.scss";

export interface BlogPostMeta
{
	title: string;
	date: string;
	image: {
		src: StaticImageData|string;
		author?: {
			name: string;
			url: string;
		};
	};
	tags?: Array<string>;
	featured?: boolean;
	url: string;
	slug: string;
	indexFilePath: string;
}


export interface BlogPostProps extends BlogPostMeta
{
}

export function BlogPost (props: PropsWithChildren<BlogPostProps>): ReactElement|null
{
	return (
		<article>
			<header>
				<h1 className={styles.title}>{props.title}</h1>
			</header>
			{props.children}
		</article>
	);
}
