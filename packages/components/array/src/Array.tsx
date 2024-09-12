import React from 'react';

import { ArrayProps } from './Array.types';
import * as S from './Array.styles';
import { ArrayModal } from './ArrayModal/ArrayModal';
import { ArrayTrigger } from './ArrayTrigger/ArrayTrigger';

const Array = ({ value, readOnly, disabled, onValueChange, renderCustomTrigger, ...htmlAttributes }: ArrayProps) => {
  //   const [localValue, setLocalValue] = useState(value);

  const trigger = renderCustomTrigger ? (
    renderCustomTrigger({
      value,
      readOnly,
      disabled,
    })
  ) : (
    <ArrayTrigger />
  );
  return (
    <>
      <S.ArrayWrapper {...htmlAttributes}>{trigger}</S.ArrayWrapper>
      <ArrayModal value={value} onValueChange={onValueChange} />
    </>
  );
};
export default Array;
