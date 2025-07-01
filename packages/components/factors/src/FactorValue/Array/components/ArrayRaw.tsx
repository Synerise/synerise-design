import type { TextAreaRef } from 'antd/lib/input/TextArea';
import React, {
  type ChangeEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import * as S from '../Array.styles';
import { type ArrayRawProps, type ArrayValueElement } from '../Array.types';
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
  const ref = useRef<TextAreaRef>(null);
  const plainValues = useMemo(() => {
    return value.map((item) => item.value).join(',');
  }, [value]);

  const [textareaValue, setTextareaValue] = useState(plainValues || '');

  useEffect(() => {
    if (document.activeElement !== ref.current?.resizableTextArea?.textArea) {
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

    const items = stringifiedValue?.split(',') || [];
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
