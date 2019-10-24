import * as React from 'react';
import Icon from '@synerise/ds-icon';
import Add1M from '@synerise/ds-icon/dist/icons/Add1M';
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
      <Icon component={<Add1M />} />
    </S.AddButton>
  );
};
export default AddButton;
