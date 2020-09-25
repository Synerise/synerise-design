import * as React from 'react';
import Icon from '@synerise/ds-icon';
import { CloseS } from '@synerise/ds-icon/dist/icons';
import * as S from '../InputMultivalue.styles';
import { Props } from './Value.types';

const Value: React.FC<Props> = ({ disabled, key, onRemoveClick, value, focused }) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <S.ValueWrapper
      className="ds-input-value-wrapper"
      onMouseOver={(): void => {
        focused && setHovered(true);
      }}
      onMouseLeave={(): void => {
        setHovered(false);
      }}
      disabled={disabled}
      key={key}
      shrink={hovered}
    >
      <S.ValueText shrink={hovered} disabled={disabled}>
        {value}
      </S.ValueText>
      <S.IconWrapper onClick={onRemoveClick}>
        <Icon className="remove" component={<CloseS />} />
      </S.IconWrapper>
    </S.ValueWrapper>
  );
};
export default Value;
