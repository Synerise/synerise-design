import * as React from 'react';
import Scrollbar from '@synerise/ds-scrollbar';
import { FormattedMessage } from 'react-intl';
import Icon, { SearchNoResultsM } from '@synerise/ds-icon';
import { theme } from '@synerise/ds-core';
import ListItem from '../ListItem/ListItem';
import { FilterElement, FilterItem } from '../IconPicker.types';
import { ListProps } from './List.types';
import * as S from '../IconPicker.styles';

const List: React.FC<ListProps> = ({
  data,
  onSelect,
  noResultMsg = <FormattedMessage id="DS.ICON-PICKER.NO-RESULTS" />,
}) => {
  return (
    <Scrollbar maxHeight={330}>
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
        data.map(
          (list: FilterElement) =>
            !!list.items.length && (
              <S.OverlayWrapper key={list.category}>
                {list.category && <S.Title>{list.category}</S.Title>}
                <S.List>
                  {list.items.map((el: FilterItem, i: number) => (
                    <ListItem key={i} element={el} onSelect={onSelect} index={i} /> // eslint-disable-line react/no-array-index-key
                  ))}
                </S.List>
              </S.OverlayWrapper>
            )
        )
      )}
    </Scrollbar>
  );
};

export default List;
