import * as React from 'react';
import AutosizeInput from 'react-input-autosize';
import { toCamelCase } from '@synerise/ds-utils';
import Icon, { AngleDownS } from '@synerise/ds-icon';
import Dropdown from '@synerise/ds-dropdown';
import * as S from './InlineSelect.style';
import { attachWidthWatcher } from '../utils';
import SelectDropdown from './SelectDropdown/SelectDropdown';
import { InlineSelectProps } from './InlineSelect.types';

const InlineSelect: React.FC<InlineSelectProps> = ({
  className,
  style,
  dropdownProps = {},
  dropdownOverlayStyle = {},
  inputStyle = {},
  size = 'normal',
  disabled,
  autoFocus,
  hideIcon,
  error,
  input,
  placeholder,
  dataSource,
  initialValue,
}): React.ReactElement => {
  const inputRef = React.useMemo(() => {
    return React.createRef<HTMLInputElement>();
  }, []);

  const fontStyleWatcher = React.useMemo(() => {
    return React.createRef<HTMLDivElement>();
  }, []);

  const updateInputWidth = React.useCallback(() => {
    if (inputRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (inputRef.current as any).copyInputStyles();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (inputRef.current as any).updateInputWidth();
    }
  }, [inputRef]);

  React.useEffect(() => {
    updateInputWidth();
    if (fontStyleWatcher) {
      attachWidthWatcher(fontStyleWatcher.current as HTMLDivElement, updateInputWidth);
    }
  }, [autoFocus, fontStyleWatcher, inputRef, updateInputWidth]);

  const [selectedValue, setSelectedValue] = React.useState<string | undefined>(initialValue || placeholder || 'option');
  const [opened, setOpened] = React.useState<boolean>(false);
  const [pressed, setPressed] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (input?.value !== selectedValue) {
      setSelectedValue(input?.value as string);
    }
  }, [input, selectedValue]);
  return (
    <Dropdown
      visible={!disabled && opened}
      onVisibleChange={setOpened}
      placement="bottomRight"
      disabled={disabled}
      overlay={
        <SelectDropdown
          dataSource={dataSource}
          onSelect={(item): void => setSelectedValue(item.text as string)}
          closeDropdown={(): void => setOpened(false)}
          style={dropdownOverlayStyle}
        />
      }
      trigger={['click']}
      {...dropdownProps}
    >
      <S.InPlaceEditableInputContainer
        className={`ds-inline-edit ${className || ''}`}
        style={style}
        size={size}
        disabled={disabled}
        error={error}
        tabIndex={0}
        onMouseDown={(): void => setPressed(true)}
        onMouseUp={(): void => setPressed(false)}
        pressed={pressed}
        dropdownOpened={opened}
      >
        <AutosizeInput
          id={input.name ? toCamelCase(input.name) : 'id'}
          className="autosize-input"
          placeholder={input.placeholder}
          maxLength={input.maxLength}
          disabled={disabled}
          name={input.name}
          value={selectedValue || placeholder}
          autoComplete={input.autoComplete}
          placeholderIsMinWidth={false}
          style={inputStyle}
          /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
          ref={inputRef as any}
        />
        {!hideIcon && (
          <S.IconWrapper size={size} expanded={opened}>
            <Icon component={<AngleDownS />} size={24} />
          </S.IconWrapper>
        )}
        <S.FontStyleWatcher
          ref={fontStyleWatcher}
          style={{ position: 'absolute', visibility: 'hidden', pointerEvents: 'none' }}
        />
      </S.InPlaceEditableInputContainer>
    </Dropdown>
  );
};

export default InlineSelect;
