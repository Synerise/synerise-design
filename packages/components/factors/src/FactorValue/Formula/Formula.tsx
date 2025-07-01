import React, { useCallback, useMemo, useState } from 'react';

import Badge from '@synerise/ds-badge';
import Button from '@synerise/ds-button';
import Icon, { EditS } from '@synerise/ds-icon';

import {
  type FactorValueComponentProps,
  type FactorValueType,
  type FormulaValueType,
} from '../../Factors.types';
import * as S from './Formula.styles';
import FormulaModal from './FormulaModal';

const FormulaInput = ({
  value,
  error,
  onChange,
  withoutTypeSelector = false,
  texts,
  formulaEditor,
  readOnly = false,
}: FactorValueComponentProps) => {
  const [openFormulaModal, setOpenFormulaModal] = useState(false);

  const triggerMode = useMemo(() => {
    if (value) {
      return readOnly ? 'label-icon' : 'two-icons';
    }

    return readOnly ? 'simple' : 'label-icon';
  }, [value, readOnly]);

  const activeIcon = useMemo(() => {
    return value ? <Badge flag status="active" /> : '';
  }, [value]);

  const label = useMemo(() => {
    return value
      ? (value as FormulaValueType).name
      : texts.formula.buttonPlaceholder;
  }, [value, texts.formula.buttonPlaceholder]);

  const handleChange = useCallback(
    (val: FactorValueType) => {
      setOpenFormulaModal(false);
      onChange(val);
    },
    [onChange],
  );

  const handleClick = !readOnly
    ? (): void => setOpenFormulaModal(true)
    : undefined;

  return (
    <S.FormulaButton
      data-testid="ds-factors-formula"
      withoutTypeSelector={withoutTypeSelector}
    >
      <Button
        readOnly={readOnly}
        type="secondary"
        error={error}
        mode={triggerMode}
        onClick={handleClick}
      >
        {activeIcon}
        {label}
        <Icon component={<EditS />} />
      </Button>
      <FormulaModal
        visible={openFormulaModal}
        onCancel={(): void => setOpenFormulaModal(false)}
        value={value as FormulaValueType}
        onApply={handleChange}
        texts={texts}
        formulaEditor={formulaEditor}
      />
    </S.FormulaButton>
  );
};

export default FormulaInput;
