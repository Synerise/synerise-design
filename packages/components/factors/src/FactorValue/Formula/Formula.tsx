import * as React from 'react';
import Button from '@synerise/ds-button';
import { EditS } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import Badge from '@synerise/ds-badge';
import { FormulaValueType, InputProps } from '../../Factors.types';
import FormulaModal from './FormulaModal';
import * as S from './Formula.styles';

const FormulaInput: React.FC<InputProps> = ({ value, onChange, withoutTypeSelector }) => {
  const [openFormulaModal, setOpenFormulaModal] = React.useState(false);
  const mode = React.useMemo(() => {
    return value ? 'two-icons' : 'label-icon';
  }, [value]);

  const activeIcon = React.useMemo(() => {
    return value ? <Badge flag status="active" /> : '';
  }, [value]);

  const label = React.useMemo(() => {
    return value ? (value as FormulaValueType).name : 'Define formula';
  }, [value]);

  const handleChange = React.useCallback(
    val => {
      setOpenFormulaModal(false);
      onChange(val);
    },
    [onChange]
  );

  return (
    <S.FormulaButton withoutTypeSelector={withoutTypeSelector}>
      <Button type="secondary" mode={mode} onClick={(): void => setOpenFormulaModal(true)}>
        {activeIcon}
        {label}
        <Icon component={<EditS />} />
      </Button>
      <FormulaModal
        visible={openFormulaModal}
        onCancel={(): void => setOpenFormulaModal(false)}
        value={value as FormulaValueType}
        onApply={handleChange}
      />
    </S.FormulaButton>
  );
};

export default FormulaInput;
