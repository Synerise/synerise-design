import * as React from 'react';
import range from 'lodash/range';
import { boolean, number } from '@storybook/addon-knobs';

import Layout from '@synerise/ds-layout';
import PageHeader from '@synerise/ds-page-header';

const MultilineContent = ({ heading, lines = 8 }) => (
  <React.Fragment>
    <strong>{heading}</strong>
    {range(lines).map(i => (
      <div key={i}>line of content...</div>
    ))}
  </React.Fragment>
);

const stories = {
  default: () => {
    const [leftOpened, setLeftOpened] = React.useState(false);
    const [rightOpened, setRightOpened] = React.useState(false);
    const showHeader = boolean('Show header', true);
    const showLeft = boolean('Show left', true);
    const showRight = boolean('Show right', true);
    const showSubheader = boolean('Show subheader', true);
    const leftLines = number('Left lines', 24, { range: true, min: 0, max: 256, step: 1 });
    const rightLines = number('Right lines', 24, { range: true, min: 0, max: 256, step: 1 });
    const contentLines = number('Content lines', 24, { range: true, min: 0, max: 256, step: 1 });

    return (
      <div style={{ border: '1px dashed gray', height: 440 }}>
        <Layout
          header={
            showHeader && (
              <div>
                <PageHeader title={'Layout header'} />
              </div>
            )
          }
          left={
            showLeft && {
              content: (
                <div style={{ padding: 24 }}>
                  <MultilineContent heading="Layout left sidebar" lines={leftLines} />
                </div>
              ),
              opened: leftOpened,
              onChange: setLeftOpened,
            }
          }
          right={
            showRight && {
              content: (
                <div style={{ padding: 24 }}>
                  <MultilineContent heading="Layout right sidebar" lines={rightLines} />
                </div>
              ),
              opened: rightOpened,
              onChange: setRightOpened,
            }
          }
          sidebarAnimationDisabled={boolean('Disable sidebar animation', false)}
          subheader={showSubheader && <PageHeader title={'Layout subheader'} bar={'Description'} />}
        >
          <div style={{ padding: 24 }}>
            <MultilineContent heading="Layout content" lines={contentLines} />
          </div>
        </Layout>
      </div>
    );
  },
};

export default {
  name: 'Components/Layout/Layout',
  withoutCenter: true,
  stories,
  Component: Layout,
};
