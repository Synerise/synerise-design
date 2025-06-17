import React from 'react';
import { Meta, StoryObj } from '@storybook/react-webpack5';

import Table from '@synerise/ds-table';

import { DATA, COLUMNS } from './Typography.data';

export default {
  title: 'tokens/Typography',
  render: () => (
    <div style={{ padding: 10 }}>
      <Table title={'Typography tokens'} columns={COLUMNS} dataSource={DATA} hideTitleBar></Table>
    </div>
  ),
} as Meta;

export const Overview: StoryObj = {};
