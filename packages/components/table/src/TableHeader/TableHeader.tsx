import * as React from 'react';
import * as S from '../Table.styles';
import FilterTrigger from '../FilterTrigger/FilterTrigger';
import { Filter } from '../Table.types';
import TableSelection from './TableSelection';
import { Props } from './TableHeader.types';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const TableHeader: React.FC<Props> = ({
  title,
  filters,
  searchComponent,
  filterComponent,
  selectedRows,
  itemsMenu,
  selection,
  dataSource,
  rowKey,
  withBorderTop,
  headerButton,
}) => {
  const renderLeftSide = React.useMemo(() => {
    return selectedRows && selectedRows > 0 ? (
      <S.Left>
        {selection && <TableSelection rowKey={rowKey} dataSource={dataSource} selection={selection} />}
        <S.Title>
          <strong>{selectedRows}</strong> selected
        </S.Title>
        {itemsMenu}
      </S.Left>
    ) : (
      <S.Left>
        {selection && <TableSelection rowKey={rowKey} dataSource={dataSource} selection={selection} />}
        {title && <S.Title>{title}</S.Title>}
      </S.Left>
    );
  }, [selectedRows, itemsMenu, title, dataSource, selection, rowKey]);

  return (
    <S.Header withBorderTop={withBorderTop}>
      {renderLeftSide}
      <S.Right>
        {headerButton}
        {filters?.map((filter: Filter) => (
          <FilterTrigger
            key={filter.key}
            name={filter.key}
            iconComponent={filter.icon}
            tooltips={filter.tooltips}
            openedLabel={filter.openedLabel}
            /* eslint-disable-next-line react/jsx-handler-names */
            handleClear={filter.handleClear}
            show={filter.show}
            showList={filter.showList}
            selected={filter.selected}
            disabled={filter.disabled}
          />
        ))}
        {filterComponent}
        {searchComponent}
      </S.Right>
    </S.Header>
  );
};

export default TableHeader;
