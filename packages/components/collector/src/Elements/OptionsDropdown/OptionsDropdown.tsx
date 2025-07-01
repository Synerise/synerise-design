import React, {
  type SyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';

import Divider from '@synerise/ds-divider';
import Icon, { Add3M } from '@synerise/ds-icon';
import ListItem from '@synerise/ds-list-item';
import Scrollbar from '@synerise/ds-scrollbar';
import SearchItems from '@synerise/ds-search/dist/Elements/SearchItems/SearchItems';

import * as S from '../../Collector.styles';
import { type CollectorValue } from '../../Collector.types';
import NavigationHint from '../NavigationHint/NavigationHint';
import { type OptionsDropdownProps } from './OptionsDropdown.types';

const getRowHeight = (size?: string) => {
  if (size === 'large') {
    return 54;
  }
  return 32;
};

const OptionsDropdown = ({
  showAddButton,
  options,
  visible,
  value,
  onSelect,
  onClick,
  width,
  onItemAdd,
  showNavigationHints,
  lookupKey,
  texts,
  customContent,
  renderItem,
  dropdownItemHeight,
  scrollbarProps,
  listHeader,
}: OptionsDropdownProps) => {
  const [scrollTop, setScrollTop] = useState(0);
  useEffect(() => {
    setScrollTop(0);
  }, [visible]);
  const renderItemFn = useCallback(
    (itemValue: CollectorValue) => {
      return renderItem ? (
        renderItem(itemValue)
      ) : (
        <ListItem tabIndex={-1} size={dropdownItemHeight} key={`${itemValue}`}>
          {itemValue[lookupKey]}
        </ListItem>
      );
    },
    [lookupKey, renderItem, dropdownItemHeight],
  );
  const shouldRenderList = !!options?.length;
  return (
    <S.DropdownWrapper onClick={onClick} data-testid="ds-collector-dropdown">
      {visible &&
        (customContent ? (
          <S.CustomContentWrapper>{customContent}</S.CustomContentWrapper>
        ) : (
          <S.DropdownContent>
            {listHeader}
            <Scrollbar
              absolute
              onScroll={({ currentTarget }: SyntheticEvent): void => {
                setScrollTop(currentTarget.scrollTop);
              }}
              {...scrollbarProps}
            >
              {showAddButton && onItemAdd && !!value && (
                <S.DropdownTop>
                  <S.DropdownAddButton
                    onClick={(): void => {
                      onItemAdd && onItemAdd(value);
                    }}
                    type="ghost"
                    mode="icon-label"
                  >
                    <Icon component={<Add3M />} />
                    <span>{texts?.add}</span>
                    <strong>{value}</strong>
                  </S.DropdownAddButton>
                  {shouldRenderList && (
                    <S.DividerContainer>
                      <Divider dashed />
                    </S.DividerContainer>
                  )}
                </S.DropdownTop>
              )}
              {shouldRenderList && (
                <SearchItems
                  data={options}
                  highlight={value as string}
                  visibleRows={6}
                  onItemClick={onSelect}
                  itemRender={renderItemFn}
                  rowHeight={getRowHeight(dropdownItemHeight)}
                  width={width}
                  listProps={{ scrollTop }}
                  renderInMenu={false}
                />
              )}
            </Scrollbar>
            {showNavigationHints && <NavigationHint texts={texts} />}
          </S.DropdownContent>
        ))}
    </S.DropdownWrapper>
  );
};

export default OptionsDropdown;
