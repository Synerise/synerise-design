import * as React from 'react';
import Icon from '@synerise/ds-icon';
import { AngleDownM, AngleDownS } from '@synerise/ds-icon/dist/icons';
import * as S from './Expander.styles';

export interface ExpanderProps {
  size: 'S' | 'M' | number;
  disabled: boolean;
  pressed: boolean;
  expanded: boolean;
}

const Expander: React.FC<ExpanderProps> = ({ size, disabled }) => {
  const [pressed, setPressed] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  return (
    <S.Expander
      className="ds-expander"
      onMouseDown={(): void => {
        setPressed(true);
        setExpanded(!expanded);
      }}
      onMouseUp={(): void => {
        setPressed(false);
      }}
      pressed={pressed}
      expanded={expanded}
      disabled={disabled}
    >
      <Icon component={size === 'M' ? <AngleDownM /> : <AngleDownS />} />
    </S.Expander>
  );
};
export default Expander;
