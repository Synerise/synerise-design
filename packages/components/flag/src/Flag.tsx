import React from 'react';

import * as S from './Flag.styles';
import { type FlagProps } from './Flag.types';
import * as Flags from './icons';

export const FLAG_SIZE_RATIO = 15 / 21;
const DEFAULT_SIZE = 24;

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
