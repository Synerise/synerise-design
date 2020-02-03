import * as React from 'react';
import '@synerise/ds-core/dist/js/style';
import { Input } from '@synerise/ds-input';
import Table, { TableProps } from 'antd/lib/table';

import './style/index.less';
import Icon from '@synerise/ds-icon';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import SearchM from '@synerise/ds-icon/dist/icons/SearchM';
import { useOnClickOutside } from '@synerise/ds-utils';
import * as S from './Table.styles';

export type AntTableProps<T> = Pick<
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

export interface DSTableProps<T> extends AntTableProps<T> {
  title?: string | React.ReactNode;
  subTitle?: string | React.ReactNode;
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  itemsMenu?: string | React.ReactNode;
  search?: string;
}

const DSTable: <T>(p: DSTableProps<T>) => React.ReactElement<DSTableProps<T>> = props => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  useOnClickOutside(ref, () => {
    setIsSearchOpen(false);
  });

  const renderSelection = (size: number): React.ReactNode => {
    const { itemsMenu } = props;
    return (
      <S.SelectionHeader>
        <S.Size>
          <b>{size}</b> selected
        </S.Size>
        {itemsMenu}
      </S.SelectionHeader>
    );
  };

  const toggleSearch = (): void => {
    if (isSearchOpen === true) {
      return;
    }
    setIsSearchOpen(prevState => {
      return !prevState;
    });
  };

  const renderTitle = (): React.ReactNode => {
    const { title, subTitle, onSearch, search } = props;
    return (
      <S.Header>
        <S.Left>
          {title && <S.Title>{title}</S.Title>}
          {subTitle && <S.SubTitle>{subTitle}</S.SubTitle>}
        </S.Left>
        <S.Right>
          {onSearch && (
            <S.InputWrapper isOpen={isSearchOpen} searchValue={search}>
              <S.Icon>
                <Icon color={theme.palette['grey-600']} component={<SearchM />} size={24} />
              </S.Icon>
              <S.Input onClick={toggleSearch} ref={ref} isOpen={isSearchOpen}>
                <Input value={search} onChange={onSearch} />
              </S.Input>
            </S.InputWrapper>
          )}
        </S.Right>
      </S.Header>
    );
  };

  const renderHeader = (): React.ReactNode => {
    const { rowSelection, title } = props;
    const size = rowSelection && rowSelection.selectedRowKeys && rowSelection.selectedRowKeys.length;
    return size ? renderSelection(size) : title && renderTitle();
  };

  return (
    <div className="ds-table">
      {/* disable eslint to pass all antd table props */}
      <Table {...props} title={renderHeader} /> {/* eslint-disable-line  react/jsx-props-no-spreading */}
    </div>
  );
};

export default DSTable;
