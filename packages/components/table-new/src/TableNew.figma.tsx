// @ts-nocheck
import figma from '@figma/code-connect';

import { Table } from './Table';

const TABLE_URL =
  'https://www.figma.com/design/fsSZONXpVvtrDsCgtu01Jb/Synerise-Design-System?node-id=2322-39022&m=dev';

figma.connect(Table, TABLE_URL, {
  example: () => (
    <Table
      title="Results"
      data={[]}
      columns={[
        { accessorKey: 'name', header: 'Name' },
        { accessorKey: 'value', header: 'Value' },
      ]}
      selectionConfig={{
        onChange: () => {},
      }}
    />
  ),
});
