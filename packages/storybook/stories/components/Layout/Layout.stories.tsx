import React, { useRef, useState } from 'react';

import { faker } from '@faker-js/faker';
import type { Meta, StoryObj } from '@storybook/react-webpack5';


import Card from '@synerise/ds-card';
import Grid from '@synerise/ds-grid';
import Layout, { LayoutProps, Page } from '@synerise/ds-layout';
import PageHeader from '@synerise/ds-page-header';
import { SearchInput } from '@synerise/ds-search';
import Table from '@synerise/ds-table';
import Tabs from '@synerise/ds-tabs';
import { useStickyScroll } from '@synerise/ds-utils';

import { Placeholder } from '../../constants';
import {
  BOOLEAN_CONTROL,
  CLASSNAME_ARG_CONTROL,
  NUMBER_CONTROL,
  centeredPaddedWrapper,
} from '../../utils';
import { fakeData } from './Layout.data';
import LayoutAppMenu from './components/AppMenu';
import LayoutFooter from './components/Footer';
import * as S from './components/Layout.styles';
import LayoutNavbar from './components/Navbar';

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
    viewportTopOffset: NUMBER_CONTROL,
  },
  args: {},
} as Meta<LayoutProps>;

type Story = StoryObj<LayoutProps>;

export const BothSidebars: Story = {
  render: (args) => {
    const [leftOpened, setLeftOpened] = useState(false);
    const [rightOpened, setRightOpened] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    return (
      <Page appMenu={<LayoutAppMenu />} navBar={<LayoutNavbar />}>
        <Layout
          header={<PageHeader title={'Page name'} onGoBack={() => {}} />}
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
                  className="chromatic-ignore"
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
                        compare: (a, b) =>
                          a.transactionValue - b.transactionValue,
                        multiple: 3,
                      },
                      sortRender: 'default',
                    },
                    {
                      key: 'transactionType',
                      title: 'Transaction type',
                      dataIndex: 'transactionType',
                      sorter: {
                        compare: (a, b) =>
                          a.transactionType.localeCompare(b.transactionType),
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
  render: (args) => {
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
  render: (args) => {
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
  render: (args) => {
    return (
      <Page appMenu={<LayoutAppMenu />} navBar={<LayoutNavbar />}>
        <Layout
          header={<PageHeader title={'Page name'} onGoBack={() => {}} />}
          {...args}
        >
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
  render: (args) => {
    return (
      <Page appMenu={<LayoutAppMenu />} navBar={<LayoutNavbar />}>
        <Layout
          header={<PageHeader title={'Page name'} onGoBack={() => {}} />}
          {...args}
        >
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
  render: (args) => {
    const [leftOpened, setLeftOpened] = useState(true);

    return (
      <Page appMenu={<LayoutAppMenu />} navBar={<LayoutNavbar />}>
        <Layout
          header={<PageHeader title={'Page name'} onGoBack={() => {}} />}
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
  render: (args) => {
    const [rightOpened, setRightOpened] = useState(false);
    return (
      <Page appMenu={<LayoutAppMenu />} navBar={<LayoutNavbar />}>
        <Layout
          header={<PageHeader title={'Page name'} onGoBack={() => {}} />}
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
  render: (args) => {
    return (
      <Page>
        <Layout
          header={<PageHeader title={'Page name'} onClose={() => {}} />}
          {...args}
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
  render: (args) => {
    return (
      <Page appMenu={<LayoutAppMenu />} navBar={<LayoutNavbar />}>
        <Layout
          header={
            <PageHeader
              title={'Page name'}
              onGoBack={() => {}}
              tabs={
                <Tabs tabs={tabs} activeTab={1} handleTabClick={console.log} />
              }
            />
          }
          {...args}
        >
          <Grid style={{ paddingTop: 122 }}>
            <Grid.Item
              xxl={16}
              xl={12}
              lg={12}
              md={8}
              sm={8}
              xs={4}
              contentWrapper
            >
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

export const FullWidth: Story = {
  render: (args) => {
    return (
      <Page appMenu={<LayoutAppMenu />} navBar={<LayoutNavbar />}>
        <Layout
          header={<PageHeader title={'Page name'} onGoBack={() => {}} />}
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

export const StickyScrollSidebar: StoryObj<
  LayoutProps & { paragraphs?: number }
> = {
  tags: ['internal'],
  argTypes: {
    paragraphs: NUMBER_CONTROL,
  },
  parameters: {
    controls: {
      include: ['paragraphs'],
    },
  },
  render: ({ paragraphs = 20, ...args }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const stickyRef = useStickyScroll({ scrollContainerRef });

    return (
      <Page appMenu={<LayoutAppMenu />} navBar={<LayoutNavbar />}>
        <Layout
          header={
            <PageHeader title={'Sticky Scroll Demo'} onGoBack={() => {}} />
          }
          {...args}
          nativeScroll
          nativeScrollRef={scrollContainerRef}
        >
          <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
            <Placeholder $height={120} />
            <Placeholder $height={120} />
            <Placeholder $height={120} />
            <Placeholder $height={120} />
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            {/* Left column — simulates a virtual list with many items */}
            <div style={{ flex: '1 1 50%' }}>
              {Array.from({ length: 100 }, (_, i) => (
                <Card key={i} style={{ marginBottom: 8 }}>
                  <div style={{ padding: 16 }}>Row {i + 1}</div>
                </Card>
              ))}
            </div>

            {/* Right column — sticky scroll behavior */}
            <div style={{ flex: '1 1 50%' }}>
              <div ref={stickyRef} className="chromatic-ignore">
                <Card>{faker.lorem.paragraphs(paragraphs)}</Card>
              </div>
            </div>
          </div>
        </Layout>
      </Page>
    );
  },
};
