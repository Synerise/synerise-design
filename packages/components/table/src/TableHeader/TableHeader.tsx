import * as React from 'react';
import Tooltip from '@synerise/ds-tooltip';
import { useDataFormat } from '@synerise/ds-data-format';
import * as S from '../Table.styles';
import FilterTrigger from '../FilterTrigger/FilterTrigger';
import { Filter } from '../Table.types';
import TableSelection from './TableSelection';
import { Props } from './TableHeader.types';
import { TableLimit } from './TableLimit';

const isTruncated = (element?: HTMLElement): boolean | undefined =>
  element && element.offsetWidth < element.scrollWidth;

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
  locale,
  renderSelectionTitle,
  hideTitlePart,
}) => {
  const { formatValue } = useDataFormat();
  const titleRef = React.useRef<HTMLElement>(null);
  const [isTitleTruncated, setIsTitleTruncated] = React.useState<boolean>(false);

  React.useEffect(() => {
    const isElementTruncated = isTruncated(titleRef.current || undefined);

    if (isElementTruncated !== undefined && isElementTruncated !== isTitleTruncated) {
      setIsTitleTruncated(isElementTruncated);
    }
  }, [titleRef, isTitleTruncated, title]);

  const renderLeftSide = React.useMemo(() => {
    if (selection?.limit)
      return <TableLimit total={dataSource.length} selection={selection} itemsMenu={itemsMenu} locale={locale} />;
    return selectedRows && selectedRows > 0 ? (
      <S.Left data-testid="ds-table-selection">
        {selection && <TableSelection rowKey={rowKey} dataSource={dataSource} selection={selection} locale={locale} />}
        {renderSelectionTitle ? (
          renderSelectionTitle(selection, filters)
        ) : (
          <S.TitleContainer>
            <S.TitlePart>
              <strong>{formatValue(selectedRows)}</strong> <span>{locale.selected}</span>
            </S.TitlePart>
          </S.TitleContainer>
        )}
        {itemsMenu}
      </S.Left>
    ) : (
      <S.Left data-testid="ds-table-title">
        {selection && <TableSelection rowKey={rowKey} dataSource={dataSource} selection={selection} locale={locale} />}
        <S.TitleContainer>
          {title && (
            <>
              <S.TitlePartEllipsis>
                {isTitleTruncated ? (
                  <Tooltip type="largeSimple" description={title} offset="small" autoAdjustOverflow>
                    <strong ref={titleRef}>{title}</strong>
                  </Tooltip>
                ) : (
                  <strong ref={titleRef}>{title}</strong>
                )}
              </S.TitlePartEllipsis>
              {!hideTitlePart && <S.TitleSeparator />}
            </>
          )}
          {!hideTitlePart && (
            <S.TitlePart>
              <strong>{formatValue(dataSource.length)}</strong> <span>{locale.pagination.items}</span>
            </S.TitlePart>
          )}
        </S.TitleContainer>
      </S.Left>
    );
  }, [
    selection,
    dataSource,
    itemsMenu,
    locale,
    selectedRows,
    rowKey,
    renderSelectionTitle,
    filters,
    formatValue,
    title,
    isTitleTruncated,
    hideTitlePart,
  ]);

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
