import React from 'react';
import cx from 'clsx';
import Link from 'rsg-components/Link';
import Styled, { JssInjectedProps } from 'rsg-components/Styled';
import { useStyleGuideContext } from 'rsg-components/Context';
import * as Rsg from '../../../typings';

const styles = ({ color, fontFamily, space, mq }: Rsg.Theme): object => ({
	list: {
		margin: 0,
		paddingLeft: space[2],
	},
	item: {
		display: 'block',
		margin: [[space[1], 0, space[1], 0]],
		fontFamily: fontFamily.base,
		listStyle: 'none',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		cursor: 'pointer',
		fontSize: '15px',
		lineHeight: '18px',
		fontWeight: '500',
		color: '#141414',
	},
	itemLink: {
		color: '#141414 !important',
	},
	isChild: {
		[mq.small]: {
			display: 'inline-block',
			margin: [[0, space[1], 0, 0]],
		},
	},
	heading: {
		color: color.base,
		marginTop: space[1],
		fontFamily: fontFamily.base,
		fontWeight: 'bold',
	},
	isSelected: {
		color: '#0b68ff !important',
	},
});

interface ComponentsListRendererProps extends JssInjectedProps {
	items: Rsg.TOCItem[];
}

export const ComponentsListRenderer: React.FunctionComponent<ComponentsListRendererProps> = ({
	classes,
	items,
}) => {
	return (
		<ul className={classes.list}>
			{items.map(item => (
				<ComponentsListSectionRenderer key={item.slug} classes={classes} {...item} />
			))}
		</ul>
	);
};

const ComponentsListSectionRenderer: React.FunctionComponent<Rsg.TOCItem & JssInjectedProps> = ({
	classes,
	heading,
	visibleName,
	href,
	content,
	shouldOpenInNewTab,
	selected,
	initialOpen,
	forcedOpen,
}) => {
	const {
		config: { tocMode },
	} = useStyleGuideContext();

	// eslint-disable-next-line react-hooks/rules-of-hooks,@typescript-eslint/no-empty-function
	const [open, setOpen] = tocMode !== 'collapse' ? [true, (): void => {}] : React.useState(!!initialOpen);
	return (
		<li
			className={cx(classes.item, {
				[classes.isChild]: !content && !shouldOpenInNewTab,
				[classes.isSelected]: selected,
			})}
			key={href}
		>
			<Link
				className={cx([heading && classes.heading, selected && classes.isSelected, classes.itemLink])}
				href={href}
				onClick={(): void => setOpen(!open)}
				target={shouldOpenInNewTab ? '_blank' : undefined}
			>
				{visibleName}
			</Link>
			{open || forcedOpen ? content : null}
		</li>
	);
};

export default Styled<ComponentsListRendererProps>(styles)(ComponentsListRenderer);
