import React from 'react';

import { DEFAULT_SIZE, FLAG_SIZE_RATIO } from './Flag.const';
import * as S from './Flag.styles';
import { type FlagProps } from './Flag.types';
import * as Flags from './icons';

const DSFlag = ({ country, size = DEFAULT_SIZE }: FlagProps) => {
  const code = String(country)
    .replace('-', '')
    .toUpperCase() as keyof typeof Flags;
  const Flag = Flags[code];
  return Flag ? (
    <S.FlagContainer className={`ds-flag ds-flag-${country}`} size={size}>
      <Flag width={size} height={FLAG_SIZE_RATIO * size} />
    </S.FlagContainer>
  ) : (
    <></>
  );
};

export default DSFlag;
