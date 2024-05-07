import * as React from 'react';

import Layout, { Page } from '@synerise/ds-layout';
import Grid from '@synerise/ds-grid';
import Card from '@synerise/ds-card';
import LayoutAppMenu from './utils/AppMenu';
import LayoutNavbar from './utils/Navbar';
import LayoutFooter from './utils/Footer';
import * as S from './utils/Layout.styles';
import PageHeader from '@synerise/ds-page-header';
import { boolean } from '@storybook/addon-knobs';

const stories = {
  bothSidebarWithSubHeader: () => {
    const [leftOpened, setLeftOpened] = React.useState(false);
    const [rightOpened, setRightOpened] = React.useState(false);

    return (
      <Page appMenu={<LayoutAppMenu />} navBar={<LayoutNavbar />}>
        <Layout
          nativeScroll={boolean('Use native scroll for main content', true)}
          left={{
            content: <S.Placeholder></S.Placeholder>,
            opened: leftOpened,
            onChange: setLeftOpened,
          }}
          right={{
            content: <S.Placeholder></S.Placeholder>,
            opened: rightOpened,
            onChange: setRightOpened,
          }}
          sidebarAnimationDisabled={boolean('Disable sidebar animation', false)}
          subheader={<PageHeader title={'Title'} bar={'subtitle'} />}
        >
          <Grid>
            <Grid.Item xxl={24} xl={16} lg={12} md={8} sm={8} xs={4}>
              <Card>
                <S.Placeholder height={1000} />
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
