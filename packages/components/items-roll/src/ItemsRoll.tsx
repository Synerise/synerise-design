import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';

import Panel from '@synerise/ds-panel';

import * as S from './ItemsRoll.styles';
import { type ItemsRollProps } from './ItemsRoll.types';
import { Footer, Header, List } from './ItemsRollComponents';

export const ItemsRoll = ({
  actions,
  changeSelectionIcon,
  changeSelectionDropdownProps,
  className,
  customSidebarActions,
  groups,
  hideSearch,
  isDisabled,
  items,
  maxToShowItems = 10,
  onClearAll,
  onChangeSelection,
  onItemClick,
  onItemRemove,
  onSearchClear,
  onSearch,
  renderCount,
  searchValue,
  searchPlaceholder,
  showMoreStep = 10,
  style,
  texts,
  useFooter,
}: ItemsRollProps) => {
  const intl = useIntl();

  const defaultTexts = {
    changeSelectionLabel: intl.formatMessage({
      id: 'DS.ITEMS-ROLL.CHANGE-SELECTION',
    }),
    clearAllLabel: intl.formatMessage({ id: 'DS.ITEMS-ROLL.CLEAR-ALL' }),
    searchClearTooltipLabel: intl.formatMessage({
      id: 'DS.ITEMS-ROLL.CLEAR-TOOLTIP',
    }),
    itemsLabel: intl.formatMessage({ id: 'DS.ITEMS-ROLL.ITEMS' }),
    moreLabel: intl.formatMessage({ id: 'DS.ITEMS-ROLL.MORE' }),
    noResultsLabel: intl.formatMessage({ id: 'DS.ITEMS-ROLL.NO-RESULTS' }),
    popconfirmNoLabel: intl.formatMessage({ id: 'DS.ITEMS-ROLL.CONFIRM-NO' }),
    popconfirmTitleLabel: intl.formatMessage({
      id: 'DS.ITEMS-ROLL.CONFIRM-TITLE',
    }),
    popconfirmYesLabel: intl.formatMessage({ id: 'DS.ITEMS-ROLL.CONFIRM-YES' }),
    removeTooltipLabel: intl.formatMessage({
      id: 'DS.ITEMS-ROLL.REMOVE-TOOLTIP',
    }),
    showLabel: intl.formatMessage({ id: 'DS.ITEMS-ROLL.SHOW' }),
    showLessLabel: intl.formatMessage({ id: 'DS.ITEMS-ROLL.SHOW-LESS' }),
  };

  const allTexts = texts
    ? {
        ...defaultTexts,
        ...texts,
      }
    : defaultTexts;

  const [visibleItemsAmount, setVisibleItemsAmount] = useState(maxToShowItems);

  useEffect(() => {
    setVisibleItemsAmount(maxToShowItems);
  }, [maxToShowItems]);

  const showAdditionalItems = useCallback(() => {
    if (visibleItemsAmount + showMoreStep < items.length) {
      setVisibleItemsAmount(visibleItemsAmount + showMoreStep);
    } else {
      setVisibleItemsAmount(items.length);
    }
  }, [items.length, visibleItemsAmount, showMoreStep]);

  const visibleItems = useMemo(
    () =>
      visibleItemsAmount === items.length
        ? items
        : items.slice(0, visibleItemsAmount),
    [items, visibleItemsAmount],
  );

  const showDefaultItemsAmount = useCallback(() => {
    setVisibleItemsAmount(maxToShowItems);
  }, [maxToShowItems]);

  const itemsCount = useMemo(
    () =>
      renderCount ? (
        renderCount(items.length)
      ) : (
        <>
          {allTexts.itemsLabel}: <S.Bold>{items.length}</S.Bold>
        </>
      ),
    [allTexts.itemsLabel, items.length, renderCount],
  );

  return (
    <Panel
      style={style || {}}
      className={className || ''}
      data-testid="ds-items-roll"
      radius={3}
      p={12}
    >
      <Header
        actions={actions}
        allTexts={allTexts}
        changeSelectionIcon={changeSelectionIcon}
        changeSelectionDropdownProps={changeSelectionDropdownProps}
        customSidebarActions={customSidebarActions}
        hideSearch={hideSearch}
        itemsCount={itemsCount}
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
        onItemClick={onItemClick}
        onItemRemove={!isDisabled ? onItemRemove : undefined}
        noResultsLabel={allTexts.noResultsLabel}
        removeTooltipLabel={allTexts.removeTooltipLabel}
        searchValue={searchValue}
        visibleItems={visibleItems}
      />
      {useFooter && (
        <Footer
          searchMode={Boolean(searchValue)}
          allTexts={allTexts}
          itemsCount={items.length}
          maxToShowItems={maxToShowItems}
          onClearAll={!isDisabled ? onClearAll : undefined}
          showAdditionalItems={showAdditionalItems}
          showDefaultItemsAmount={showDefaultItemsAmount}
          showMoreStep={showMoreStep}
          visibleItemsCount={visibleItems.length}
        />
      )}
    </Panel>
  );
};
export default ItemsRoll;
