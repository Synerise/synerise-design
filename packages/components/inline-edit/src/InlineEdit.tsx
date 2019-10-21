import * as React from 'react';
import AutosizeInput from 'react-input-autosize';
import Tooltip from '@synerise/ds-tooltip';
import Icon from '@synerise/ds-icon';
import EditM from '@synerise/ds-icon/dist/icons/EditM';
import { toCamelCase } from '@synerise/ds-utils';
import { attachWidthWatcher } from './utils';
import * as S from './InlineEdit.styles';

export type InputProps = {
  name?: string;
  defaultValue?: string;
  value?: string | number;
  disabled?: boolean;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
};

export interface InlineEditProps {
  dupa?: string;
  placeholder?: string;
  size: 'normal' | 'small';
  tooltipTitle?: string;
  darkTheme: boolean;
  className?: string;
  maxLength?: number;
  disabled?: boolean;
  input: InputProps;
  useFontStyleWatcher: boolean;
  style?: { [key: string]: string | number };
  autoComplete?: string;
  error?: boolean;
  hideIcon?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export class InlineEdit extends React.Component<InlineEditProps> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  autosizeInputComponent: any;
  input: HTMLInputElement | undefined;
  fontStyleWatcher: HTMLDivElement | undefined;

  static defaultProps = {
    size: 'normal',
    darkTheme: false,
    useFontStyleWatcher: true,
    autoComplete: 'off',
  };

  componentDidMount(): void {
    if (this.fontStyleWatcher) {
      attachWidthWatcher(this.fontStyleWatcher, this.updateInputWidth);
    }
  }

  updateInputWidth = (): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this.autosizeInputComponent as any).copyInputStyles();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this.autosizeInputComponent as any).updateInputWidth();
  };

  handleFocusInput = (): void => {
    if (this.input) {
      this.input.focus();
    }
  };

  handleKeyPress = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter') {
      this.input && this.input.blur();
    }
  };

  checkPalettes = (
    arr: {
      valid: boolean;
      palette: string;
    }[]
  ): (string | false)[] => arr.map(item => item.valid && item.palette).filter(p => p);

  getActivePalettes = (size: string, error: boolean, disabled: boolean): (string | false)[] =>
    this.checkPalettes([
      {
        valid: disabled,
        palette: 'disabled',
      },
      {
        valid: error,
        palette: 'error',
      },
      {
        valid: size === 'normal',
        palette: 'default',
      },
      {
        valid: size === 'small',
        palette: 'transparent',
      },
    ]);

  handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { onChange } = this.props;
    onChange(event);
  };

  render(): React.ReactNode {
    const {
      darkTheme,
      size,
      tooltipTitle,
      maxLength,
      placeholder,
      className,
      disabled: propsDisabled,
      input,
      style,
      error,
      useFontStyleWatcher,
      autoComplete,
      hideIcon,
    } = this.props;

    const { name, value, disabled: inputDisabled, onBlur, ...inputRest }: InputProps = input;
    const id = name ? toCamelCase(name) : 'id';
    const disabled = propsDisabled || inputDisabled;
    const activePalettes = this.getActivePalettes(size, !!error, !!disabled).join('-');

    const iconMargin = size !== 'small' ? '0 16px' : '0';
    return (
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      <S.InPlaceEditableInputContainer
        className={className}
        style={style}
        size={size}
        disabled={disabled}
        error={error}
        darkTheme={darkTheme}
      >
        <AutosizeInput
          id={id}
          className="autosize-input"
          placeholder={placeholder}
          maxLength={maxLength}
          onKeyPress={this.handleKeyPress}
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          ref={(ref: HTMLInputElement): void => {
            if (ref) {
              this.autosizeInputComponent = ref;
            }
          }}
          inputRef={(ref: HTMLInputElement | null): void => {
            if (ref) {
              this.input = ref;
            }
          }}
          disabled={disabled}
          name={name}
          value={value || ''}
          onChange={this.handleOnChange}
          onBlur={onBlur}
          autoComplete={autoComplete}
          placeholderIsMinWidth={false}
          input={{ ...inputRest }}
        />
        {!hideIcon && (
          <Tooltip data-testid="inline-edit-icon" title={tooltipTitle}>
            <S.IconWrapper colors={activePalettes} margin={iconMargin} onClick={this.handleFocusInput}>
              <Icon component={<EditM />} size={20} />
            </S.IconWrapper>
          </Tooltip>
        )}
        {useFontStyleWatcher && (
          <S.FontStyleWatcher
            ref={(ref): void => {
              if (ref) {
                this.fontStyleWatcher = ref;
              }
            }}
            style={{ position: 'absolute', visibility: 'hidden', pointerEvents: 'none' }}
          >
            0dsad
          </S.FontStyleWatcher>
        )}
      </S.InPlaceEditableInputContainer>
    );
  }
}

export default InlineEdit;
