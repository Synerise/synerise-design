import React, {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from 'react';

import { useResizeObserver } from '@synerise/ds-utils';

import * as S from './SearchBar.styles';

type ValuePrefixProps = {
  value: ReactNode;
  setValuePrefixWidth: Dispatch<SetStateAction<number>>;
};

export const ValuePrefix = ({
  value,
  setValuePrefixWidth,
}: ValuePrefixProps) => {
  const valuePrefixRef = useRef<HTMLDivElement | null>(null);

  const handleValuePrefixWidth = useCallback(
    (dimensions: DOMRect) => {
      setValuePrefixWidth(dimensions.width);
    },
    [setValuePrefixWidth],
  );

  useResizeObserver(valuePrefixRef, handleValuePrefixWidth);

  useEffect(() => {
    return () => setValuePrefixWidth(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <S.ValuePrefixWrapper ref={valuePrefixRef}>
      <S.ValuePrefixTitle level={6} withoutMargin>
        {value}
      </S.ValuePrefixTitle>
    </S.ValuePrefixWrapper>
  );
};
