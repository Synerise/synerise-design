import React, { type ReactElement, type ReactNode } from 'react';

import Icon, { InfoM } from '@synerise/ds-icon';

import * as S from '../TimeWindow/TimeWindow.styles';

export type SelectionHintProps = {
  message: ReactNode;
};

const SelectionHint = ({ message }: SelectionHintProps): ReactElement => {
  return (
    <S.SelectionHint>
      <Icon component={<InfoM />} color="var(--ds-color-icon-base-default)" />{' '}
      {message}
    </S.SelectionHint>
  );
};

export default SelectionHint;
