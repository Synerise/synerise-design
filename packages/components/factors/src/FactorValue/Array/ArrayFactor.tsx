import React, { useMemo, useState } from 'react';

import Icon, { EditS } from '@synerise/ds-icon';
import { TagShape } from '@synerise/ds-tag';

import type { ArrayItemType, ArrayValueElement } from '../../Factors.types';
import { useTexts } from '../../hooks/useTexts';
import * as S from './Array.styles';
import type { ArrayFactorBaseProps, ArrayFactorProps } from './Array.types';
import { ArrayModal } from './components/ArrayModal';

// A shared reference: ArrayModal resets its draft whenever `value` changes.
const NO_VALUE: never[] = [];

export const ArrayFactor = <ItemType extends ArrayItemType = 'string'>({
  texts,
  ...props
}: ArrayFactorProps<ItemType>) => {
  const resolvedTexts = useTexts(texts);
  return <ArrayFactorBase<ItemType> {...props} texts={resolvedTexts} />;
};

export const ArrayFactorBase = <ItemType extends ArrayItemType>({
  value = NO_VALUE,
  onChange,
  itemType,
  limit,
  collectorSuggestions,
  texts,
  readOnly = false,
  error,
  onActivate,
  onDeactivate,
  className,
}: ArrayFactorBaseProps<ItemType>) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleOnClick = () => {
    setIsVisible(true);
    onActivate?.();
  };

  const buttonLabel = useMemo(() => {
    if (!value.length) {
      return texts.array.triggerLabel;
    }
    return `${value.join(', ')} `;
  }, [value, texts.array.triggerLabel]);

  const handleApply = (changedValue: ArrayValueElement<ItemType>[]) => {
    setIsVisible(false);
    onChange(changedValue);
  };

  const handleCancel = () => {
    setIsVisible(false);
    onDeactivate?.();
  };

  const tagProps = {
    asPill: true,
    name: `${value.length}`,
    color: error
      ? 'var(--ds-color-background-danger-solid)'
      : 'var(--ds-color-background-neutral-solid)',
    textColor: 'var(--ds-color-text-base-onsolid)',
    shape: TagShape.DEFAULT_ROUND,
  };

  const tooltipProps = value.length
    ? { title: <>{value.join(', ')}</> }
    : undefined;

  return (
    <>
      <S.TriggerButton
        className={className}
        error={error}
        type="secondary"
        mode={readOnly ? '' : 'label-icon'}
        onClick={handleOnClick}
        tooltipProps={tooltipProps}
        data-testid="ds-factors-array"
        tagProps={value.length ? tagProps : undefined}
      >
        <S.TriggerButtonLabel>{buttonLabel}</S.TriggerButtonLabel>
        {!readOnly && <Icon component={<EditS />} />}
      </S.TriggerButton>
      <ArrayModal
        value={value}
        onApply={handleApply}
        onCancel={handleCancel}
        texts={texts}
        visible={isVisible}
        readOnly={readOnly}
        itemType={itemType ?? ('string' as ItemType)}
        limit={limit}
        collectorSuggestions={collectorSuggestions}
      />
    </>
  );
};
