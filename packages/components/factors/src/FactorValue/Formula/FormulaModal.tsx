import * as React from 'react';
import ModalProxy from '@synerise/ds-modal';
import InlineEdit from '@synerise/ds-inline-edit';
import { FormulaModalProps } from '../../Factors.types';

const FormulaModal: React.FC<FormulaModalProps> = ({ value, onApply, onCancel, visible, texts }) => {
  const [formulaName, setFormulaName] = React.useState(value.name);

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
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            onEnterPress: (e): void => setFormulaName(e.target.value),
            onBlur: (e): void => setFormulaName(e.target.value),
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
      <div>Formula editor</div>
    </ModalProxy>
  );
};

export default FormulaModal;
