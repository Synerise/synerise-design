import * as React from 'react';
import range from 'lodash/range';
import { boolean, number, select } from '@storybook/addon-knobs';

import Layout from '@synerise/ds-layout';
import PageHeader from '@synerise/ds-page-header';
import LayoutAppMenu from './AppMenu';
import LayoutNavbar from './Navbar';

const MultilineContent = ({heading, lines = 8}) => (
  <React.Fragment>
    <strong>{heading}</strong>
    {range(lines).map(i => (
      <div key={i}>line of content...</div>
    ))}
  </React.Fragment>
);

const stories = {
  fullWidth: () => {
    const showHeader = boolean('Show header', true);
    const showLeft = boolean('Show left', true);
    const showRight = boolean('Show right', true);
    const transitionTime = number('Transition time', 100, { range: true, min: 1, max: 10000, step: 1 });
    const transitionName = select('Transition name', ['default', 'slide'], 'default');
    const leftLines = number('Left lines', 24, { range: true, min: 0, max: 256, step: 1 });
    const rightLines = number('Right lines', 24, { range: true, min: 0, max: 256, step: 1 });
    const contentLines = number('Content lines', 24, { range: true, min: 0, max: 256, step: 1 });

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        height: '100vh',
        backgroundColor: 'rgb(243, 245, 246)',
        overflowY: 'hidden'
      }}>
        <LayoutNavbar />
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', width: '100%'}}>
          <div style={{width: 64, position: 'relative', zIndex: 1200, height: '100%'}}>
            <LayoutAppMenu top={56} />
          </div>
          <div style={{width: 'calc(100% - 64px)', display: 'flex', flexDirection: 'column'}}>
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
          </div>
        </div>
      </div>
    );
  },
};

export default {
  name: 'Components/Layout',
  withoutCenter: true,
  stories,
  Component: Layout,
};
