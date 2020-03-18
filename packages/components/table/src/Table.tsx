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

export type AntTableProps<T> = Omit<TableProps<T>, 'title' | 'subTitle' | 'onSearch' | 'itemsMenu' | 'search'>;

export interface DSTableProps<T> extends AntTableProps<T> {
  title?: string | React.ReactNode;
  subTitle?: string | React.ReactNode;
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  itemsMenu?: string | React.ReactNode;
  search?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DSTable<T extends object = any>(props: DSTableProps<T>): React.ReactElement {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const { title, subTitle, onSearch, search, rowSelection, itemsMenu, pagination, dataSource } = props;
  useOnClickOutside(ref, () => {
    setIsSearchOpen(false);
  });

  const renderSelection = React.useCallback(
    (size: number): React.ReactNode => (
      <S.SelectionHeader>
        <S.Size>
          <b>{size}</b> selected
        </S.Size>
        {itemsMenu}
      </S.SelectionHeader>
    ),
    [itemsMenu]
  );

  const toggleSearch = React.useCallback((): void => {
    if (isSearchOpen === true) {
      return;
    }
    setIsSearchOpen(prevState => {
      return !prevState;
    });
  }, [isSearchOpen, setIsSearchOpen]);

  const renderTitle = React.useCallback(
    (): React.ReactNode => (
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
    ),
    [title, subTitle, onSearch, isSearchOpen, search, toggleSearch]
  );

  const renderHeader = React.useCallback((): React.ReactNode => {
    const size = rowSelection && rowSelection.selectedRowKeys && rowSelection.selectedRowKeys.length;
    return size ? renderSelection(size) : title && renderTitle();
  }, [rowSelection, title, renderSelection, renderTitle]);

  return (
    <div className="ds-table">
      {/* disable eslint to pass all antd table props */}
      {/* eslint-disable-next-line  react/jsx-props-no-spreading */}
      <Table<T> {...props} pagination={dataSource?.length ? pagination : false} title={renderHeader} />
    </div>
  );
}

export default DSTable;
