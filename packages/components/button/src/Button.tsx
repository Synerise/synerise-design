import * as React from 'react';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';

import Icon from '@synerise/ds-icon';
import SpinnerM from '@synerise/ds-icon/dist/icons/SpinnerM';
import Creator, { CreatorProps } from './Creator/Creator';
import * as S from './Button.styles';
import Expander, { ExpanderProps } from './Expander/Expander';
import { Props } from './Button.types';
import Cruds, { CrudsProps } from './Cruds/Cruds';

const RIPPLE_ANIMATION_OFFSET = 50;

const Button: React.FC<Props> & {
  Expander: React.ElementType;
  Creator: React.ElementType;
  Cruds: React.ElementType;
} = ({
  type = 'secondary',
  mode,
  justifyContent = 'center',
  groupVariant,
  loading = false,
  onClick,
  className,
  color = 'red',
  ...antdProps
}) => {
  const rippleRef = React.useRef<HTMLSpanElement>(null);
  const [rippleClassName, setRippleClassName] = React.useState('');

  React.useEffect(() => {
    if (rippleClassName !== '') {
      setTimeout(() => {
        setRippleClassName('');
      }, S.RIPPLE_ANIMATION_TIME - RIPPLE_ANIMATION_OFFSET);
    }
  }, [rippleClassName]);

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    const button = event.currentTarget.closest('.ant-btn');
    if (button) {
      const buttonBoundingRect = button.getBoundingClientRect();
      const x = event.clientX - buttonBoundingRect.left;
      const y = event.clientY - buttonBoundingRect.top;

      if (rippleRef.current) {
        rippleRef.current.style.cssText = `top: ${y}px; left: ${x}px`;
      }
      setRippleClassName('animate');
      onClick && onClick(event);
    }
  };

  return (
    <S.AntdButton
      justifyContent={justifyContent}
      type={type}
      mode={mode}
      groupVariant={groupVariant}
      loading={loading}
      onClick={handleClick}
      className={`ds-button ${className}`}
      customColor={color}
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...antdProps}
    >
      <S.RippleEffect ref={rippleRef} className={`btn-ripple ${rippleClassName}`} />
      {antdProps.children}
      {loading && (
        <S.Spinner className="btn-spinner" data-testid="button-spinner">
          <Icon component={<SpinnerM />} color="#fff" />
        </S.Spinner>
      )}
      <S.ButtonFocus className="btn-focus" />
    </S.AntdButton>
  );
};
Button.Expander = (props: ExpanderProps): React.ReactElement => Expander(props) as React.ReactElement;
Button.Creator = (props: CreatorProps): React.ReactElement => Creator(props) as React.ReactElement;
Button.Cruds = (props: CrudsProps): React.ReactElement => Cruds(props) as React.ReactElement;

export default Button;
