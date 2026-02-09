import React, { type ReactNode } from 'react';

import type { DSTableProps } from '@synerise/ds-table';

export type MockTableProps = DSTableProps<Record<string, unknown>> & {
  'data-testid'?: string;
};

const getDataIndex = (
  dataIndex: string | number | readonly (string | number)[] | undefined,
): string => {
  if (Array.isArray(dataIndex)) {
    return dataIndex.join('.');
  }
  return String(dataIndex ?? '');
};

export const mockTable = () => {
  jest.mock('@synerise/ds-table', () => ({
    __esModule: true,
    default: jest.fn(
      ({
        dataSource = [],
        columns = [],
        loading,
        rowKey = 'key',
        onRow,
        rowSelection,
        title,
        'data-testid': dataTestId,
      }: MockTableProps) => {
        const testId = dataTestId || 'ds-table';

        const getRowKey = (record: Record<string, unknown>, index: number) => {
          if (typeof rowKey === 'function') {
            return rowKey(record);
          }
          return String(record[rowKey] ?? index);
        };

        const renderTitle = (t: MockTableProps['title']): ReactNode => {
          if (typeof t === 'function') {
            return null;
          }
          return t as ReactNode;
        };

        const renderColumnTitle = (colTitle: unknown): ReactNode => {
          if (typeof colTitle === 'function') {
            return null;
          }
          return colTitle as ReactNode;
        };

        return (
          <div data-testid={testId} className="ds-table" data-loading={loading}>
            {title && (
              <div data-testid={`${testId}-title`}>{renderTitle(title)}</div>
            )}
            {loading ? (
              <div data-testid={`${testId}-loading`}>Loading...</div>
            ) : (
              <table>
                <thead>
                  <tr data-testid={`${testId}-header`}>
                    {rowSelection && <th>Select</th>}
                    {columns.map(
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      (col: any, idx: number) => (
                        <th
                          key={col.key || idx}
                          data-testid={`${testId}-header-${getDataIndex(col.dataIndex as string | number | readonly (string | number)[] | undefined) || idx}`}
                        >
                          {renderColumnTitle(col.title)}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {dataSource.map(
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (record: any, rowIndex: number) => {
                      const key = getRowKey(record, rowIndex);
                      const rowProps = onRow?.(record, rowIndex);

                      return (
                        <tr
                          key={key}
                          data-testid={`${testId}-row-${rowIndex}`}
                          onClick={rowProps?.onClick}
                        >
                          {rowSelection && (
                            <td>
                              <input
                                type="checkbox"
                                data-testid={`${testId}-checkbox-${rowIndex}`}
                                checked={rowSelection.selectedRowKeys?.includes(
                                  key,
                                )}
                                onChange={() => {
                                  const newKeys =
                                    rowSelection.selectedRowKeys?.includes(key)
                                      ? rowSelection.selectedRowKeys.filter(
                                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                          (k: any) => k !== key,
                                        )
                                      : [
                                          ...(rowSelection.selectedRowKeys ||
                                            []),
                                          key,
                                        ];
                                  rowSelection.onChange?.(newKeys, [], {
                                    type: 'all',
                                  });
                                }}
                              />
                            </td>
                          )}
                          {columns.map(
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            (col: any, colIndex: number) => {
                              const dataIdx = getDataIndex(
                                col.dataIndex as
                                  | string
                                  | number
                                  | readonly (string | number)[]
                                  | undefined,
                              );
                              const cellValue = record[dataIdx];
                              const rendered = col.render
                                ? col.render(cellValue, record, rowIndex)
                                : cellValue;

                              return (
                                <td
                                  key={col.key || colIndex}
                                  data-testid={`${testId}-cell-${rowIndex}-${colIndex}`}
                                >
                                  {String(rendered ?? '')}
                                </td>
                              );
                            },
                          )}
                        </tr>
                      );
                    },
                  )}
                </tbody>
              </table>
            )}
          </div>
        );
      },
    ),
  }));
};

export const mockTableMinimal = () => {
  jest.mock('@synerise/ds-table', () => ({
    __esModule: true,
    default: jest.fn(() => null),
  }));
};
