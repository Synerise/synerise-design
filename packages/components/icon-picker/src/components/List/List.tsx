import React, { type UIEvent, useRef } from 'react';
import { FormattedMessage } from 'react-intl';
import { type FixedSizeList } from 'react-window';

import { useTheme } from '@synerise/ds-core';
import Icon, { SearchNoResultsM } from '@synerise/ds-icon';
import Scrollbar from '@synerise/ds-scrollbar';

import { ELEMENT_HEIGHT, ITEMS_PER_ROW } from '../../IconPicker.const';
import * as S from '../../IconPicker.styles';
import type {
  ListProps,
  RowItemProps,
  SourceType,
} from '../../IconPicker.types';
import { useGroupItems } from '../../hooks/useGroupItems';
import { createItemData } from '../../utils/createItemData';
import { RowItem } from '../RowItem';

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

  const itemData = createItemData(
    groupedData,
    ELEMENT_HEIGHT,
    onSelect,
    ITEMS_PER_ROW,
  );

  return (
    <Scrollbar
      absolute
      data-testid="icon-list"
      maxHeight={330}
      onScroll={handleScroll}
    >
      {!data.length ? (
        <S.OverlayWrapper>
          <S.NoResults>
            <S.Content>
              <S.NoResultIcon>
                <Icon
                  component={<SearchNoResultsM />}
                  color={theme.palette['grey-600']}
                />
              </S.NoResultIcon>
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
          {(props) => <RowItem {...(props as RowItemProps<Source>)} />}
        </S.VirtualList>
      )}
    </Scrollbar>
  );
};

export default List;
