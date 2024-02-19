import * as React from 'react';
import { boolean, number, select, text } from '@storybook/addon-knobs';
import faker from 'faker';

import Layout, { Page } from '@synerise/ds-layout';
import PageHeader from '@synerise/ds-page-header';
import Grid from '@synerise/ds-grid';
import Card from '@synerise/ds-card';
import LayoutAppMenu from './utils/AppMenu';
import LayoutNavbar from './utils/Navbar';
import LayoutFooter from './utils/Footer';
import * as S from './utils/Layout.styles';
import { action } from '@storybook/addon-actions';
import Table from '@synerise/ds-table/dist/Table';
import { SearchInput } from '@synerise/ds-search/dist/Elements';

const companies = new Array(10).fill('').map(() => faker.company.companyName());

const fakeData = new Array(50).fill({}).map((v, i) => ({
  id: String(i),
  name: faker.name.findName(),
  company: companies[Math.floor(Math.random() * 10)],
  transactionValue: faker.finance.amount(),
  transactionType: faker.finance.transactionType(),
}));

const sortRenderTypes: ['string', 'default'] = ['string', 'default'];

const stories = {
  bothSidebar: () => {
    const [leftOpened, setLeftOpened] = React.useState(false);
    const [rightOpened, setRightOpened] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');

    return (
      <Page appMenu={<LayoutAppMenu />} navBar={<LayoutNavbar />}>
        <Layout
          useNativeScroll={boolean('Use native scroll for main content', true)}
          header={<PageHeader title={'Page name'} onGoBack={() => {}} />}
          renderLeftSidebarControls={boolean('Render left sidebar controls', true)}
          renderRightSidebarControls={boolean('Render right sidebar controls', true)}
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
        >
          <Grid>
            <Grid.Item xxl={24} xl={16} lg={12} md={8} sm={8} xs={4}>
              <Card withoutPadding>
                <Table
                  title={text('Table title', 'Table with sorting')}
                  dataSource={fakeData}
                  columns={[
                    {
                      key: 'name',
                      title: 'Name',
                      dataIndex: 'name',
                      sorter: {
                        compare: (a, b) => a.name.localeCompare(b.name),
                        multiple: number('Multiple sort order', 1, { min: 1, max: 4 }, 'Name'),
                      },
                      sortRender: select('Sort render type', sortRenderTypes, 'string', 'Name'),
                      defaultSortOrder: 'ascend',
                    },
                    {
                      key: 'company',
                      title: 'Company',
                      dataIndex: 'company',
                      sorter: {
                        compare: (a, b) => a.company.localeCompare(b.company),
                        multiple: number('Multiple sort order', 2, { min: 1, max: 4 }, 'Company'),
                      },
                      sortRender: select('Sort render type', sortRenderTypes, 'string', 'Company'),
                    },
                    {
                      key: 'transactionValue',
                      title: 'Transaction value',
                      dataIndex: 'transactionValue',
                      sorter: {
                        compare: (a, b) => a.transactionValue - b.transactionValue,
                        multiple: number('Multiple sort order', 3, { min: 1, max: 4 }, 'Transaction value'),
                      },
                      sortRender: select('Sort render type', sortRenderTypes, 'default', 'Transaction value'),
                    },
                    {
                      key: 'transactionType',
                      title: 'Transaction type',
                      dataIndex: 'transactionType',
                      sorter: {
                        compare: (a, b) => a.transactionType.localeCompare(b.transactionType),
                        multiple: number('Multiple sort order', 4, { min: 1, max: 4 }, 'Transaction type'),
                      },
                      sortRender: select('Sort render type', sortRenderTypes, 'string', 'Transaction type'),
                    },
                  ]}
                  pagination={{
                    pageSize: 10,
                  }}
                  onSort={action('handleSort')}
                  searchComponent={
                    <SearchInput
                      onClear={() => setSearchQuery('')}
                      clearTooltip={'Clear'}
                      onChange={setSearchQuery}
                      value={searchQuery}
                      placeholder={'Search...'}
                    />
                  }
                />
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
