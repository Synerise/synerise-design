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
  withGrid: () => {
    const transitionTime = number('Transition time', 100, { range: true, min: 1, max: 10000, step: 1 });
    const transitionName = select('Transition name', ['default', 'slide'], 'default');

    return (
      <Page appMenu={<LayoutAppMenu />} navBar={<LayoutNavbar />}>
        <Layout
          header={<PageHeader title={'Page name'} onGoBack={() => {}} />}
          transitionName={transitionName}
          transitionTime={transitionTime}
        >
          <Grid>
            <Grid.Item xxl={6} xl={4} lg={3} md={4} sm={4} xs={2} >
              <Card showContent>
                <S.Placeholder height={48} />
              </Card>
            </Grid.Item>
            <Grid.Item xxl={6} xl={4} lg={3} md={4} sm={4} xs={2} >
              <Card showContent>
                <S.Placeholder height={48} />
              </Card>
            </Grid.Item>
            <Grid.Item xxl={6} xl={4} lg={3} md={4} sm={4} xs={2} >
              <Card showContent>
                <S.Placeholder height={48} />
              </Card>
            </Grid.Item>
            <Grid.Item xxl={6} xl={4} lg={3} md={4} sm={4} xs={2} >
              <Card showContent>
                <S.Placeholder height={48} />
              </Card>
            </Grid.Item>
            <Grid.Item xxl={6} xl={4} lg={3} md={4} sm={4} xs={2} >
              <Card showContent>
                <S.Placeholder height={48} />
              </Card>
            </Grid.Item>
            <Grid.Item xxl={6} xl={4} lg={3} md={4} sm={4} xs={2} >
              <Card showContent>
                <S.Placeholder height={48} />
              </Card>
            </Grid.Item>
            <Grid.Item xxl={6} xl={4} lg={3} md={4} sm={4} xs={2} >
              <Card showContent>
                <S.Placeholder height={48} />
              </Card>
            </Grid.Item>
            <Grid.Item xxl={6} xl={4} lg={3} md={4} sm={4} xs={2} >
              <Card showContent>
                <S.Placeholder height={48} />
              </Card>
            </Grid.Item>
            <Grid.Item xxl={12} xl={8} lg={6} md={4} sm={4} xs={2} >
              <Card showContent>
                <S.Placeholder />
              </Card>
            </Grid.Item>
            <Grid.Item xxl={12} xl={8} lg={6} md={4} sm={4} xs={2} >
              <Card showContent>
                <S.Placeholder />
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
