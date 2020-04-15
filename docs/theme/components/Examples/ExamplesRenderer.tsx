import React from 'react';
import Styled, { JssInjectedProps } from 'rsg-components/Styled';

const styles = (): object => ({
	// Just default jss-isolate rules
	root: {},
});

interface ExamplesRendererProps extends JssInjectedProps {
	children?: React.ReactNode;
	name?: string;
}

export const ExamplesRenderer: React.FunctionComponent<ExamplesRendererProps> = ({
	classes,
	name,
	children,
}) => {
	return (
		<article className={classes.root} data-testid={`${name}-examples`}>
			{children}
		</article>
	);
};

export default Styled<ExamplesRendererProps>(styles)(ExamplesRenderer);
