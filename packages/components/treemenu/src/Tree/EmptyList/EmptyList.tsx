import * as React from 'react';
import Icon, { InformationNoSearchResultL } from '@synerise/ds-icon';
import { Description } from '@synerise/ds-typography';
import { theme } from '@synerise/ds-core';

import * as S from './EmptyList.style';
import { TreeMenuTexts } from '../../TreeMenu.types';

type EmptyListProps = {
  texts: TreeMenuTexts;
};

// eslint-disable-next-line import/prefer-default-export
export const EmptyList: React.FC<EmptyListProps> = ({ texts }) => {
  return (
    <S.EmptyList>
      <Icon component={<InformationNoSearchResultL />} size={48} color={theme.palette['grey-600']} />
      <Description>{texts.noResults}</Description>
    </S.EmptyList>
  );
};
