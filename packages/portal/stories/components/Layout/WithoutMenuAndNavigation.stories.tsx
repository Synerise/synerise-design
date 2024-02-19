import * as React from 'react';
import { boolean } from '@storybook/addon-knobs';
import Layout, { Page } from '@synerise/ds-layout';
import PageHeader from '@synerise/ds-page-header';
import Grid from '@synerise/ds-grid';

const stories = {
  withoutMenuAndNavigation: () => {
    return (
      <Page>
        <Layout
          useNativeScroll={boolean('Use native scroll for main content', true)}
          header={<PageHeader title={'Page name'} onClose={() => {}} />} 
          fullPage={true}
        >
          <Grid>
            <Grid.Item xxl={24} xl={16} lg={12} md={8} sm={8} xs={4}>
              test
            </Grid.Item>
          </Grid>
        </Layout>
      </Page>
    );
  },
};

export default {
  name: 'Components/Layout/Layout',
  withoutCenter: true,
  stories,
  Component: Layout,
};
