import * as React from 'react';
import { NoData } from '@synerise/ds-icon/dist/icons/L';
import Icon from '@synerise/ds-icon';
import { Text } from '@synerise/ds-typography';
import * as S from './Placeholder.styles';
import { PlaceholderType } from './Placeholder.types';

const Placeholder: React.FC<PlaceholderType> = ({ text }) => {
  return (
    <>
      <S.PlaceholderContainer>
        <Icon size={48} component={<NoData />} />
        <br />
        <Text size="medium">{text}</Text>
      </S.PlaceholderContainer>
    </>
  );
};

export default Placeholder;
