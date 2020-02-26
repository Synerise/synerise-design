import * as React from 'react';
import Icon from '@synerise/ds-icon';
import AddM from '@synerise/ds-icon/dist/icons/AddM';
import * as S from './AddButton.styles';

interface Props {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
  block?: boolean;
}

const AddButton: React.FC<Props> = ({ onClick, disabled, label, block }) => {
  const [pressed, setPressed] = React.useState('pressed');

  return (
    <S.AddButton
      data-testId="ds-add-button"
      block={block}
      className={`ds-add-button ${pressed}`}
      disabled={disabled}
      onClick={onClick}
      onMouseDown={(): void => setPressed('pressed')}
      onMouseUp={(): void => setPressed('')}
      onMouseLeave={(): void => setPressed('')}
      withLabel={Boolean(label)}
    >
      <>
        <Icon component={<AddM />} />
        {label && <S.AddButtonLabel data-testid="ds-add-button-label">{label}</S.AddButtonLabel>}
      </>
    </S.AddButton>
  );
};
export default AddButton;
