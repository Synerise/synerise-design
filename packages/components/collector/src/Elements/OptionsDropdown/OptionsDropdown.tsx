import * as React from 'react';
import Scrollbar from '@synerise/ds-scrollbar';
import SearchItems from '@synerise/ds-search/dist/Elements/SearchItems/SearchItems';
import Menu from '@synerise/ds-menu';
import { Add3M } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import Divider from '@synerise/ds-divider';
import * as S from '../../Collector.styles';
import { OptionsDropdownProps } from './OptionsDropdown.types';
import NavigationHint from '../NavigationHint/NavigationHint';
import { CollectorValue } from '../../Collector.types';

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
}: OptionsDropdownProps) => {
  const [scrollTop, setScrollTop] = React.useState<number>(0);
  React.useEffect(() => {
    setScrollTop(0);
  }, [visible]);
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
                  {options?.length > 0 && (
                    <S.DividerContainer>
                      <Divider dashed />
                    </S.DividerContainer>
                  )}
                </S.DropdownTop>
              )}
              <SearchItems
                data={options}
                highlight={value as string}
                visibleRows={6}
                onItemClick={onSelect}
                itemRender={(val: CollectorValue): React.ReactElement => (
                  <Menu.Item key={`${val}`}>{val[lookupKey]}</Menu.Item>
                )}
                rowHeight={32}
                width={width}
                listProps={{ scrollTop }}
              />
            </Scrollbar>
            {showNavigationHints && <NavigationHint texts={texts} />}
          </S.DropdownContent>
        ))}
    </S.DropdownWrapper>
  );
};

export default OptionsDropdown;
