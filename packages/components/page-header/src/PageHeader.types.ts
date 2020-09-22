import * as React from 'react';

export type PageHeaderProps = {
  className?: string;
  rightSide?: React.ReactNode;
  children?: React.ReactNode;
  bar?: React.ReactNode;
  tabs?: React.ReactNode;
  avatar?: React.ReactNode;
  title?: React.ReactNode | string;
  description?: React.ReactNode | string;
  more?: React.ReactNode;
  onGoBack?: () => void;
  goBackIcon?: React.ReactNode;
  onClose?: () => void;
  isolated?: boolean;
  inlineEdit?: {
    name?: string;
    value: string | number;
    maxLength?: number;
    handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleOnBlur?: React.FocusEventHandler<HTMLInputElement>;
    handleOnEnterPress?: React.KeyboardEventHandler<HTMLInputElement>;
    placeholder?: string;
    size: 'small' | 'normal';
    style?: {
      [key: string]: string | number;
    };
    error?: boolean;
    disabled?: boolean;
    hideIcon?: boolean;
  };
};
