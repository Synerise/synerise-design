import React from 'react';

import { Meta, StoryObj } from '@storybook/react-webpack5';
import Tray, { type TrayProps } from '@synerise/ds-tray';

import { TrayStory, type TrayStoryType } from './Tray.data';

export default {
  component: Tray,
  title: 'Components/Tray',
  tags: [],
  decorators: [(Story) => <div style={{ minHeight: '700px' }}>{Story()}</div>],
  parameters: {
    layout: 'padded',
  },
  args: {},
  argsTypes: {},
} as Meta<TrayProps>;

export const Default: StoryObj<TrayStoryType> = {
  parameters: {
    docs: {
      source: {
        code: `
import React from 'react';
import Tray, { TrayProvider, useTray } from '@synerise/ds-tray';

const TrayTrigger = () => {
  const { open, close } = useTray();

  const openTray = () => {
    open('my-tray', {
      title: 'Details',
      content: <div>Tray content</div>,
      headerRightSide: <span>Extra</span>,
      footer: <div><button onClick={() => close('my-tray')}>Close</button></div>,
      onClose: (id) => console.log('closed', id),
    });
  };

  return <button onClick={openTray}>Open tray</button>;
};

const App = () => (
  <TrayProvider>
    {/* mount tray(s) that will be controlled via context */}
    <Tray id="my-tray" />
    {/* other app UI */}
    <TrayTrigger />
  </TrayProvider>
);
`,
      },
    },
  },
  render: (args) => {
    return <TrayStory {...args} />;
  },
};
export const Opened: StoryObj<TrayStoryType> = {
  ...Default,
  args: {
    autoOpen: true,
  },
};
