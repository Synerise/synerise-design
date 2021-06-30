import * as React from 'react';
import Icon from '@synerise/ds-icon';
import { Props as ButtonProps } from '@synerise/ds-button/dist/Button.types';
import { ArrowUpCircleM } from '@synerise/ds-icon/dist/icons';
import * as S from './BackToTopButton.styles';

export const BackToTopButton = (props: ButtonProps): React.ReactElement => (
  <S.OffsetButton
    type="custom-color"
    mode="icon-label"
    color="grey"
    icon={<Icon component={<ArrowUpCircleM />} />}
    {...props}
  />
);

export default BackToTopButton;
