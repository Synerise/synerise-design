// @ts-nocheck

import React from 'react';
import Styled, { JssInjectedProps } from 'rsg-components/Styled';
import * as Rsg from '../../../typings';

const styles = ({ color, fontSize, space }: Rsg.Theme): Record<string, object> => ({
	root: {
		marginBottom: space[6],
		borderBottom: '1px solid #e9edee'
	},
	header: {
		marginBottom: space[3],
	},
	tabs: {
		marginBottom: space[3],
	},
	tabButtons: {
		marginBottom: space[1],
	},
	tabBody: {
		overflowX: 'auto',
		maxWidth: '100%',
		WebkitOverflowScrolling: 'touch',
	},
	docs: {
		color: color.base,
		fontSize: fontSize.text,
	},
});

interface ReactComponentRendererProps extends JssInjectedProps {
	name: string;
	heading: React.ReactNode;
	filepath?: string;
	slug?: string;
	pathLine?: string;
	tabButtons?: React.ReactNode;
	tabBody?: React.ReactNode;
	description?: React.ReactNode;
	docs?: React.ReactNode;
	examples?: React.ReactNode;
	isolated?: boolean;
}

export const ReactComponentRenderer: React.FunctionComponent<ReactComponentRendererProps> = ({
	classes,
	name,
	heading,
	description,
	docs,
	examples,
	tabButtons,
	tabBody,
}) => {
	return (
		<div className={classes.root} data-testid={`${name}-container`}>
			<header className={classes.header}>
				{heading}
			</header>
			{(description || docs) && (
				<div className={classes.docs}>
					{description}
					{docs}
				</div>
			)}
			{examples}
			{tabButtons && (
				<div className={classes.tabs}>
					<div className={classes.tabButtons}>{tabButtons}</div>
					<div className={classes.tabBody}>{tabBody}</div>
				</div>
			)}
		</div>
	);
};

export default Styled<ReactComponentRendererProps>(styles)(ReactComponentRenderer);
