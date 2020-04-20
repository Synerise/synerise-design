import * as React from 'react';
import Icon from '@synerise/ds-icon';
import { SearchM } from '@synerise/ds-icon/dist/icons';
import { ChangeEvent } from 'react';
import * as S from '../Table.styles';
import FilterTrigger from '../FilterTrigger/FilterTrigger';
import { Filter, RowSelection } from '../Table.types';
import TableSelection from './TableSelection';

interface Props<T extends { key: React.ReactText }> {
  title?: React.ReactNode;
  filters?: Filter[];
  onSearch?: (e: ChangeEvent<HTMLInputElement>) => void;
  selectedRows?: number;
  itemsMenu: React.ReactNode;
  selection?: RowSelection<T>;
  dataSource: T[];
}
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const TableHeader: React.FC<Props> = ({ title, filters, onSearch, selectedRows, itemsMenu, selection, dataSource }) => {
  const renderLeftSide = React.useMemo(() => {
    return selectedRows && selectedRows > 0 ? (
      <S.Left>
        {selection && <TableSelection dataSource={dataSource} selection={selection} />}
        <S.Title>
          <strong>{selectedRows}</strong> selected
        </S.Title>
        {itemsMenu}
      </S.Left>
    ) : (
      <S.Left>
        {selection && <TableSelection dataSource={dataSource} selection={selection} />}
        {title && <S.Title>{title}</S.Title>}
      </S.Left>
    );
  }, [selectedRows, itemsMenu, title, dataSource, selection]);

  return (
    <S.Header>
      {renderLeftSide}
      <S.Right>
        {filters?.map((filter: Filter) => (
          <FilterTrigger
            key={filter.key}
            iconComponent={filter.icon}
            tooltips={filter.tooltips}
            /* eslint-disable-next-line react/jsx-handler-names */
            handleClear={filter.handleClear}
            show={filter.show}
            showList={filter.showList}
            selected={filter.selected}
          />
        ))}
        {onSearch && <Icon component={<SearchM />} />}
      </S.Right>
    </S.Header>
  );
};

export default TableHeader;
