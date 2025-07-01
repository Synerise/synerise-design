import React from 'react';

import { theme } from '@synerise/ds-core';
import Icon, { ClickM } from '@synerise/ds-icon';
import { Text } from '@synerise/ds-typography';

import * as S from './Placeholder.styles';
import { type PlaceholderType } from './Placeholder.types';

const Placeholder: React.FC<PlaceholderType> = ({ text }) => {
  return (
    <>
      <S.PlaceholderContainer>
        <Icon
          size={24}
          color={theme.palette['grey-600']}
          component={<ClickM />}
        />
        <Text size="medium">{text}</Text>
      </S.PlaceholderContainer>
    </>
  );
};

export default Placeholder;
