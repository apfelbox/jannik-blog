import '../assets/scss/app.scss';
import type {AppProps} from 'next/app';
import {MDXComponents} from 'mdx/types';
import {MDXProvider} from '@mdx-js/react';
import {AbstractLink} from '../components/interaction/AbstractLink';
import {Layout} from '../components/structure/Layout';

const mdxComponents: MDXComponents = {
	h1: (props) => <h1 className="h1" {...props} />,
	h2: (props) => <h2 className="h2" {...props} />,
	h3: (props) => <h3 className="h3" {...props} />,
	a: (props: any) => <AbstractLink {...props} />,
};

export default function App ({Component, pageProps}: AppProps)
{
	return (
		<MDXProvider components={mdxComponents}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</MDXProvider>
	);
}
