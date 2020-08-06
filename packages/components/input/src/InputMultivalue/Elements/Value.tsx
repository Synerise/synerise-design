import * as React from 'react';
import Icon from '@synerise/ds-icon';
import { CloseS } from '@synerise/ds-icon/dist/icons';
import * as S from '../InputMultivalue.styles';

export interface Props {
  disabled?: boolean;
  key?: string;
  onRemoveClick: () => void;
  value: React.ReactText;
  focused?: boolean;
}
const Value: React.FC<Props> = ({ disabled, key, onRemoveClick, value, focused }) => {
  const [pressed, setPressed] = React.useState(false);
  return (
    <S.ValueWrapper
      className='ds-input-value-wrapper'
      onMouseEnter={(): void => {
        focused && setPressed(true);
      }}
      onMouseLeave={(): void => {
        setPressed(false);
      }}
      disabled={disabled}
      key={key}
      shrink={pressed}
    >
      <S.ValueText shrink={pressed} disabled={disabled}>
        {value}
      </S.ValueText>
      <S.IconWrapper onClick={onRemoveClick}>
        <Icon className="remove" component={<CloseS />} />
      </S.IconWrapper>
    </S.ValueWrapper>
  );
};
export default Value;
