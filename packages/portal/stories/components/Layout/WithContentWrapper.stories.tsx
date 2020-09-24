import * as React from 'react';
import { number, select } from '@storybook/addon-knobs';

import Layout, { Page } from '@synerise/ds-layout';
import PageHeader from '@synerise/ds-page-header';
import Grid from '@synerise/ds-grid';
import Card from '@synerise/ds-card';
import LayoutAppMenu from './utils/AppMenu';
import LayoutNavbar from './utils/Navbar';
import * as S from './utils/Layout.styles';

const stories = {
  withContentWrapper: () => {
    const transitionTime = number('Transition time', 100, { range: true, min: 1, max: 10000, step: 1 });
    const transitionName = select('Transition name', ['default', 'slide'], 'default');

    return (
      <Page appMenu={<LayoutAppMenu />} navBar={<LayoutNavbar />}>
        <Layout
          header={<PageHeader title={'Page name'} onGoBack={() => {}} />}
          transitionTime={transitionTime}
          transitionName={transitionName}
        >
          <Grid style={{ paddingTop: 122 }}>
            <Grid.Item xxl={16} xl={12} lg={12} md={8} sm={8} xs={3} contentWrapper >
              <Card showContent>
                <S.Placeholder height={80} />
              </Card>
              <Card showContent>
                <S.Placeholder height={80} />
              </Card>
              <Card showContent>
                <S.Placeholder height={80} />
              </Card>
            </Grid.Item>
          </Grid>
        </Layout>
      </Page>
    );
  },
};

export default {
  name: 'Layout/Layout',
  withoutCenter: true,
  stories,
  Component: Layout,
};
