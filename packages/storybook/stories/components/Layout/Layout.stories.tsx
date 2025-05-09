import React, { useState } from 'react';
import type { StoryObj, Meta } from '@storybook/react';

import Layout, { Page, LayoutProps } from '@synerise/ds-layout';
import PageHeader from '@synerise/ds-page-header';
import Grid from '@synerise/ds-grid';
import Tabs from '@synerise/ds-tabs';
import Card from '@synerise/ds-card';
import Table from '@synerise/ds-table';

import LayoutAppMenu from './components/AppMenu';
import LayoutNavbar from './components/Navbar';
import LayoutFooter from './components/Footer';
import * as S from './components/Layout.styles';

import { BOOLEAN_CONTROL, centeredPaddedWrapper, CLASSNAME_ARG_CONTROL, NUMBER_CONTROL } from '../../utils';
import { fakeData } from './Layout.data';
import { SearchInput } from '@synerise/ds-search';

export default {
  title: 'Components/Layout',
  tags: ['autodocs'],
  component: Layout,
  decorators: [centeredPaddedWrapper],
  argTypes: {
    className: CLASSNAME_ARG_CONTROL,
    fillViewport: BOOLEAN_CONTROL,
    fullPage: BOOLEAN_CONTROL,
    leftSidebarWithDnd: BOOLEAN_CONTROL,
    mainSidebarWithDnd: BOOLEAN_CONTROL,
    nativeScroll: BOOLEAN_CONTROL,
    renderLeftSidebarControls: BOOLEAN_CONTROL,
    renderRightSidebarControls: BOOLEAN_CONTROL,
    viewportTopOffset: NUMBER_CONTROL
  },
  args: {},
} as Meta<LayoutProps>;

type Story = StoryObj<LayoutProps>;

