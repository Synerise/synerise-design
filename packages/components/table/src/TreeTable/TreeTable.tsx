import classNames from 'classnames';
import React from 'react';
import { v4 as uuid } from 'uuid';

import Button from '@synerise/ds-button';
import { theme } from '@synerise/ds-core';
import '@synerise/ds-core/dist/js/style';
import Icon, { ChildRowLeftDownM } from '@synerise/ds-icon';

import DSTable from '../Table';
import { type DSTableProps } from '../Table.types';
import * as S from './TreeTable.styles';

const INDENT_SIZE = 42;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TreeTable<T extends object = any>(
  props: DSTableProps<T>,
): React.ReactElement {
  const { className, selection } = props;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const RenderRow = React.useCallback((row: any): JSX.Element => {
    return (
      <S.TreeTableRow className={`${row.className} ds-table-row`}>
        {row.children}
      </S.TreeTableRow>
    );
  }, []);

  const RenderCell = React.useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (cell: any): JSX.Element => {
      const indentLevel = cell.children[0]?.props?.children[0]?.props?.className
        .split(' ')
        .find((value: string) => value.includes('indent-level-'))
        ?.split('-')
        .pop();

      if (indentLevel === undefined) {
        return <td className={cell.className}>{cell.children}</td>;
      }

      const maxIndent = parseInt(indentLevel, 10);
      const indents = [...new Array(maxIndent)].map((indentElement, index) => (
        <S.Indent
          key={uuid()}
          width={INDENT_SIZE}
          level={index}
          active={index + 1 === maxIndent}
        />
      ));

      return (
        <S.TreeTableCell className={`${cell.className} ds-table-cell`}>
          <S.Indents
            width={indents.length * INDENT_SIZE}
            withSelection={Boolean(selection)}
          >
            {indents}
          </S.Indents>
          {cell.children}
        </S.TreeTableCell>
      );
    },
    [selection],
  );

  return (
    <DSTable
      {...props}
      indentSize={INDENT_SIZE}
      components={{
        body: {
          row: RenderRow,
          cell: RenderCell,
        },
      }}
      expandable={{
        expandIconColumnIndex: 0,
      }}
      expandIcon={(expandIconProps): React.ReactNode => {
        const { expandable, expanded, onExpand, record } = expandIconProps;
        return expandable ? (
          <S.RowExpander>
            <Button.Expander
              expanded={expanded}
              onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>): void =>
                onExpand(record, e)
              }
            />
          </S.RowExpander>
        ) : (
          <S.RowExpander>
            <Icon
              component={<ChildRowLeftDownM />}
              color={theme.palette['grey-400']}
            />
          </S.RowExpander>
        );
      }}
      className={classNames(className, 'ds-tree-table', {
        'ds-tree-table-with-selection': Boolean(selection),
      })}
    />
  );
}

export default TreeTable;
