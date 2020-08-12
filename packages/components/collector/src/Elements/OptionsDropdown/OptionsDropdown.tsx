import * as React from 'react';
import Scrollbar from '@synerise/ds-scrollbar';
import SearchItems from '@synerise/ds-search/dist/Elements/SearchItems/SearchItems';
import Menu from '@synerise/ds-menu';
import { Add3M } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import Divider from '@synerise/ds-divider';
import * as S from '../../Collector.styles';
import { OptionsDropdownProps } from './OptionsDropdown.types';

const OptionsDropdown: React.FC<OptionsDropdownProps> = ({
  options,
  visible,
  value,
  onSelect,
  onClick,
  width,
  texts,
}: OptionsDropdownProps) => {
  const [scrollTop, setScrollTop] = React.useState<number>(0);
  React.useEffect(() => {
    setScrollTop(0);
  }, [visible]);
  return (
    <S.DropdownWrapper onClick={onClick}>
      {visible && (
        <S.DropdownContent>
          <Scrollbar
            absolute
            onScroll={({ currentTarget }: React.SyntheticEvent): void => {
              setScrollTop(currentTarget.scrollTop);
            }}
          >
            {!!value && (
              <S.DropdownTop>
                <S.DropdownAddButton
                  onClick={(): void => {
                    onSelect && onSelect(value);
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
              itemRender={(val: React.ReactText): React.ReactElement => (
                <Menu.Item key={`${val}`}>{val}</Menu.Item>
              )}
              rowHeight={32}
              width={width}
              listProps={{ scrollTop }}
            />
          </Scrollbar>
        </S.DropdownContent>
      )}
    </S.DropdownWrapper>
  );
};

export default OptionsDropdown;
