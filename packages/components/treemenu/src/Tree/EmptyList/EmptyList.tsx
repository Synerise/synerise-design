import * as React from 'react';
import { InformationNoSearchResultL } from '@synerise/ds-icon/dist/icons/L';
import Icon from '@synerise/ds-icon';
import { Description } from '@synerise/ds-typography';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';

import * as S from './EmptyList.style';

// eslint-disable-next-line import/prefer-default-export
export const EmptyList: React.FC = () => {
  return (
    <S.EmptyList>
      <Icon component={<InformationNoSearchResultL />} size={48} color={theme.palette['grey-600']} />
      <Description>No results</Description>
    </S.EmptyList>
  );
};
