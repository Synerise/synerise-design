import * as React from 'react';

import Layout, { Page } from '@synerise/ds-layout';
import PageHeader from '@synerise/ds-page-header';
import Grid from '@synerise/ds-grid';
import Card from '@synerise/ds-card';
import LayoutAppMenu from './utils/AppMenu';
import LayoutNavbar from './utils/Navbar';
import * as S from './utils/Layout.styles';
import Tabs from '@synerise/ds-tabs';

const tabs = [
  {
    label: 'Tab first',
  },
  {
    label: 'Tab second',
  },
  {
    label: 'Tab Third',
  },
];

const stories = {
  withContentWrapper: () => {
    return (
      <Page appMenu={<LayoutAppMenu />} navBar={<LayoutNavbar />}>
        <Layout
          header={
            <PageHeader
              title={'Page name'}
              onGoBack={() => {}}
              tabs={<Tabs tabs={tabs} activeTab={1} handleTabClick={console.log} />}
            />
          }
          transitionTime={transitionTime}
          transitionName={transitionName}
        >
          <Grid style={{ paddingTop: 122 }}>
            <Grid.Item xxl={16} xl={12} lg={12} md={8} sm={8} xs={4} contentWrapper>
              <Card>
                <S.Placeholder height={80} />
              </Card>
              <Card>
                <S.Placeholder height={80} />
              </Card>
              <Card>
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
  name: 'Components/Layout/Layout',
  withoutCenter: true,
  stories,
  Component: Layout,
};
