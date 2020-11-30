import * as React from 'react';
import Icon from '@synerise/ds-icon';
import { AngleDownS } from '@synerise/ds-icon/dist/icons';
import { Title } from '@synerise/ds-typography';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { TextTriggerProps } from './TextTrigger.types';
import * as S from './TextTrigger.styles';

const TextTrigger: React.FC<TextTriggerProps> = ({ value, size, inactiveColor = 'grey-800', onClick }) => {
  return (
    <S.TextTrigger inactiveColor={theme.palette[inactiveColor]} onClick={onClick}>
      <Title level={size}>{value}</Title>
      <Icon component={<AngleDownS />} />
    </S.TextTrigger>
  );
};

export default TextTrigger;
