import React from 'react';

import { type ButtonProps } from '@synerise/ds-button';
import Icon, { ArrowUpCircleM } from '@synerise/ds-icon';

import * as S from './BackToTopButton.styles';

export const BackToTopButton = (
  props: ButtonProps & { isSticky?: boolean },
): React.ReactElement => (
  <S.OffsetButton
    type="custom-color"
    mode="icon-label"
    color="grey"
    icon={<Icon component={<ArrowUpCircleM />} />}
    className="virtual-table-back-to-top-button"
    {...props}
  />
);

export default BackToTopButton;
