import * as React from 'react';
import Icon from '@synerise/ds-icon';
import AddM from '@synerise/ds-icon/dist/icons/AddM';
import * as S from './Creator.styles';

export interface CreatorProps {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
  block?: boolean;
}

const Creator: React.FC<CreatorProps> = ({ onClick, disabled, label, block }) => {
  const [pressed, setPressed] = React.useState('pressed');

  return (
    <S.Creator
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
        {label && <S.CreatorLabel data-testid="ds-add-button-label">{label}</S.CreatorLabel>}
      </>
    </S.Creator>
  );
};
export default Creator;
