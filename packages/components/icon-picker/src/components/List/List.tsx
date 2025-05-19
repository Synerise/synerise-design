import React, { UIEvent, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import { FixedSizeList } from 'react-window';

import Scrollbar from '@synerise/ds-scrollbar';
import Icon, { SearchNoResultsM } from '@synerise/ds-icon';
import { useTheme } from '@synerise/ds-core';

import type { ListProps, RowItemProps, SourceType } from '../../IconPicker.types';

import { createItemData } from '../../utils/createItemData';
import { useGroupItems } from '../../hooks/useGroupItems';
import { RowItem } from '../RowItem';

import * as S from '../../IconPicker.styles';
import { ELEMENT_HEIGHT, ITEMS_PER_ROW } from '../../IconPicker.const';

const List = <Source extends SourceType>({
  data,
  onSelect,
  noResultMsg = <FormattedMessage id="DS.ICON-PICKER.NO-RESULTS" />,
}: ListProps<Source>) => {
  const theme = useTheme();
  const groupedData = useGroupItems(data, ITEMS_PER_ROW);

  const listRef = useRef<FixedSizeList>(null);

  const handleScroll = ({ currentTarget }: UIEvent) => {
    const { scrollTop } = currentTarget;
    if (listRef.current) {
      listRef.current.scrollTo(scrollTop);
    }
  };

  const itemData = createItemData(groupedData, ELEMENT_HEIGHT, onSelect, ITEMS_PER_ROW);

  return (
    <Scrollbar absolute data-testid="icon-list" maxHeight={330} onScroll={handleScroll}>
      {!data.length ? (
        <S.OverlayWrapper>
          <S.NoResults>
            <S.Content>
              <S.Icon>
                <Icon component={<SearchNoResultsM />} color={theme.palette['grey-600']} />
              </S.Icon>
              <p>{noResultMsg}</p>
            </S.Content>
          </S.NoResults>
        </S.OverlayWrapper>
      ) : (
        <S.VirtualList
          listHeight={330}
          ref={listRef}
          height={330}
          itemCount={groupedData.length}
          itemData={itemData}
          itemSize={ELEMENT_HEIGHT}
          width="100%"
        >
          {props => <RowItem {...(props as RowItemProps<Source>)} />}
        </S.VirtualList>
      )}
    </Scrollbar>
  );
};

export default List;
