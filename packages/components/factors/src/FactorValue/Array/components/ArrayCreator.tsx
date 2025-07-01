import React, { useMemo } from 'react';

import { CloseM, InboxNoResultsL } from '@synerise/ds-icon';
import { Input } from '@synerise/ds-input';
import InputNumber from '@synerise/ds-input-number';
import Tooltip from '@synerise/ds-tooltip';

import * as S from '../Array.styles';
import type {
  ArrayCreatorProps,
  ArrayValueElement,
  ArrayValueWithID,
} from '../Array.types';
import { matchesSearchQuery } from '../Array.utils';
import { ArrayCollector } from './ArrayCollector';

export const ArrayCreator = <ItemType extends 'string' | 'number'>({
  value: arrayValue = [],
  searchQuery,
  itemType,
  onValueChange,
  limit,
  readOnly,
  texts,
  collectorSuggestions,
}: ArrayCreatorProps<ItemType>) => {
  const arrayReversed = useMemo(() => {
    return [...arrayValue].reverse();
  }, [arrayValue]);

  const handleItemChange = (
    valueIndex: number,
    newValue: ArrayValueElement<ItemType>,
  ) => {
    const updatedArray = arrayReversed
      .map((currentValue, index) =>
        index === valueIndex
          ? {
              ...currentValue,
              value: newValue,
            }
          : currentValue,
      )
      .reverse();
    onValueChange(updatedArray);
  };

  const handleItemRemove = (valueIndex: number) => {
    onValueChange(
      [
        ...arrayReversed.slice(0, valueIndex),
        ...arrayReversed.slice(valueIndex + 1),
      ].reverse(),
    );
  };

  const handleConfirm = (rawItemValues: ArrayValueWithID<ItemType>[]) => {
    onValueChange([...arrayValue, ...rawItemValues]);
  };

  const filteredItems = useMemo(() => {
    return searchQuery
      ? arrayReversed.filter((item) =>
          matchesSearchQuery(item.value, searchQuery),
        )
      : arrayReversed;
  }, [searchQuery, arrayReversed]);

  return (
    <S.ModalContentWrapper>
      <>
        {!readOnly && (
          <ArrayCollector
            arrayValueCount={arrayValue.length}
            limit={limit}
            itemType={itemType}
            onConfirm={handleConfirm}
            texts={texts}
            collectorSuggestions={collectorSuggestions}
          />
        )}

        {filteredItems?.length ? (
          <S.CreatorItemsList>
            {filteredItems.map((item, index) => (
              <S.CreatorRow data-testid="ds-factors-array-item" key={item.id}>
                {itemType === 'string' ? (
                  <Input
                    resetMargin
                    readOnly={readOnly}
                    onChange={(event) =>
                      handleItemChange(
                        index,
                        event.target.value as ArrayValueElement<ItemType>,
                      )
                    }
                    value={item.value}
                  />
                ) : (
                  <InputNumber
                    raw
                    readOnly={readOnly}
                    onChange={(changedValue) =>
                      changedValue &&
                      handleItemChange(
                        index,
                        changedValue as ArrayValueElement<ItemType>,
                      )
                    }
                    value={item.value as number}
                  />
                )}
                {!readOnly && (
                  <Tooltip title={texts.array.deleteItemTooltip}>
                    <S.DeleteIcon
                      data-testid="ds-factors-array-remove-item"
                      onClick={() => handleItemRemove(index)}
                      component={<CloseM />}
                    />
                  </Tooltip>
                )}
              </S.CreatorRow>
            ))}
          </S.CreatorItemsList>
        ) : (
          <S.EmptyState
            customIcon={<InboxNoResultsL />}
            text={
              searchQuery
                ? texts.array.emptyResultsTitle
                : texts.array.emptyTitle
            }
            label={
              searchQuery
                ? texts.array.emptyResultsDescription
                : texts.array.emptyDescription
            }
          />
        )}
      </>
    </S.ModalContentWrapper>
  );
};
