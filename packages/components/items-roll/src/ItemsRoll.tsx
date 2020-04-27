import * as React from 'react';
import { injectIntl } from 'react-intl';

import { Footer, Header, List } from './ItemsRollComponents';
import * as S from './ItemsRoll.styles';
import { ItemsRollProps } from './ItemsRoll.types';

const ItemsRoll: React.FC<ItemsRollProps> = ({
  actions,
  changeSelectionIcon,
  className,
  groups,
  intl,
  items,
  maxToShowItems = 10,
  onClearAll,
  onChangeSelection,
  onSearchClear,
  onSearch,
  searchValue,
  searchPlaceholder,
  showMoreStep = 10,
  style,
  texts,
  useFooter,
  useVirtualizedList,
  virtualizedRowWidth,
  virtualizedRowHeight,
}) => {
  const defaultTexts = {
    changeSelectionLabel: intl.formatMessage({ id: 'DS.ITEMS-ROLL.CHANGE-SELECTION' }),
    clearAllLabel: intl.formatMessage({ id: 'DS.ITEMS-ROLL.CLEAR-ALL' }),
    searchClearTooltipLabel: intl.formatMessage({ id: 'DS.ITEMS-ROLL.CLEAR-TOOLTIP' }),
    itemsLabel: intl.formatMessage({ id: 'DS.ITEMS-ROLL.ITEMS' }),
    moreLabel: intl.formatMessage({ id: 'DS.ITEMS-ROLL.MORE' }),
    noResultsLabel: intl.formatMessage({ id: 'DS.ITEMS-ROLL.NO-RESULTS' }),
    removeTooltipLabel: intl.formatMessage({ id: 'DS.ITEMS-ROLL.REMOVE-TOOLTIP' }),
    showLabel: intl.formatMessage({ id: 'DS.ITEMS-ROLL.SHOW' }),
    showLessLabel: intl.formatMessage({ id: 'DS.ITEMS-ROLL.SHOW-LESS' }),
  };

  const allTexts = texts
    ? {
        ...defaultTexts,
        ...texts,
      }
    : defaultTexts;

  const [visibleItemsAmount, setVisibleItemsAmount] = React.useState(maxToShowItems);

  React.useEffect(() => {
    setVisibleItemsAmount(maxToShowItems);
  }, [maxToShowItems]);

  const showAdditionalItems = React.useCallback(() => {
    if (visibleItemsAmount + showMoreStep < items.length) {
      setVisibleItemsAmount(visibleItemsAmount + showMoreStep);
    } else {
      setVisibleItemsAmount(items.length);
    }
  }, [items.length, visibleItemsAmount, showMoreStep]);

  const visibleItems = React.useMemo(
    () => (visibleItemsAmount === items.length ? items : items.slice(0, visibleItemsAmount)),
    [items, visibleItemsAmount]
  );

  const showDefaultItemsAmount = React.useCallback(() => {
    setVisibleItemsAmount(maxToShowItems);
  }, [maxToShowItems]);

  return (
    <S.Wrapper style={style || {}} className={className || ''} data-testid="ds-items-roll">
      <Header
        actions={actions}
        allTexts={allTexts}
        changeSelectionIcon={changeSelectionIcon}
        itemsCount={items.length}
        onChangeSelection={onChangeSelection}
        onSearch={onSearch}
        onSearchClear={onSearchClear}
        searchValue={searchValue}
        searchPlaceholder={searchPlaceholder}
      />
      <S.Divider dashed />
      <List
        groups={groups}
        items={items}
        noResultsLabel={allTexts.noResultsLabel}
        removeTooltipLabel={allTexts.removeTooltipLabel}
        searchValue={searchValue}
        useVirtualizedList={useVirtualizedList}
        visibleItems={visibleItems}
        virtualizedRowHeight={virtualizedRowHeight}
        virtualizedRowWidth={virtualizedRowWidth}
      />
      {useFooter && (
        <Footer
          allTexts={allTexts}
          itemsCount={items.length}
          maxToShowItems={maxToShowItems}
          onClearAll={onClearAll}
          showAdditionalItems={showAdditionalItems}
          showDefaultItemsAmount={showDefaultItemsAmount}
          showMoreStep={showMoreStep}
          visibleItemsCount={visibleItems.length}
        />
      )}
    </S.Wrapper>
  );
};

export default injectIntl(ItemsRoll);
