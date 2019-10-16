import * as React from 'react';
import AutosizeInput from 'react-input-autosize';
import Tooltip from '@synerise/ds-tooltip';
import Icon from '@synerise/ds-icon';
import EditM from '@synerise/ds-icon/dist/icons/edit-m.svg';
import { toCamelCase } from '@synerise/ds-utils';
import { attachWidthWatcher } from './utils';
import * as S from './InlineEdit.styles';

export type InputProps = {
  name?: string;
  defaultValue?: string;
  value?: string | number;
  disabled?: boolean;
  onBlur?: (event: MouseEvent) => void;
};

export interface InlineEditProps {
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
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export class InlineEdit extends React.Component<InlineEditProps> {
  autosizeInputComponent: typeof AutosizeInput;
  input: HTMLInputElement;
  fontStyleWatcher: HTMLDivElement;

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
    this.autosizeInputComponent.copyInputStyles();
    this.autosizeInputComponent.updateInputWidth();
  };

  handleFocusInput = (): void => {
    if (this.input) {
      this.input.focus();
    }
  };

  handleKeyPress = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter') {
      this.input.blur();
    }
  };

  checkPalettes = (
    arr: {
      valid: boolean;
      palette: string;
    }[]
  ): string[] => arr.map(item => item.valid && item.palette).filter(p => p);

  getActivePalettes = (size, error, disabled): string[] =>
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
    } = this.props;

    const { name, value, disabled: inputDisabled, onBlur, ...inputRest }: InputProps = input;
    const id = toCamelCase(name);
    const disabled = propsDisabled || inputDisabled;
    const activePalettes = this.getActivePalettes(size, error, disabled).join('-');

    const iconMargin = size !== 'small' ? '0 16px' : '0';
    return (
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
          ref={(ref): void => (this.autosizeInputComponent = ref)}
          inputRef={(ref): void => (this.input = ref)}
          disabled={disabled}
          name={name}
          value={value || ''}
          onChange={this.handleOnChange}
          onBlur={onBlur}
          autoComplete={autoComplete}
          placeholderIsMinWidth={false}
          input={{ ...inputRest }}
        />
        <Tooltip title={tooltipTitle}>
          <S.IconWrapper colors={activePalettes} margin={iconMargin} onClick={this.handleFocusInput}>
            <Icon component={<EditM />} size={20} />
          </S.IconWrapper>
        </Tooltip>
        {useFontStyleWatcher && (
          <S.FontStyleWatcher
            ref={(ref): void => (this.fontStyleWatcher = ref)}
            style={{ position: 'absolute', visibility: 'hidden', 'pointer-events': 'none' }}
          >
            0dsad
          </S.FontStyleWatcher>
        )}
      </S.InPlaceEditableInputContainer>
    );
  }
}

export default InlineEdit;
