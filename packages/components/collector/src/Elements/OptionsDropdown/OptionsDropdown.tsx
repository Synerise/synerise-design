import * as React from 'react';
import Scrollbar from '@synerise/ds-scrollbar';
import { SearchItems } from '@synerise/ds-search/dist/Elements';
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
  onClick
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
                <S.DropdownAddButton type="ghost" mode="icon-label">
                  <Icon component={<Add3M />} />
                  <span>Add</span>
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
              itemRender={(val: React.ReactText): React.ReactNode => <Menu.Item key={val as string}>{val}</Menu.Item>}
              rowHeight={32}
              width={400}
              listProps={{ scrollTop }}
            />
          </Scrollbar>
        </S.DropdownContent>
      )}
    </S.DropdownWrapper>
  );
};

export default OptionsDropdown;
