import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useTheme } from '@synerise/ds-core';
import Dropdown from '@synerise/ds-dropdown';
import Icon, { AngleDownS, Close3S } from '@synerise/ds-icon';
import { getPopupContainer } from '@synerise/ds-utils';

import {
  type FactorValueComponentProps,
  type RelativeDateValueType,
} from '../../Factors.types';
import { defaultTriggerModifier } from './RelativeDate.utils';
import { RelativeDateDropdown } from './RelativeDateDropdown';
import * as S from './RelativeDateDropdown.styles';

const RelativeDateInput = ({
  value,
  onChange,
  texts: allTexts,
  opened,
  onActivate,
  error,
  allowClear,
  readOnly = false,
  triggerValueFormatter,
  getPopupContainerOverride,
  availableUnits,
  uncontrolledComponent,
}: FactorValueComponentProps) => {
  const [isOpen, setIsOpen] = useState(opened);
  const [localValue, setLocalValue] = useState<RelativeDateValueType>(
    () => value as RelativeDateValueType,
  );
  const theme = useTheme();
  const { relativeDate: texts } = allTexts;

  useEffect(() => {
    if (!uncontrolledComponent) {
      setLocalValue(value as RelativeDateValueType);
    }
  }, [value, uncontrolledComponent]);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (open) {
        onActivate && onActivate();
      }
      setIsOpen(open);
    },
    [onActivate],
  );

  const handleApply = useCallback(
    (date: RelativeDateValueType | undefined) => {
      onChange(date);
      handleOpenChange(false);
    },
    [onChange, handleOpenChange],
  );

  const handleClear = useCallback(() => {
    onChange(undefined);
  }, [onChange]);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const triggerValue = useMemo(() => {
    if (!localValue) {
      return undefined;
    }
    return triggerValueFormatter
      ? triggerValueFormatter(localValue)
      : defaultTriggerModifier(localValue, texts);
  }, [texts, localValue, triggerValueFormatter]);

  const icon = useMemo(() => {
    if (!localValue || !allowClear) {
      return <Icon component={<AngleDownS />} onClick={handleOpen} />;
    }
    return (
      <S.IconWrapper>
        <S.ChevronIcon onClick={handleOpen} component={<AngleDownS />} />
        <S.ClearIcon
          onClick={handleClear}
          color={theme.palette['red-600']}
          component={<Close3S />}
        />
      </S.IconWrapper>
    );
  }, [localValue, allowClear, handleClear, handleOpen, theme.palette]);

  const trigger = useMemo(() => {
    return (
      <S.Trigger
        data-testid="ds-factors-relative-date-trigger"
        error={error}
        readOnly
        autoResize={{
          minWidth: '123px',
          stretchToFit: true,
        }}
        autoResizeProps={{ placeholderIsMinWidth: true }}
        placeholder={texts.triggerPlaceholder}
        value={triggerValue}
        icon1={!readOnly ? icon : undefined}
      />
    );
  }, [error, triggerValue, readOnly, icon, texts.triggerPlaceholder]);

  return readOnly ? (
    trigger
  ) : (
    <Dropdown
      getPopupContainer={getPopupContainerOverride || getPopupContainer}
      open={isOpen}
      onOpenChange={handleOpenChange}
      asChild={false}
      size={420}
      popoverProps={{
        testId: 'factors-relative-date',
      }}
      overlay={
        <RelativeDateDropdown
          onApply={handleApply}
          onCancel={handleClose}
          value={localValue}
          texts={texts}
          availableUnits={availableUnits}
        />
      }
    >
      {trigger}
    </Dropdown>
  );
};

export default RelativeDateInput;
