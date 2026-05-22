// @ts-nocheck
import figma from '@figma/code-connect';

import Sidebar from './Sidebar';

const SIDEBAR_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=2656-46632&m=dev';

figma.connect(Sidebar, SIDEBAR_URL, {
  variant: { '📌 State': 'Default collapsed' },
  props: {
    headerText: figma.string('✏️ Header Text'),
    content: figma.instance('Content'),
  },
  example: ({ headerText, content }) => (
    <Sidebar>
      <Sidebar.Panel id="panel-1" header={headerText}>
        {content}
      </Sidebar.Panel>
    </Sidebar>
  ),
});

figma.connect(Sidebar, SIDEBAR_URL, {
  variant: { '📌 State': 'Expanded' },
  props: {
    headerText: figma.string('✏️ Header Text'),
    content: figma.instance('Content'),
  },
  example: ({ headerText, content }) => (
    <Sidebar defaultActiveKey={['panel-1']}>
      <Sidebar.Panel id="panel-1" header={headerText}>
        {content}
      </Sidebar.Panel>
    </Sidebar>
  ),
});

figma.connect(Sidebar, SIDEBAR_URL, {
  variant: { '📌 State': 'Draggable' },
  props: {
    headerText: figma.string('✏️ Header Text'),
    content: figma.instance('Content'),
  },
  example: ({ headerText, content }) => (
    <Sidebar order={['panel-1']} onChangeOrder={() => {}}>
      <Sidebar.Panel id="panel-1" header={headerText}>
        {content}
      </Sidebar.Panel>
    </Sidebar>
  ),
});

figma.connect(Sidebar, SIDEBAR_URL, {
  variant: { '📌 State': 'Grabbed' },
  props: {
    headerText: figma.string('✏️ Header Text'),
    content: figma.instance('Content'),
  },
  example: ({ headerText, content }) => (
    <Sidebar order={['panel-1']} onChangeOrder={() => {}}>
      <Sidebar.Panel id="panel-1" header={headerText}>
        {content}
      </Sidebar.Panel>
    </Sidebar>
  ),
});

figma.connect(Sidebar, SIDEBAR_URL, {
  variant: { '📌 State': 'Placeholder' },
  props: {
    headerText: figma.string('✏️ Header Text'),
    content: figma.instance('Content'),
  },
  example: ({ headerText, content }) => (
    <Sidebar order={['panel-1']} onChangeOrder={() => {}}>
      <Sidebar.Panel id="panel-1" header={headerText}>
        {content}
      </Sidebar.Panel>
    </Sidebar>
  ),
});
