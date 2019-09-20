import * as React from 'react';

import AntButton, { ButtonProps } from 'antd/es/button/index';

declare const ButtonTypes: ['default', 'primary', 'ghost', 'dashed', 'danger', 'link', 'success', 'flat', 'warning'];
export declare type ButtonType = (typeof ButtonTypes)[number];

interface ButtonState {
  loading?: boolean | { delay?: number };
  hasTwoCNChar: boolean;
}

interface PropTypes {
  defaultProps: typeof AntButton.defaultProps;
  propTypes: typeof AntButton.propTypes;
}

type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;
type ExtendedProps = Merge<ButtonProps, { type?: ButtonType }>;

declare class Button extends React.Component<ExtendedProps, ButtonState, PropTypes> {
  static Group: typeof AntButton.Group;
  static __ANT_BUTTON: boolean;
  static getDerivedStateFromProps: typeof AntButton.getDerivedStateFromProps;
  private delayTimeout;
  private buttonNode;
  saveButtonRef: (node: HTMLElement | null) => void;
  handleClick: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  componentDidMount(): void;
  componentDidUpdate(prevProps: ButtonProps): void;
  componentWillUnmount(): void;
  fixTwoCNChar(): void;
  isNeedInserted(): boolean;
  renderButton: ({ getPrefixCls, autoInsertSpaceInButton }) => JSX.Element;
  render(): JSX.Element;
}

export default Button;
