import React from 'react';
import Sidebar from '@synerise/ds-sidebar';

const mockContent =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, aut consectetur ex harum in';

const panelsData = [
  { header: 'First name', id: '1' },
  { header: 'Second name', id: '2' },
  { header: 'Third name', id: '3' },
];

export const createSidebarPanels = () =>
  panelsData.map(panel => (
    <Sidebar.Panel header={panel.header} id={panel.id} key={panel.id}>
      {mockContent}
    </Sidebar.Panel>
  ));

export const createPanel = (header, id) => (
  <Sidebar.Panel header={header} id={id} key={id}>
    {mockContent}
  </Sidebar.Panel>
);

export const SIDEBAR_WITH_BUTTON_DATA = [
    { text: 'Item 1' },
    { text: 'Item 2' },
    { text: 'Item 3' },
  ];
  