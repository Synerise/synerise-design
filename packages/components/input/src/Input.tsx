import * as React from 'react';
import '@synerise/ds-core/dist/js/style';
import { v4 as uuid } from 'uuid';
import { InputProps, TextAreaProps } from 'antd/lib/input';
import './style/index.less';
import { StyledComponent } from 'styled-components';
import { MaskedInputProps } from 'antd-mask-input/build/main/lib/MaskedInput';
import Tooltip from '@synerise/ds-tooltip/dist/Tooltip';
import * as S from './Input.styles';
import Label from './Label/Label';
import Textarea from './Textarea/Textarea';
import { EnhancedProps, Props } from './Input.types';
import { AutosizeInput } from './autosize/autosize'

const VERTICAL_BORDER_OFFSET = 2;

const enhancedInput =
  <P extends object>(
    WrappedComponent:
      | React.FunctionComponent
      | StyledComponent<React.ComponentType<InputProps | TextAreaProps | MaskedInputProps>, { error?: string }>,
    { type }: { type: string }
  ): React.ComponentType<P & EnhancedProps> =>
  ({
    className,
    errorText,
    label,
    description,
    counterLimit,
    tooltip,
    tooltipConfig,
    icon1,
    icon1Tooltip,
    autoResize,
    icon2,
    icon2Tooltip,
    resetMargin,
    handleInputRef,
    prefixel,
    suffixel,
    error,
    ...antdInputProps
  }): React.ReactElement => {
    const [charCount, setCharCount] = React.useState<number>(0);

    const hasErrorMessage = Boolean(errorText);
    const id = React.useMemo(() => uuid(), []);

    const inputRef = React.useRef<HTMLInputElement | HTMLTextAreaElement>();
    const [inputAddonHeight, setInputAddonHeight] = React.useState<number>(0);

    React.useEffect(() => {
      handleInputRef && handleInputRef(inputRef);
    }, [inputRef, handleInputRef]);

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement> & React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value: newValue } = e.currentTarget;

        if (counterLimit && newValue.length > counterLimit) return;

        antdInputProps.onChange && antdInputProps.onChange(e);
      },
      [antdInputProps, counterLimit]
    );

    const handleIconsClick = React.useCallback(() => {
      inputRef.current && inputRef.current.focus();
    }, [inputRef]);

    React.useEffect(() => {
      if (counterLimit && antdInputProps.value && antdInputProps.value.toString().length > counterLimit) return;

      setCharCount(antdInputProps.value ? antdInputProps.value.toString().length : 0);
    }, [antdInputProps.value, counterLimit]);

    React.useEffect(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      inputRef.current && setInputAddonHeight(inputRef?.current?.input?.offsetHeight);
    }, [inputRef]);

    const renderInputComponent = (): React.ReactNode => {
      if (autoResize) {
        return <AutosizeInput {...antdInputProps}/>;
      }
      return (
        <WrappedComponent
          {...antdInputProps}
          autoResize={autoResize}
          className={hasErrorMessage || error ? 'error' : undefined}
          addonBefore={
            !!prefixel && (
              <S.AddonWrapper className="ds-input-prefix" height={inputAddonHeight - VERTICAL_BORDER_OFFSET}>
                {prefixel}
              </S.AddonWrapper>
            )
          }
          addonAfter={
            !!suffixel && (
              <S.AddonWrapper className="ds-input-suffix" height={inputAddonHeight - VERTICAL_BORDER_OFFSET}>
                {suffixel}
              </S.AddonWrapper>
            )
          }
          error={hasErrorMessage || error}
          onChange={handleChange}
          value={antdInputProps.value}
          id={id}
          ref={inputRef}
          autoComplete="off"
        />
      );
    };

    return (
      <S.OuterWrapper autoResize={autoResize} className={className} resetMargin={resetMargin}>
        {(label || counterLimit) && (
          <S.ContentAbove>
            <Label label={label} id={id} tooltip={tooltip} tooltipConfig={tooltipConfig} />
            {counterLimit && (
              <S.Counter data-testid="counter">
                {charCount}/{counterLimit}
              </S.Counter>
            )}
          </S.ContentAbove>
        )}
        <S.InputWrapper icon1={Boolean(icon1)} icon2={Boolean(icon2)}>
          {(icon1 || icon2) && (
            <S.IconsWrapper onClick={handleIconsClick} disabled={antdInputProps.disabled}>
              <S.IconsFlexContainer type={type}>
                <Tooltip title={icon1Tooltip}>
                  <S.IconWrapper className={className}>
                    {icon1 &&
                      React.cloneElement(icon1, {
                        className: 'icon icon1',
                        ...(icon2 && { style: { marginRight: '4px' } }),
                      })}
                  </S.IconWrapper>
                </Tooltip>
                <Tooltip title={icon2Tooltip}>
                  <S.IconWrapper className={className}>
                    {icon2 && React.cloneElement(icon2, { className: 'icon icon2' })}
                  </S.IconWrapper>
                </Tooltip>
              </S.IconsFlexContainer>
            </S.IconsWrapper>
          )}
          {autoResize ? (
            <S.WrapperAutoResize autoResize={autoResize}>
              {renderInputComponent()}
              <S.AutoResize icon1={icon1} icon2={icon2} suffixel={suffixel} prefixel={prefixel} autoResize={autoResize}>
                {antdInputProps.value}
              </S.AutoResize>
            </S.WrapperAutoResize>
          ) : (
            renderInputComponent()
          )}
        </S.InputWrapper>
        {(hasErrorMessage || description) && (
          <S.ContentBelow>
            {hasErrorMessage && <S.ErrorText>{errorText}</S.ErrorText>}
            {description && <S.Description>{description}</S.Description>}
          </S.ContentBelow>
        )}
      </S.OuterWrapper>
    );
  };

export const TextArea = Object.assign(enhancedInput(Textarea, { type: 'textArea' }), { displayName: 'TextArea' });
export const Input = Object.assign(enhancedInput(S.AntdInput, { type: 'input' }), { displayName: 'Input' });
export const MaskedInput = Object.assign(enhancedInput(S.AntdMaskedInput, { type: 'input' }), {
  displayName: 'MaskedInput',
});
export const RawMaskedInput = S.AntdMaskedInput;
export { default as InputGroup } from './InputGroup';

export const RawInput = (props: Props & (InputProps | TextAreaProps)): React.ReactElement => {
  const { error } = props;
  return <S.AntdInput className={error ? 'error' : ''} {...props} />;
};
export const RawTextArea = S.AntdTextArea;
export { default as InputMultivalue } from './InputMultivalue/InputMultivalue';
// export const AutoResize = Object.assign(S.AutoResize);
export const WrapperAutoResize = Object.assign(S.WrapperAutoResize);
