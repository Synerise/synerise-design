import React, {
  type ChangeEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useDelimiterEscape } from '@synerise/ds-utils';

import { type ArrayValueElement } from '../../../Factors.types';
import { BACKTICK, COMMA } from '../Array.const';
import * as S from '../Array.styles';
import { type ArrayRawProps } from '../Array.types';
import {
  arrayWithUUID,
  isArrayOfNumbersAsString,
  sanitiseValues,
} from '../Array.utils';

export const ArrayRaw = <ItemType extends 'string' | 'number'>({
  value = [],
  itemType,
  onValueChange,
  readOnly,
  texts,
  limit,
  onError,
}: ArrayRawProps<ItemType>) => {
  const { isValidEscapedString, joinWithEscape, splitWithEscape } =
    useDelimiterEscape({
      openTag: BACKTICK,
      closeTag: BACKTICK,
      delimiter: COMMA,
    });
  const ref = useRef<HTMLTextAreaElement>(null);
  const plainValues = useMemo(() => {
    const items = value.map((item) => item.value);
    return itemType === 'string'
      ? joinWithEscape(items as string[])
      : items.join(',');
  }, [itemType, joinWithEscape, value]);

  const [textareaValue, setTextareaValue] = useState(plainValues || '');

  useEffect(() => {
    if (document.activeElement !== ref.current) {
      setTextareaValue(plainValues || '');
    }
  }, [plainValues]);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const stringifiedValue = event.target.value;
    setTextareaValue(stringifiedValue);

    if (!stringifiedValue) {
      onError(null);
      onValueChange([]);
      return;
    }
    if (itemType === 'string' && !isValidEscapedString(stringifiedValue)) {
      onError(texts.array.stringUnclosedBacktickError);
      return;
    }
    const items =
      (itemType === 'string'
        ? splitWithEscape(stringifiedValue)
        : stringifiedValue?.split(',')) || [];
    const sanitisedItems = items.map(sanitiseValues);
    const lastItemIsDelimiter =
      sanitisedItems.at(sanitisedItems.length - 1) === '';
    const itemsToValidate = lastItemIsDelimiter
      ? [...sanitisedItems.slice(0, -1)]
      : sanitisedItems;
    const exceedsLimit = limit && items.length > limit;

    if (itemType === 'number' && !isArrayOfNumbersAsString(itemsToValidate)) {
      onError(texts.array.numericValidationError);
      return;
    }
    if (exceedsLimit) {
      onError(texts.array.limitExceeded);
      return;
    }

    onError(null);
    if (itemType === 'string') {
      onValueChange(
        arrayWithUUID(itemsToValidate as ArrayValueElement<ItemType>[]),
      );
    } else {
      onValueChange(
        arrayWithUUID(
          itemsToValidate.map((item) =>
            parseFloat(item),
          ) as ArrayValueElement<ItemType>[],
        ),
      );
    }
  };

  return (
    <S.TextArea
      ref={ref}
      data-testid="array-raw-textarea"
      readOnly={readOnly}
      spellCheck="false"
      autoCapitalize="off"
      autoCorrect="off"
      autoComplete="off"
      onChange={!readOnly ? handleChange : undefined}
      value={textareaValue}
    />
  );
};
