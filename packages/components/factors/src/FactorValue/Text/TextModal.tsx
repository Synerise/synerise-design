import * as React from 'react';
import ModalProxy from '@synerise/ds-modal';
import Textarea from '@synerise/ds-input/dist/Textarea/Textarea';

type TextModalProps = {
  value: string;
  onApply: (value: string) => void;
  visible: boolean;
  onCancel: () => void;
};

const TextModal: React.FC<TextModalProps> = ({ value, onApply, onCancel, visible }) => {
  const [expandValue, setExpandValue] = React.useState('' || value);

  React.useEffect(() => {
    setExpandValue(value);
  }, [value]);

  const handleCancel = React.useCallback(() => {
    setExpandValue(value);
    onCancel();
  }, [onCancel, setExpandValue, value]);

  const handleOk = React.useCallback(() => {
    onApply(expandValue);
  }, [onApply, expandValue]);

  return (
    <ModalProxy
      size="medium"
      title="Value"
      closable
      onOk={handleOk}
      onCancel={handleCancel}
      visible={visible}
      okText="Apply"
      cancelText="Cancel"
    >
      <Textarea rows={7} value={expandValue} onChange={(event): void => setExpandValue(event.target.value)} />
    </ModalProxy>
  );
};

export default TextModal;
