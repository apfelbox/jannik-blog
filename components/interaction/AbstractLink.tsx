import React, {ForwardedRef, forwardRef, PropsWithChildren, ReactElement} from "react";
import Link, {LinkProps} from "next/link";

export interface AbstractLinkProps
{
	/**
	 * URL to the link target
	 */
	href?: string|null;

	/**
	 * internal locale
	 */
	locale?: LinkProps["locale"];

	/**
	 * Specifies, whether the link should open in a new tab.
	 * If not set, all external links will automatically be opened in a new tab.
	 */
	openInNewTab?: boolean;

	/**
	 * Additional CSS class name
	 */
	className?: string;

	/**
	 * Is button/link disabled?
	 */
	disabled?: boolean;

	/**
	 * On click handler
	 */
	onClick?: React.MouseEventHandler<HTMLButtonElement>;

	/**
	 * On MouseEnter handler
	 */
	onMouseEnter?(): void;

	/**
	 * Defines a string value that labels the current element. Use it in cases where a text label is not visible on the screen.
	 */
	"aria-label"?: string;

	/**
	 * Defines a HTML tag fallback that will be used instead of a link or actual button.
	 */
	fallbackTag?: keyof JSX.IntrinsicElements;
}

function AbstractLinkComponent (props: PropsWithChildren<AbstractLinkProps>, ref: ForwardedRef<HTMLElement>) : ReactElement|null
{
	const itemProps: Record<string, unknown> = {
		className: props.className,
		onClick: !props.disabled ? props.onClick : undefined,
		onMouseEnter: !props.disabled ? props.onMouseEnter : undefined,
		"aria-label": props["aria-label"],
		ref,
	};

	const FallbackTag = props.fallbackTag ? props.fallbackTag : undefined;

	if (!props.disabled && props.href)
	{
		const isExternal = !props.href.startsWith("/") && !props.href.startsWith("#");

		// open in new tab is by default true for external links
		if (props.openInNewTab ?? isExternal)
		{
			itemProps.target = "_blank";
		}

		if (isExternal)
		{
			itemProps.rel = "noopener noreferrer";
		}

		return (
			<Link href={props.href} locale={props.locale} {...itemProps}>
				{props.children}
			</Link>
		);
	}

	if (FallbackTag)
	{
		return (
			<FallbackTag {...itemProps}>
				{props.children}
			</FallbackTag>
		);
	}

	return (
		<button
			{...itemProps}
			type="button"
			disabled={props.disabled}
		>
			{props.children}
		</button>
	);
}

export const AbstractLink = forwardRef<HTMLElement, PropsWithChildren<AbstractLinkProps>>(AbstractLinkComponent);
