import * as React from 'react';
import Scrollbar from '@synerise/ds-scrollbar';
import SearchItems from '@synerise/ds-search/dist/Elements/SearchItems/SearchItems';

import Icon, { Add3M } from '@synerise/ds-icon';

import Divider from '@synerise/ds-divider';
import ListItem from '@synerise/ds-list-item';
import * as S from '../../Collector.styles';
import { OptionsDropdownProps } from './OptionsDropdown.types';
import NavigationHint from '../NavigationHint/NavigationHint';
import { CollectorValue } from '../../Collector.types';

const gerRowHeight = (size?: string): number => {
  if (size === 'large') return 54;
  return 32;
};

const OptionsDropdown: React.FC<OptionsDropdownProps> = ({
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
}: OptionsDropdownProps) => {
  const [scrollTop, setScrollTop] = React.useState<number>(0);
  React.useEffect(() => {
    setScrollTop(0);
  }, [visible]);
  const renderItemFn = React.useCallback(
    (itemValue: CollectorValue) => {
      return renderItem ? (
        renderItem(itemValue)
      ) : (
        <ListItem tabIndex={-1} size={dropdownItemHeight} key={`${itemValue}`}>
          {itemValue[lookupKey]}
        </ListItem>
      );
    },
    [lookupKey, renderItem, dropdownItemHeight]
  );
  const shouldRenderList = !!options?.length;
  return (
    <S.DropdownWrapper onClick={onClick}>
      {visible &&
        (customContent ? (
          <S.CustomContentWrapper>{customContent}</S.CustomContentWrapper>
        ) : (
          <S.DropdownContent>
            <Scrollbar
              absolute
              onScroll={({ currentTarget }: React.SyntheticEvent): void => {
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
                  rowHeight={gerRowHeight(dropdownItemHeight)}
                  width={width}
                  listProps={{ scrollTop }}
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
