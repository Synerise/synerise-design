import * as React from 'react';
import AutosizeInput from 'react-input-autosize';
import { toCamelCase } from '@synerise/ds-utils';
import Icon from '@synerise/ds-icon';
import Dropdown from '@synerise/ds-dropdown';
import { AngleDownS } from '@synerise/ds-icon/dist/icons';
import * as S from './InlineSelect.style';
import { attachWidthWatcher } from '../utils';
import SelectDropdown from './SelectDropdown/SelectDropdown';
import { MenuItemProps } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';
import { InputProps } from '../InlineEdit';




export interface InlineSelectProps {
  size?: 'normal' | 'small';
  tooltipTitle?: string;
  className?: string;
  disabled?: boolean;
  input: Partial<InputProps>;
  style?: { [key: string]: string | number };
  autoFocus?: boolean;
  error?: boolean;
  hideIcon?: boolean;
  expanded: boolean;
  option?: string;
  dataSource: MenuItemProps[];
}

const InlineSelect: React.FC<InlineSelectProps> = ({
  className,
  style,
  size = 'normal',
  disabled,
  autoFocus,
  hideIcon,
  error,
  input,
  option,
  dataSource,
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

  const [selectedValue, setSelectedValue] = React.useState<string>('option');
  const [opened, setOpened] = React.useState<boolean>(false);
  const [pressed, setPressed] = React.useState<boolean>(false);

  return (
    <S.InPlaceEditableInputContainer
      className={`ds-inline-edit ${className || ''}`}
      style={style}
      size={size}
      disabled={disabled}
      error={error}
      tabIndex={0}
      onClick={(): void => setOpened(!opened)}
      onMouseDown={(): void => setPressed(true)}
      onMouseUp={(): void => setPressed(false)}
      pressed={pressed}
    >
      <AutosizeInput
        id={input.name ? toCamelCase(input.name) : 'id'}
        className="autosize-input"
        placeholder={input.placeholder}
        maxLength={input.maxLength}
        disabled={disabled}
        name={input.name}
        value={selectedValue || option}
        autoComplete={input.autoComplete}
        placeholderIsMinWidth={false}
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        ref={inputRef as any}
      />
      {!hideIcon && (
        <Dropdown
          visible={opened}
          onVisibleChange={setOpened}
          placement="bottomRight"
          overlay={
            <SelectDropdown
              dataSource={dataSource}
              onSelect={(item): void => setSelectedValue(item.text as string)}
              closeDropdown={(): void => setOpened(false)}
            />
          }
          trigger={['click']}
        >
          <S.IconWrapper size={size} expanded={opened}>
            <Icon component={<AngleDownS/>} size={24} />
          </S.IconWrapper>
        </Dropdown>
      )}
      <S.FontStyleWatcher
        ref={fontStyleWatcher}
        style={{ position: 'absolute', visibility: 'hidden', pointerEvents: 'none' }}
      />
    </S.InPlaceEditableInputContainer>
  );
};

export default InlineSelect;
