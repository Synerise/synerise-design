import * as React from 'react';

import Layout, { Page } from '@synerise/ds-layout';
import PageHeader from '@synerise/ds-page-header';
import Grid from '@synerise/ds-grid';
import Card from '@synerise/ds-card';
import LayoutAppMenu from './utils/AppMenu';
import LayoutNavbar from './utils/Navbar';
import * as S from './utils/Layout.styles';
import { boolean } from '@storybook/addon-knobs';

const stories = {
  leftSidebar: () => {
    const [leftOpened, setLeftOpened] = React.useState(true);

    return (
      <Page appMenu={<LayoutAppMenu />} navBar={<LayoutNavbar />}>
        <Layout
          renderLeftSidebarControls={boolean('Render left sidebar controls', true)}
          header={<PageHeader title={'Page name'} onGoBack={() => {}} />}
          left={{
            content: <S.Placeholder></S.Placeholder>,
            opened: leftOpened,
            onChange: setLeftOpened,
          }}
          sidebarAnimationDisabled={boolean('Disable sidebar animation', false)}
        >
          <Grid>
            <Grid.Item xxl={24} xl={16} lg={12} md={8} sm={8} xs={4}>
              <Card>
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
  name: 'Components/Layout/Layout',
  withoutCenter: true,
  stories,
  Component: Layout,
};
