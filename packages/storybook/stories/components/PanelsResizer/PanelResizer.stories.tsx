import React from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';

import { PanelsResizer } from '@synerise/ds-panels-resizer';

const LeftContent = () => (
  <div style={{ height: '100%', padding: '24px', background: '#e0f7fa' }}>
    <h2>Left Panel</h2>
    <p>This is the content of the left panel.</p>
  </div>
);

const RightContent = () => (
  <div style={{ height: '100%', padding: '24px', background: '#ffebee' }}>
    <h2>Right Panel</h2>
    <p>This is the content of the right panel.</p>
  </div>
);

const LongContent = () => (
  <div style={{ padding: '24px', background: '#f3e5f5' }}>
    <h2>Long text</h2>
    <p>
      {Array.from({ length: 100 }, (_, i) => (
        <span key={i}>Text line {i + 1}. </span>
      ))}
    </p>
  </div>
);

const meta: Meta<typeof PanelsResizer> = {
  title: 'Components/PanelsResizer',
  tags: ['autodocs'],
  component: PanelsResizer,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    scrollable: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
  },
};
export default meta;

type Story = StoryObj<typeof PanelsResizer>;

export const Default: Story = {
  args: {
    scrollable: false,
  },
  render: ({ scrollable }) => (
    <div style={{ height: '600px', width: '800px' }}>
      <PanelsResizer leftPanel={<LeftContent />} rightPanel={<RightContent />} scrollable={scrollable} />
    </div>
  ),
};

export const LeftPanelInitialWidth: Story = {
  args: {
    initial: { leftPanel: 300 },
    scrollable: false,
  },
  render: ({ scrollable, initial }) => (
    <div style={{ height: '600px', width: '800px' }}>
      <PanelsResizer
        initial={initial}
        leftPanel={<LeftContent />}
        rightPanel={<RightContent />}
        scrollable={scrollable}
      />
    </div>
  ),
};

export const RightPanelInitialWidth: Story = {
  args: {
    initial: { rightPanel: 300 },
    scrollable: false,
  },
  render: ({ scrollable, initial }) => (
    <div style={{ height: '600px', width: '800px' }}>
      <PanelsResizer
        initial={initial}
        leftPanel={<LeftContent />}
        rightPanel={<RightContent />}
        scrollable={scrollable}
      />
    </div>
  ),
};

export const ScrollablePanels: Story = {
  args: {
    scrollable: true,
  },
  render: ({ scrollable }) => (
    <div style={{ height: '300px', width: '800px' }}>
      <PanelsResizer leftPanel={<LongContent />} rightPanel={<LongContent />} scrollable={scrollable} />
    </div>
  ),
};
