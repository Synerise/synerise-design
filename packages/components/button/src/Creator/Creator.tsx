import * as React from 'react';
import Icon from '@synerise/ds-icon';
import AddM from '@synerise/ds-icon/dist/icons/AddM';
import * as S from './Creator.styles';

export enum CreatorStatus {
  Default = 'default',
  Error = 'error',
  Upload = 'upload',
}
export interface CreatorProps {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
  block?: boolean;
  status?: CreatorStatus;
}
const Creator: React.FC<CreatorProps> = ({ onClick, disabled, label, block, status }) => {
  const [pressed, setPressed] = React.useState(false);
  return (
    <S.Creator
      block={block}
      className="ds-button-creator"
      disabled={disabled}
      onClick={onClick}
      onMouseDown={(): void => setPressed(true)}
      onMouseUp={(): void => setPressed(false)}
      onMouseLeave={(): void => setPressed(false)}
      withLabel={Boolean(label)}
      pressed={pressed}
      status={status}
    >
      <>
        <Icon component={<AddM />} />
        {label && <S.CreatorLabel data-testid="ds-add-button-label">{label}</S.CreatorLabel>}
      </>
    </S.Creator>
  );
};
export default Creator;
