import * as React from 'react';
import Icon from '@synerise/ds-icon';
import * as S from './Expander.styles';
import { AngleDownM, AngleDownS } from '@synerise/ds-icon/dist/icons';

interface ExpanderProps {
  size: 'S' | 'M' | number;
  disabled: boolean;
}

const Expander: React.FC<ExpanderProps> = ({ size, disabled }) => {
  const [pressed, setPressed] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  return (
    <S.Expander
      className="ds-expander"
      onMouseDown={() => {
        setPressed(true);
        setExpanded(!expanded);
      }}
      onMouseUp={() => {
        setPressed(false);
      }}
      pressed={pressed}
      expanded={expanded}
      disabled={false}
    >
      <Icon component={size === 'M' ? <AngleDownM /> : <AngleDownS />} />
    </S.Expander>
  );
};
export default Expander;