export const BothSidebars: Story = {
  render: args => {
    const [leftOpened, setLeftOpened] = useState(false);
    const [rightOpened, setRightOpened] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    return (
      <Page appMenu={<LayoutAppMenu />} navBar={<LayoutNavbar />}>
        <Layout
          header={<PageHeader title={'Page name'} onGoBack={() => { }} />}
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
          {...args}
        >
          <Grid>
            <Grid.Item xxl={24} xl={16} lg={12} md={8} sm={8} xs={4}>
              <Card withoutPadding>
                <Table
                  title="Table with sorting"
                  dataSource={fakeData}
                  className='chromatic-ignore'
                  columns={[
                    {
                      key: 'name',
                      title: 'Name',
                      dataIndex: 'name',
                      sorter: {
                        compare: (a, b) => a.name.localeCompare(b.name),
                        multiple: 1,
                      },
                      sortRender: 'string',
                      defaultSortOrder: 'ascend',
                    },
                    {
                      key: 'company',
                      title: 'Company',
                      dataIndex: 'company',
                      sorter: {
                        compare: (a, b) => a.company.localeCompare(b.company),
                        multiple: 2,
                      },
                      sortRender: 'string',
                    },
                    {
                      key: 'transactionValue',
                      title: 'Transaction value',
                      dataIndex: 'transactionValue',
                      sorter: {
                        compare: (a, b) => a.transactionValue - b.transactionValue,
                        multiple: 3,
                      },
                      sortRender: 'default',
                    },
                    {
                      key: 'transactionType',
                      title: 'Transaction type',
                      dataIndex: 'transactionType',
                      sorter: {
                        compare: (a, b) => a.transactionType.localeCompare(b.transactionType),
                        multiple: 4,
                      },
                      sortRender: 'string',
                    },
                  ]}
                  pagination={{
                    pageSize: 10,
                  }}
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

export const BothSidebarWithSubHeader: Story = {
  render: args => {
    const [leftOpened, setLeftOpened] = useState(false);
    const [rightOpened, setRightOpened] = useState(false);

    return (
      <Page appMenu={<LayoutAppMenu />} navBar={<LayoutNavbar />}>
        <Layout
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
          subheader={<PageHeader title={'Title'} bar={'subtitle'} />}
          {...args}
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

export const BothSidebarWithoutHeader: Story = {
  render: args => {
    const [leftOpened, setLeftOpened] = useState(false);
    const [rightOpened, setRightOpened] = useState(false);

    return (
      <Page appMenu={<LayoutAppMenu />} navBar={<LayoutNavbar />}>
        <Layout
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
          {...args}
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

export const FullWidthWithCard: Story = {
  render: args => {
    return (
      <Page appMenu={<LayoutAppMenu />} navBar={<LayoutNavbar />}>
        <Layout header={<PageHeader title={'Page name'} onGoBack={() => { }} />} {...args}>
          <Grid>
            <Grid.Item xxl={24} xl={16} lg={12} md={8} sm={8} xs={4}>
              <Card>
                <S.Placeholder height={80} />
              </Card>
            </Grid.Item>
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

export const WithGrid: Story = {
  render: args => {
    return (
      <Page appMenu={<LayoutAppMenu />} navBar={<LayoutNavbar />}>
        <Layout header={<PageHeader title={'Page name'} onGoBack={() => { }} />} {...args}>
          <Grid>
            <Grid.Item xxl={6} xl={4} lg={3} md={4} sm={4} xs={2}>
              <Card>
                <S.Placeholder height={48} />
              </Card>
            </Grid.Item>
            <Grid.Item xxl={6} xl={4} lg={3} md={4} sm={4} xs={2}>
              <Card>
                <S.Placeholder height={48} />
              </Card>
            </Grid.Item>
            <Grid.Item xxl={6} xl={4} lg={3} md={4} sm={4} xs={2}>
              <Card>
                <S.Placeholder height={48} />
              </Card>
            </Grid.Item>
            <Grid.Item xxl={6} xl={4} lg={3} md={4} sm={4} xs={2}>
              <Card>
                <S.Placeholder height={48} />
              </Card>
            </Grid.Item>
            <Grid.Item xxl={6} xl={4} lg={3} md={4} sm={4} xs={2}>
              <Card>
                <S.Placeholder height={48} />
              </Card>
            </Grid.Item>
            <Grid.Item xxl={6} xl={4} lg={3} md={4} sm={4} xs={2}>
              <Card>
                <S.Placeholder height={48} />
              </Card>
            </Grid.Item>
            <Grid.Item xxl={6} xl={4} lg={3} md={4} sm={4} xs={2}>
              <Card>
                <S.Placeholder height={48} />
              </Card>
            </Grid.Item>
            <Grid.Item xxl={6} xl={4} lg={3} md={4} sm={4} xs={2}>
              <Card>
                <S.Placeholder height={48} />
              </Card>
            </Grid.Item>
            <Grid.Item xxl={12} xl={8} lg={6} md={4} sm={4} xs={2}>
              <Card>
                <S.Placeholder />
              </Card>
            </Grid.Item>
            <Grid.Item xxl={12} xl={8} lg={6} md={4} sm={4} xs={2}>
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

export const LeftSidebar: Story = {
  render: args => {
    const [leftOpened, setLeftOpened] = useState(true);

    return (
      <Page appMenu={<LayoutAppMenu />} navBar={<LayoutNavbar />}>
        <Layout
          header={<PageHeader title={'Page name'} onGoBack={() => { }} />}
          left={{
            content: <S.Placeholder></S.Placeholder>,
            opened: leftOpened,
            onChange: setLeftOpened,
          }}
          {...args}
        >
          <Grid>
            <Grid.Item xxl={24} xl={16} lg={12} md={8} sm={8} xs={4}>
              <Card>
                <S.Placeholder height={1000} />
              </Card>
            </Grid.Item>
          </Grid>
        </Layout>
      </Page>
    );
  },
};

export const RightSidebar: Story = {
  render: args => {
    const [rightOpened, setRightOpened] = useState(false);
    return (
      <Page appMenu={<LayoutAppMenu />} navBar={<LayoutNavbar />}>
        <Layout
          header={<PageHeader title={'Page name'} onGoBack={() => { }} />}
          right={{
            content: <S.Placeholder></S.Placeholder>,
            opened: rightOpened,
            onChange: setRightOpened,
          }}
          {...args}
        >
          <Grid>
            <Grid.Item xxl={24} xl={16} lg={12} md={8} sm={8} xs={4}>
              <Card>
                <S.Placeholder height={1000} />
              </Card>
            </Grid.Item>
          </Grid>
        </Layout>
      </Page>
    );
  },
};
export const WithoutMenuAndNavigation: Story = {
  render: args => {
    return (
      <Page>
        <Layout header={<PageHeader title={'Page name'} onClose={() => { }} />} {...args}>
          <Grid>
            <Grid.Item xxl={24} xl={16} lg={12} md={8} sm={8} xs={4}>
              test
            </Grid.Item>
          </Grid>
        </Layout>
      </Page>
    );
  },
  args: {
    fullPage: true,
  },
};

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

export const WithContentWrapper: Story = {
  render: args => {
    return (
      <Page appMenu={<LayoutAppMenu />} navBar={<LayoutNavbar />}>
        <Layout
          header={
            <PageHeader
              title={'Page name'}
              onGoBack={() => { }}
              tabs={<Tabs tabs={tabs} activeTab={1} handleTabClick={console.log} />}
            />
          }
          {...args}
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

const FullWidth: Story = {
  render: args => {
    return (
      <Page appMenu={<LayoutAppMenu />} navBar={<LayoutNavbar />}>
        <Layout header={<PageHeader title={'Page name'} onGoBack={() => { }} />} {...args}>
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
