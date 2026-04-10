import React, { ReactNode, useRef, useState } from 'react';

import type { Decorator } from '@storybook/react-vite';
import Layout, { Page } from '@synerise/ds-layout';
import PageHeader from '@synerise/ds-page-header';
import { VirtualTable, type VirtualTableProps } from '@synerise/ds-table-new';

import LayoutAppMenu from '../../Layout/components/AppMenu';
import LayoutNavbar from '../../Layout/components/Navbar';

export const ListLayout = (args: Partial<VirtualTableProps<any, any>>) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <Page appMenu={<LayoutAppMenu />} navBar={<LayoutNavbar />}>
      <Layout
        header={<PageHeader title={'Page name'} onGoBack={() => {}} />}
        nativeScroll
        nativeScrollRef={scrollContainerRef}
        renderLeftSidebarControls
        left={{
          content: <div></div>,
          opened: sidebarOpen,
          onChange: setSidebarOpen,
        }}
      >
        <div>
          <div>
            <VirtualTable {...args} scrollElementRef={scrollContainerRef} />
          </div>
        </div>
      </Layout>
    </Page>
  );
};
