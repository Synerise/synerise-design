import * as React from 'react';
import ModalProxy from '@synerise/ds-modal';
import InlineEdit from '@synerise/ds-inline-edit';
import { FormulaValueType } from '../../Factors.types';

type FormulaModalProps = {
  value: FormulaValueType;
  onApply: (value: FormulaValueType) => void;
  visible: boolean;
  onCancel: () => void;
};

const FormulaModal: React.FC<FormulaModalProps> = ({ value, onApply, onCancel, visible }) => {
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
            placeholder: 'Define formula',
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
      okText="Apply"
      cancelText="Cancel"
    >
      <div>Formula editor</div>
    </ModalProxy>
  );
};

export default FormulaModal;
