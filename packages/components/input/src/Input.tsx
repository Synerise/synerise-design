import * as React from 'react';
import '@synerise/ds-core/dist/js/style';
import { v4 as uuid } from 'uuid';
import { InputProps, TextAreaProps } from 'antd/lib/input';
import './style/index.less';
import { StyledComponent } from 'styled-components';
import { MaskedInputProps } from 'antd-mask-input/build/main/lib/MaskedInput';
import * as S from './Input.styles';
import Label from './Label/Label';

export interface Props {
  error?: boolean;
  className?: string;
  tooltip?: React.ReactNode;
  errorText?: React.ReactNode | string;
  label?: React.ReactNode | string;
  description?: React.ReactNode | string;
  counterLimit?: number;
  icon1?: React.ReactElement;
  icon2?: React.ReactElement;
  resetMargin?: boolean;
  handleInputRef?: (ref: React.MutableRefObject<HTMLInputElement | HTMLTextAreaElement | undefined>) => void;
  prefixel?: React.ReactNode;
  suffixel?: React.ReactNode;
}

type EnhancedProps = Props & (InputProps | TextAreaProps | MaskedInputProps);
const VERTICAL_BORDER_OFFSET = 2;

const enhancedInput = <P extends object>(
  WrappedComponent: StyledComponent<React.ComponentType<InputProps | TextAreaProps>, { error?: string }>,
  { type }: { type: string }
): React.ComponentType<P & EnhancedProps> => ({
  className,
  errorText,
  label,
  description,
  counterLimit,
  tooltip,
  icon1,
  icon2,
  resetMargin,
  handleInputRef,
  prefixel,
  suffixel,
  error,
  ...antdInputProps
}): React.ReactElement => {
  const [charCount, setCharCount] = React.useState<number>(0);

  const showError = Boolean(errorText);
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
  return (
    <S.OuterWrapper className={className} resetMargin={resetMargin}>
      {(label || counterLimit) && (
        <S.ContentAbove>
          <Label label={label} id={id} tooltip={tooltip} />
          {counterLimit && (
            <S.Counter data-testid="counter">
              {charCount}/{counterLimit}
            </S.Counter>
          )}
        </S.ContentAbove>
      )}
      <S.InputWrapper icon1={Boolean(icon1)} icon2={Boolean(icon2)}>
        <S.IconsWrapper onClick={handleIconsClick} disabled={antdInputProps.disabled}>
          <S.IconsFlexContainer type={type}>
            {icon1 &&
              React.cloneElement(icon1, { className: 'icon icon1', ...(icon2 && { style: { marginRight: '4px' } }) })}
            {icon2 && React.cloneElement(icon2, { className: 'icon icon2' })}
          </S.IconsFlexContainer>
        </S.IconsWrapper>
        <WrappedComponent
          {...antdInputProps}
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
          error={showError || error}
          onChange={handleChange}
          value={antdInputProps.value}
          id={id}
          ref={inputRef}
          autoComplete="off"
        />
      </S.InputWrapper>
      {(showError || description) && (
        <S.ContentBelow>
          {showError && <S.ErrorText>{errorText}</S.ErrorText>}
          {description && <S.Description>{description}</S.Description>}
        </S.ContentBelow>
      )}
    </S.OuterWrapper>
  );
};

export const TextArea = enhancedInput(S.AntdTextArea, { type: 'textArea' });
export const Input = enhancedInput(S.AntdInput, { type: 'input' });
export const MaskedInput = enhancedInput(S.AntdMaskedInput, { type: 'input' });
export { default as InputGroup } from './InputGroup';

export const RawInput = (props: Props & (InputProps | TextAreaProps)): React.ReactElement => {
  const { error } = props;
  return <S.AntdInput className={error ? 'error' : ''} {...props} />;
};
export const RawTextArea = S.AntdTextArea;
