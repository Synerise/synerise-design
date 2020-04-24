import * as React from 'react';
import { ButtonProps } from 'antd/lib/button';
import '@synerise/ds-core/dist/js/style';
import './style/index.less';

import { JustifyContentProperty } from 'csstype';

import Icon from '@synerise/ds-icon';
import SpinnerM from '@synerise/ds-icon/dist/icons/SpinnerM';
import Creator, { CreatorProps } from './Creator/Creator';
import AntdButton, * as S from './Button.styles';
import Expander, { ExpanderProps } from './Expander/Expander';

export type Props = Omit<ButtonProps, 'type'> & {
  /**
   * Defines the type of the button. It affects the button color
   *
   * @default secondary
   */
  type?:
    | string
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'tertiary-white'
    | 'ghost-primary'
    | 'ghost'
    | 'ghost-white'
    | 'custom-color';
  /**
   * Defines the type of the button content. It affects content inside the button
   *
   * @default simple
   */
  mode?: string;
  /**
   * Defines color of `custom-color` button.
   *
   * @default red
   */
  color?:
    | string
    | 'blue'
    | 'grey'
    | 'red'
    | 'green'
    | 'yellow'
    | 'pink'
    | 'mars'
    | 'orange'
    | 'fern'
    | 'cyan'
    | 'purple'
    | 'violet';
  /**
   * Defines shape of the button.
   */
  groupVariant?: string | 'left-rounded' | 'squared' | 'right-rounded';
  /**
   * Defines justify of content in button.
   */
  justifyContent?: JustifyContentProperty;
  /**
   * Set the loading status of button
   * @default false
   */
  loading?: boolean | { delay?: number };
  /**
   * Sets the handler to handle `click` event
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
};

const RIPPLE_ANIMATION_OFFSET = 50;

const Button: React.FC<Props> & {
  Expander: React.ElementType;
  Creator: React.ElementType;
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
    <AntdButton
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
    </AntdButton>
  );
};
Button.Expander = (props: ExpanderProps): React.ReactElement => Expander(props) as React.ReactElement;
Button.Creator = (props: CreatorProps): React.ReactElement => Creator(props) as React.ReactElement;

export default Button;
