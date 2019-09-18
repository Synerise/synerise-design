import * as React from 'react';
import range from 'lodash/range';
import { storiesOf } from '@storybook/react';
import { boolean, number, select } from '@storybook/addon-knobs/react';
import { DSProvider } from '@synerise/ds-core';

import Layout from '@synerise/ds-layout';
import PageHeader from '@synerise/ds-page-header';

const MultilineContent = ({heading, lines = 8}) => (
    <React.Fragment>
        <strong>{heading}</strong>
        {range(lines).map(i => (
            <div key={i}>line of content...</div>
        ))}
    </React.Fragment>
);


const stories = storiesOf('Components|Layout', module);

stories.add('default', () => {
    const showHeader = boolean('Show header', true);
    const showLeft = boolean('Show left', true);
    const showRight = boolean('Show right', true);
    const transitionTime = number('Transition time', 100, { range: true, min: 1, max: 10000, step: 1 });
    const transitionName = select('Transition name', ['default', 'slide'], 'default');
    const leftLines = number('Left lines', 24, { range: true, min: 0, max: 256, step: 1 });
    const rightLines = number('Right lines', 24, { range: true, min: 0, max: 256, step: 1 });
    const contentLines = number('Content lines', 24, { range: true, min: 0, max: 256, step: 1 });
    return (
        <div style={{ border: '1px dashed gray', height: 440 }}>
            <DSProvider code="en_GB">
                <Layout
                    header={
                        showHeader && (
                            <div>
                                <PageHeader title={'Layout header'} />
                            </div>
                        )
                    }
                    left={
                        showLeft && (
                            <div style={{ padding: 24 }}>
                                <MultilineContent heading="Layout left sidebar" lines={leftLines} />
                            </div>
                        )
                    }
                    right={
                        showRight && (
                            <div style={{ padding: 24 }}>
                                <MultilineContent heading="Layout right sidebar" lines={rightLines} />
                            </div>
                        )
                    }
                    transitionName={transitionName}
                    transitionTime={transitionTime}
                >
                    <div style={{ padding: 24 }}>
                        <MultilineContent heading="Layout content" lines={contentLines} />
                    </div>
                </Layout>
            </DSProvider>
        </div>
    );
});

export default stories;
