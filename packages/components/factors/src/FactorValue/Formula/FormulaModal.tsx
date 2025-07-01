import React from 'react';

import InlineEdit from '@synerise/ds-inline-edit';
import ModalProxy from '@synerise/ds-modal';

import { type FormulaModalProps } from '../../Factors.types';

const FormulaModal: React.FC<FormulaModalProps> = ({
  value,
  onApply,
  onCancel,
  visible,
  texts,
  formulaEditor,
}) => {
  const [formulaName, setFormulaName] = React.useState(
    value?.name || texts.formula.defaultName,
  );

  const handleOk = React.useCallback(() => {
    onApply({
      name: formulaName,
      value: 'FORMULA VALUE',
    });
  }, [onApply, formulaName]);

  return (
    <ModalProxy
      size="medium"
      title={
        <InlineEdit
          input={{
            maxLength: 120,
            name: 'name-of-input',
            placeholder: texts.formula.buttonPlaceholder,
            onChange: (e): void => setFormulaName(e.target.value),
            onEnterPress: (e): void =>
              setFormulaName((e.target as HTMLInputElement).value),
            onBlur: (e): void =>
              setFormulaName(e.target.value || texts.formula.defaultName),
            value: formulaName,
          }}
        />
      }
      closable
      onOk={handleOk}
      onCancel={onCancel}
      visible={visible}
      okText={texts.modalApply}
      cancelText={texts.modalCancel}
    >
      {formulaEditor}
    </ModalProxy>
  );
};

export default FormulaModal;
