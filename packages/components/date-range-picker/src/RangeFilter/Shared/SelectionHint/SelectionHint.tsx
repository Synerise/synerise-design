import React from 'react';

import Icon, { InfoM } from '@synerise/ds-icon';

import * as S from '../TimeWindow/TimeWindow.styles';

export type SelectionHintProps = {
  message: React.ReactNode | string;
};

const SelectionHint = ({ message }: SelectionHintProps): JSX.Element => {
  return (
    <S.SelectionHint>
      <Icon component={<InfoM />} color="var(--ds-color-icon-base-default)" />{' '}
      {message}
    </S.SelectionHint>
  );
};

export default SelectionHint;
