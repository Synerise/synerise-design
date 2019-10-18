import * as React from 'react';
import Icon from '@synerise/ds-icon';
import AddIcon from '@synerise/ds-icon/dist/icons/add-1-m.svg';
import * as S from './AddButton.styles';

interface Props {
  onClick: () => void;
  disabled: boolean;
}

const AddButton: React.FC<Props> = ({ onClick, disabled }) => {
  const [pressed, setPressed] = React.useState(false);

  return (
    <S.AddButton
      className={`${pressed ? 'pressed' : ''}`}
      disabled={disabled}
      onClick={onClick}
      onMouseDown={(): void => setPressed(true)}
      onMouseUp={(): void => setPressed(false)}
      onMouseLeave={(): void => setPressed(false)}
    >
      <Icon component={<AddIcon />} />
    </S.AddButton>
  );
};
export default AddButton;
