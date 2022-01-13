import * as React from 'react';

import Layout, { Page } from '@synerise/ds-layout';
import PageHeader from '@synerise/ds-page-header';
import Grid from '@synerise/ds-grid';
import Card from '@synerise/ds-card';
import LayoutAppMenu from './utils/AppMenu';
import LayoutNavbar from './utils/Navbar';
import LayoutFooter from './utils/Footer';
import * as S from './utils/Layout.styles';

const stories = {
  fullWidthWithCard: () => {
    return (
      <Page appMenu={<LayoutAppMenu />} navBar={<LayoutNavbar />}>
        <Layout header={<PageHeader title={'Page name'} onGoBack={() => {}} />}>
          <Grid>
            <Grid.Item xxl={24} xl={16} lg={12} md={8} sm={8} xs={4}>
              <Card>
                <S.Placeholder height={80} />
              </Card>
            </Grid.Item>
            <Grid.Item xxl={24} xl={16} lg={12} md={8} sm={8} xs={4}>
              <Card>
                <S.Placeholder />
              </Card>
            </Grid.Item>
          </Grid>
          <LayoutFooter />
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
