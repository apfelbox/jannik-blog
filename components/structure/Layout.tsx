import {PropsWithChildren, ReactElement} from 'react';

export interface LayoutProps
{
}

export function Layout (props: PropsWithChildren<LayoutProps>): ReactElement|null
{
	return (
		<main>
			{props.children}
		</main>
	);
}
