import React, { useMemo, useState } from 'react';
import Icon, { EditS } from '@synerise/ds-icon';
import { useTheme } from '@synerise/ds-core';
import { TagShape } from '@synerise/ds-tag';

import { ArrayItemType, FactorValueComponentProps, FactorValueType } from '../../Factors.types';
import { ArrayModal } from './components/ArrayModal';
import { ArrayValueElement } from './Array.types';
import * as S from './Array.styles';

export const Array = <ItemType extends ArrayItemType>({
  value: arrayValue,
  onChange,
  texts,
  opened,
  onActivate,
  onDeactivate,
  readOnly = false,
  error,
  arrayProps = {},
}: FactorValueComponentProps) => {
  const [isVisible, setIsVisible] = useState(opened);

  const handleOnClick = () => {
    setIsVisible(true);
    onActivate && onActivate();
  };

  const buttonLabel = useMemo(() => {
    if (!(arrayValue as ArrayValueElement<ItemType>[])?.length) return texts.array.triggerLabel;
    return `${(arrayValue as ArrayValueElement<ItemType>[]).join(', ')} `;
  }, [arrayValue, texts.array.triggerLabel]);

  const triggerMode = useMemo(() => {
    return readOnly ? '' : 'label-icon';
  }, [readOnly]);

  const handleApply = (changedValue: ArrayValueElement<ItemType>[]) => {
    setIsVisible(false);
    onChange(changedValue as FactorValueType);
  };

  const handleCancel = () => {
    setIsVisible(false);
    onDeactivate && onDeactivate();
  };
  const theme = useTheme();

  const tagProps = {
    asPill: true,
    name: `${(arrayValue as ArrayValueElement<ItemType>[]).length}`,
    color: error ? theme.palette['red-600'] : theme.palette['grey-600'],
    textColor: '#fff',
    shape: TagShape.DEFAULT_ROUND,
  };

  const tooltipProps = (arrayValue as ArrayValueElement<ItemType>[])?.length
    ? {
        title: <>{(arrayValue as ArrayValueElement<ItemType>[]).join(', ')}</>,
      }
    : undefined;

  return (
    <>
      <S.TriggerButton
        error={error}
        type="secondary"
        mode={triggerMode}
        onClick={handleOnClick}
        tooltipProps={tooltipProps}
        data-testid="ds-factors-array"
        tagProps={(arrayValue as ArrayValueElement<ItemType>[]).length ? tagProps : undefined}
      >
        <S.TriggerButtonLabel>{buttonLabel}</S.TriggerButtonLabel>
        {!readOnly && <Icon component={<EditS />} />}
      </S.TriggerButton>
      <ArrayModal
        value={arrayValue as ArrayValueElement<ItemType>[]}
        onApply={handleApply}
        onCancel={handleCancel}
        texts={texts}
        visible={isVisible}
        readOnly={readOnly}
        itemType="string"
        {...arrayProps}
      />
    </>
  );
};
