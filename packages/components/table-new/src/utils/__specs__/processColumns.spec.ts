import { type ColumnDef } from '@tanstack/react-table';

import { SELECTION_COLUMN_ID } from '../../Table.const';
import { type TableTexts } from '../../Table.types';
import { processColumns } from '../processColumns';

const mockTexts = {} as TableTexts;

const mockColumns: ColumnDef<{ id: string }, string>[] = [
  { id: 'col1', accessorKey: 'id', header: 'ID' },
  { id: 'col2', accessorKey: 'name', header: 'Name' },
];

describe('processColumns', () => {
  it('should return columns unchanged when selection is false', () => {
    const result = processColumns(mockColumns, false, mockTexts);
    expect(result).toEqual(mockColumns);
    expect(result).toHaveLength(2);
  });

  it('should prepend selection column when selection is true', () => {
    const result = processColumns(mockColumns, true, mockTexts);
    expect(result).toHaveLength(3);
    expect(result[0].id).toBe(SELECTION_COLUMN_ID);
  });

  it('should set selection column size to 64', () => {
    const result = processColumns(mockColumns, true, mockTexts);
    expect(result[0].size).toBe(64);
    expect(result[0].minSize).toBe(64);
    expect(result[0].maxSize).toBe(64);
  });

  it('should keep original columns after selection column', () => {
    const result = processColumns(mockColumns, true, mockTexts);
    expect(result[1]).toEqual(mockColumns[0]);
    expect(result[2]).toEqual(mockColumns[1]);
  });
});
