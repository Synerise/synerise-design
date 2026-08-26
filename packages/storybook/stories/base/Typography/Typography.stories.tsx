import React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';
import { Table, legacyColumnConfigAdapter } from '@synerise/ds-table-new';

import { COLUMNS, DATA } from './Typography.data';

export default {
  title: 'tokens/Typography',
  render: () => (
    <div style={{ padding: 10 }}>
      <Table
        title={'Typography tokens'}
        columns={legacyColumnConfigAdapter(COLUMNS)}
        data={DATA}
        hideTitleBar
        // legacy ds-table defaulted pagination to off; ds-table-new defaults it on
        pagination={false}
      />
    </div>
  ),
} as Meta;

export const Overview: StoryObj = {};
