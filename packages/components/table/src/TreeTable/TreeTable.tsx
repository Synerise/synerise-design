import * as React from 'react';
import '@synerise/ds-core/dist/js/style';

import classNames from 'classnames';
import { DSTableProps } from 'Table.types';
import Button from '@synerise/ds-button';
import Icon from '@synerise/ds-icon';
import { ChildRowLeftDownM } from '@synerise/ds-icon/dist/icons';
import DSTable from '../Table';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TreeTable<T extends object = any>(props: DSTableProps<T>): React.ReactElement {
  const { className } = props;

  return (
    <DSTable
      {...props}
      expandIcon={(expandIconProps): React.ReactNode => {
        const { expandable, expanded, onExpand, record } = expandIconProps;

        return expandable ? (
          <div className="ant-table-expander">
            <Button.Expander expanded={expanded} onClick={(e: MouseEvent): void => onExpand(record, e)} />
          </div>
        ) : (
          <div className="ant-table-expander">
            <Icon component={<ChildRowLeftDownM />} />
          </div>
        );
      }}
      className={classNames(className, 'ds-tree-table')}
    />
  );
}

export default TreeTable;
