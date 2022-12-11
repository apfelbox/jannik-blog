import {GetStaticProps, NextPage} from 'next';
import {fetchPostsList} from '../lib/blog/loader';
import {AbstractLink} from '../components/interaction/AbstractLink';
import {BlogPostMeta} from '../components/blog/BlogPost';


export const getStaticProps: GetStaticProps<HomepageProps> = async () =>
{
	return {
		props: {
			posts: await fetchPostsList(),
		},
	};
};


interface HomepageProps
{
	posts: Array<BlogPostMeta>
}

const Homepage: NextPage<HomepageProps> = (props) =>
{
	return (
		<div>
			<h1>Home</h1>
			<ul>
				{props.posts.map(post => (
					<li><AbstractLink key={post.slug} href={`/read/${post.slug}`}>{post.title}</AbstractLink></li>
				))}
			</ul>
		</div>
	);
};

export default Homepage;
