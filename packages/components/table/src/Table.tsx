import * as React from 'react';
import '@synerise/ds-core/dist/js/style';
import { Input } from '@synerise/ds-input';
import Table, { TableProps } from 'antd/lib/table';

import * as S from './Table.styles';
import './style/index.less';

type AntTableProps<T> = Pick<
  TableProps<T>,
  | 'loading'
  | 'footer'
  | 'style'
  | 'scroll'
  | 'size'
  | 'children'
  | 'className'
  | 'prefixCls'
  | 'locale'
  | 'getPopupContainer'
  | 'onChange'
  | 'dataSource'
  | 'expandIcon'
  | 'tableLayout'
  | 'columns'
  | 'bordered'
  | 'bodyStyle'
  | 'pagination'
  | 'rowKey'
  | 'dropdownPrefixCls'
  | 'rowSelection'
  | 'components'
  | 'rowClassName'
  | 'expandedRowRender'
  | 'defaultExpandAllRows'
  | 'defaultExpandedRowKeys'
  | 'expandedRowKeys'
  | 'expandIconAsCell'
  | 'expandIconColumnIndex'
  | 'expandRowByClick'
  | 'onExpandedRowsChange'
  | 'onExpand'
  | 'indentSize'
  | 'onRowClick'
  | 'onRow'
  | 'onHeaderRow'
  | 'useFixedHeader'
  | 'showHeader'
  | 'childrenColumnName'
  | 'sortDirections'
>;

interface DSTableProps<T> extends AntTableProps<T> {
  title?: string | React.ReactNode;
  subTitle?: string | React.ReactNode;
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  itemsMenu?: string | React.ReactNode;
  search?: string;
}

class DSTable<T> extends React.Component<DSTableProps<T>> {
  renderHeader = (): React.ReactNode => {
    const { rowSelection } = this.props;
    const size = rowSelection && rowSelection.selectedRowKeys && rowSelection.selectedRowKeys.length;
    return size ? this.renderSelection(size) : this.renderTitle();
  };

  renderSelection = (size: number): React.ReactNode => {
    const { itemsMenu } = this.props;
    return (
      <S.SelectionHeader>
        <S.Size>
          <b>{size}</b> selected
        </S.Size>
        {itemsMenu}
      </S.SelectionHeader>
    );
  };

  renderTitle = (): React.ReactNode => {
    const { title, subTitle, onSearch, search } = this.props;
    return (
      <S.Header>
        <S.Left>
          {title && <S.Title>{title}</S.Title>}
          {subTitle && <S.SubTitle>{subTitle}</S.SubTitle>}
        </S.Left>
        <S.Right>{onSearch && <Input value={search} onChange={onSearch} />}</S.Right>
      </S.Header>
    );
  };

  render(): React.ReactNode {
    return (
      <div>
        {/* disable eslint to pass all antd table props */}
        <Table {...this.props} title={this.renderHeader} /> {/* eslint-disable-line  react/jsx-props-no-spreading */}
      </div>
    );
  }
}

export default DSTable;
