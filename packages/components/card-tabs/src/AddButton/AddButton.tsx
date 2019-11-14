import * as React from 'react';
import Icon from '@synerise/ds-icon';
import AddM from '@synerise/ds-icon/dist/icons/AddM';
import * as S from './AddButton.styles';

interface Props {
  onClick: () => void;
  disabled: boolean;
}

const AddButton: React.FC<Props> = ({ onClick, disabled }) => {
  const [pressed, setPressed] = React.useState('pressed');

  return (
    <S.AddButton
      className={pressed}
      disabled={disabled}
      onClick={onClick}
      onMouseDown={(): void => setPressed('pressed')}
      onMouseUp={(): void => setPressed('')}
      onMouseLeave={(): void => setPressed('')}
    >
      <Icon component={<AddM />} />
    </S.AddButton>
  );
};
export default AddButton;
