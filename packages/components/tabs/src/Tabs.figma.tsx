// @ts-nocheck
import figma from '@figma/code-connect';

import Tabs from './Tabs';

const TABS_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=289-4858&m=dev';

figma.connect(Tabs, TABS_URL, {
  variant: { 'Behavior Type': 'Default' },
  example: () => (
    <Tabs
      activeTab={0}
      handleTabClick={() => {}}
      tabs={[
        { label: 'Tab First' },
        { label: 'Tab Second' },
        { label: 'Tab Third' },
      ]}
    />
  ),
});

figma.connect(Tabs, TABS_URL, {
  variant: { 'Behavior Type': 'Stacked' },
  example: () => (
    <Tabs
      activeTab={0}
      handleTabClick={() => {}}
      block
      tabs={[
        { label: 'Tab First' },
        { label: 'Tab Second' },
        { label: 'Tab Third' },
      ]}
    />
  ),
});
