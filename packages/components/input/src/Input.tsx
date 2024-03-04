import React, {
  cloneElement,
  useState,
  useEffect,
  useRef,
  useCallback,
  ChangeEvent,
  ComponentType,
  ReactNode,
  useMemo,
  ReactElement,
  FunctionComponent,
} from 'react';
import '@synerise/ds-core/dist/js/style';
import { v4 as uuid } from 'uuid';
import { InputProps, TextAreaProps } from 'antd/lib/input';
import './style/index.less';
import { StyledComponent } from 'styled-components';
import { MaskedInputProps } from 'antd-mask-input/build/main/lib/MaskedInput';
import { useResizeToFit } from '@synerise/ds-utils';
import Tooltip from '@synerise/ds-tooltip/dist/Tooltip';
import * as S from './Input.styles';
import Label from './Label/Label';
import Textarea from './Textarea/Textarea';
import { EnhancedProps, Props } from './Input.types';
import AutosizeInput from './autosize/autosize';

const VERTICAL_BORDER_OFFSET = 2;

const enhancedInput =
  <P extends object>(
    WrappedComponent:
      | FunctionComponent
      | StyledComponent<ComponentType<InputProps | TextAreaProps | MaskedInputProps>, { error?: string }>,
    { type }: { type: string }
  ): ComponentType<P & EnhancedProps> =>
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
  }): ReactElement => {
    const [charCount, setCharCount] = useState<number>(0);

    const hasErrorMessage = Boolean(errorText);
    const id = useMemo(() => uuid(), []);

    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>();

    const [inputAddonHeight, setInputAddonHeight] = useState<number>(0);

    useEffect(() => {
      handleInputRef && handleInputRef(inputRef);
    }, [inputRef, handleInputRef]);

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement> & ChangeEvent<HTMLTextAreaElement>) => {
        const { value: newValue } = e.currentTarget;

        if (counterLimit && newValue.length > counterLimit) return;

        antdInputProps.onChange && antdInputProps.onChange(e);
      },
      [antdInputProps, counterLimit]
    );

    const handleIconsClick = useCallback(() => {
      inputRef.current && inputRef.current.focus();
    }, [inputRef]);

    useEffect(() => {
      if (counterLimit && antdInputProps.value && antdInputProps.value.toString().length > counterLimit) return;

      setCharCount(antdInputProps.value ? antdInputProps.value.toString().length : 0);
    }, [antdInputProps.value, counterLimit]);

    useEffect(() => {
      // @ts-ignore
      inputRef.current && setInputAddonHeight(inputRef?.current?.input?.offsetHeight);
    }, [inputRef]);

    const renderInputComponent = useMemo(
      () => (): ReactNode => {
        const Component = autoResize ? AutosizeInput : WrappedComponent;
        return (
          <Component
            {...antdInputProps}
            {...(autoResize ? { renderInput: WrappedComponent, autoResize } : {})}
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
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [antdInputProps, handleChange]
    );

    const stretchToFit = typeof autoResize === 'object' && Boolean(autoResize.stretchToFit);
    const paddingDiff = useRef<number>();

    const { observe, disconnect, elementRef } = useResizeToFit<HTMLDivElement>({
      onResize: (width: number) => {
        if (inputRef.current && paddingDiff.current) {
          // @ts-ignore
          inputRef.current.input.style.maxWidth = `${width - paddingDiff.current}px`;
        }
      },
      autoObserve: true,
    });

    useEffect(() => {
      if (inputRef.current) {
        // @ts-ignore
        const { paddingLeft, paddingRight } = getComputedStyle(inputRef.current.input);
        paddingDiff.current = parseFloat(paddingLeft) + parseFloat(paddingRight);
      }
    }, [paddingDiff]);

    useEffect(() => {
      if (elementRef.current) {
        if (stretchToFit) {
          observe();
        } else {
          disconnect();
          // @ts-ignore
          if (inputRef.current && inputRef.current.input) {
            // @ts-ignore
            inputRef.current.input.style.removeProperty('max-width');
          }
        }
      }
      return () => {
        disconnect();
      };
    }, [disconnect, observe, stretchToFit, elementRef]);

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
        <S.InputWrapper ref={elementRef} icon1={Boolean(icon1)} icon2={Boolean(icon2)}>
          {(icon1 || icon2) && (
            <S.IconsWrapper onClick={handleIconsClick} disabled={antdInputProps.disabled}>
              <S.IconsFlexContainer type={type}>
                <Tooltip title={icon1Tooltip}>
                  <S.IconWrapper className={className}>
                    {icon1 &&
                      cloneElement(icon1, {
                        className: 'icon icon1',
                        ...(icon2 && { style: { marginRight: '4px' } }),
                      })}
                  </S.IconWrapper>
                </Tooltip>
                <Tooltip title={icon2Tooltip}>
                  <S.IconWrapper className={className}>
                    {icon2 && cloneElement(icon2, { className: 'icon icon2' })}
                  </S.IconWrapper>
                </Tooltip>
              </S.IconsFlexContainer>
            </S.IconsWrapper>
          )}
          {renderInputComponent()}
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

export const RawInput = (props: Props & (InputProps | TextAreaProps)): ReactElement => {
  const { error } = props;
  return <S.AntdInput className={error ? 'error' : ''} {...props} />;
};
export const RawTextArea = S.AntdTextArea;
export { default as InputMultivalue } from './InputMultivalue/InputMultivalue';
export const AutoResize = Object.assign(S.AutoResize);
export const WrapperAutoResize = Object.assign(S.WrapperAutoResize);
