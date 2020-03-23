import * as React from 'react';
import { v4 as uuid } from 'uuid';
import Scrollbar from '@synerise/ds-scrollbar';
import Icon from '@synerise/ds-icon/dist/Icon';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import SearchNoResultsM from '@synerise/ds-icon/dist/icons/SearchNoResultsM';
import { FormattedMessage } from 'react-intl';
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
        data.map((list: FilterElement) => (
          <S.OverlayWrapper key={uuid()}>
            {list.category && <S.Title>{list.category}</S.Title>}
            <S.List>
              {list.items.map((el: FilterItem, i: number) => (
                <ListItem key={uuid()} element={el} onSelect={onSelect} index={i} />
              ))}
            </S.List>
          </S.OverlayWrapper>
        ))
      )}
    </Scrollbar>
  );
};

export default List;
