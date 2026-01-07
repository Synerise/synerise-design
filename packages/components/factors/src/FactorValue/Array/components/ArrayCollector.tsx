import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';

import Collector, { type CollectorValue } from '@synerise/ds-collector';

import { COMMA } from '../Array.const';
import * as S from '../Array.styles';
import { type ArrayCollectorProps } from '../Array.types';
import {
  isArrayOfNumbersAsString,
  isNumberAsString,
  sanitiseValues,
} from '../Array.utils';
import { useCollector } from '../hooks/useCollector';

export const ArrayCollector = <ItemType extends 'string' | 'number'>({
  limit,
  itemType,
  arrayValueCount,
  texts,
  onConfirm,
  collectorSuggestions,
}: ArrayCollectorProps<ItemType>) => {
  const [collectorValues, setCollectorValues] = useState<CollectorValue[]>([]);
  const {
    disabled,
    error,
    errorMessage,
    addEnabled,
    setHasTypeError,
    exceedsLimit,
  } = useCollector({
    limit,
    collectorCount: collectorValues.length,
    arrayValueCount,
    texts,
  });

  useEffect(() => {
    if (itemType === 'number') {
      const plainValues = collectorValues.map((item) =>
        sanitiseValues(item.value),
      );
      setHasTypeError(!isArrayOfNumbersAsString(plainValues));
    }
  }, [collectorValues, setHasTypeError, itemType]);

  const handleCancel = () => {
    setCollectorValues([]);
  };

  const handleConfirm = (items: CollectorValue[]) => {
    const hasError = items.some((item) => item.hasError);
    const hasExceededLimit = exceedsLimit(items.length);
    if (!hasError && !hasExceededLimit) {
      const rawItemValues = items.map((item) => ({
        value: itemType === 'number' ? Number(item.value) : item.value,
        id: item.id,
      }));
      onConfirm(rawItemValues);

      setCollectorValues([]);
    } else {
      setCollectorValues(items);
    }
  };

  const handleItemAdd = (text: string | number) => {
    return {
      value: sanitiseValues(`${text}`),
      type: itemType,
      hasError: itemType === 'number' && !isNumberAsString(`${text}`),
      id: uuid(),
    };
  };

  const handleItemSelect = (item: CollectorValue) => {
    setCollectorValues([...collectorValues, item]);
  };

  const handleItemDeselect = (deselectedItem: CollectorValue) => {
    setCollectorValues(
      collectorValues.filter(
        (collectorItem) => collectorItem.id !== deselectedItem.id,
      ),
    );
  };

  const handleMultipleItemSelect = (items: CollectorValue[]) => {
    setCollectorValues([...collectorValues, ...items]);
  };
  return (
    <S.CollectorWrapper>
      <Collector
        valuesSeparator={COMMA}
        error={error}
        errorText={errorMessage}
        onConfirm={addEnabled ? handleConfirm : undefined}
        onItemSelect={handleItemSelect}
        onMultipleItemsSelect={handleMultipleItemSelect}
        selected={collectorValues}
        onCancel={handleCancel}
        onItemAdd={handleItemAdd}
        allowCustomValue
        disabled={disabled}
        cancelButtonProps={{ 'data-testid': 'array-collector-cancel-button' }}
        addButtonProps={
          addEnabled
            ? { 'data-testid': 'array-collector-add-button' }
            : {
                disabled: true,
                'data-testid': 'array-collector-add-button',
              }
        }
        allowMultipleValues
        lookupConfig={{
          display: 'value',
          filter: 'value',
        }}
        onItemDeselect={handleItemDeselect}
        allowPaste
        suggestions={collectorSuggestions || []}
        texts={{
          add: texts.array.collectorAdd,
          placeholder: texts.array.collectorPlaceholder,
          cancel: texts.array.collectorCancel,
        }}
      />
    </S.CollectorWrapper>
  );
};
