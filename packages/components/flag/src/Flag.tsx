import * as React from 'react';
import * as S from './Flag.styles';
import * as Flags from './icons';
import { FlagProps } from './Flag.types';

export const FLAG_SIZE_RATIO = 15 / 21;
const DEFAULT_SIZE = 24;

const DSFlag: React.FC<FlagProps> = ({ country, size = DEFAULT_SIZE }) => {
  const code = String(country).replace('-', '').toUpperCase();
  const Flag = Flags[code];
  return (
    <S.FlagContainer className={`ds-flag ds-flag-${country}`} size={size}>
      <Flag width={size} height={FLAG_SIZE_RATIO * size} alt={`${country} Flag`} />
    </S.FlagContainer>
  );
};

export default DSFlag;
