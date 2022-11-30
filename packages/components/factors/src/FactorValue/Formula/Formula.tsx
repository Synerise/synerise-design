import * as React from 'react';
import Button from '@synerise/ds-button';
import Icon, { EditS } from '@synerise/ds-icon';
import Badge from '@synerise/ds-badge';
import { FormulaValueType, InputProps } from '../../Factors.types';
import FormulaModal from './FormulaModal';
import * as S from './Formula.styles';

const FormulaInput: React.FC<InputProps> = ({
  value,
  onChange,
  withoutTypeSelector = false,
  texts,
  formulaEditor,
  readOnly = false,
}) => {
  const [openFormulaModal, setOpenFormulaModal] = React.useState(false);

  const triggerMode = React.useMemo(() => {
    if (value) {
      return readOnly ? 'label-icon' : 'two-icons';
    }

    return readOnly ? 'simple' : 'label-icon';
  }, [value, readOnly]);

  const activeIcon = React.useMemo(() => {
    return value ? <Badge flag status="active" /> : '';
  }, [value]);

  const label = React.useMemo(() => {
    return value ? (value as FormulaValueType).name : texts.formula.buttonPlaceholder;
  }, [value, texts.formula.buttonPlaceholder]);

  const handleChange = React.useCallback(
    val => {
      setOpenFormulaModal(false);
      onChange(val);
    },
    [onChange]
  );

  const handleClick = (): void => setOpenFormulaModal(true);

  return (
    <S.FormulaButton withoutTypeSelector={withoutTypeSelector}>
      <Button type="secondary" mode={triggerMode} onClick={!readOnly ? handleClick : undefined}>
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
