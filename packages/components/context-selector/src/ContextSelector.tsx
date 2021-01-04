import * as React from 'react';
import Button from '@synerise/ds-button';
import Icon from '@synerise/ds-icon';
import { AngleDownS, Add3M } from '@synerise/ds-icon/dist/icons';
import Dropdown from '@synerise/ds-dropdown';
import ContextSelectorDropdown from './ContextSelectorDropdown/ContextSelectorDropdown';
import { ContextItem, ContextProps } from './ContextSelector.types';

const ContextSelector: React.FC<ContextProps> = ({ value, onChange, groups, items, texts, opened, addMode }) => {
  const [dropdownVisible, setDropdownVisible] = React.useState(false);
  const handleChange = React.useCallback(
    val => {
      onChange(val);
    },
    [onChange]
  );

  React.useEffect(() => {
    if (opened) {
      setDropdownVisible(true);
    }
  }, [opened]);

  const triggerMode = React.useMemo(() => {
    return value ? 'two-icons' : 'label-icon';
  }, [value]);

  const triggerColor = React.useMemo(() => {
    return value ? 'green' : 'blue';
  }, [value]);

  const handleClick = React.useCallback(() => {
    setDropdownVisible(true);
  }, []);

  const triggerButton = React.useMemo(() => {
    const { buttonLabel } = texts;
    return addMode && !value ? (
      <Button type="primary" mode="icon-label" onClick={handleClick}>
        <Icon component={<Add3M />} />
        {buttonLabel}
      </Button>
    ) : (
      <Button type="custom-color" color={triggerColor} mode={triggerMode} onClick={handleClick}>
        {value ? <Icon component={value.icon} /> : null}
        {value ? (value as ContextItem).name : buttonLabel}
        <Icon component={<AngleDownS />} />
      </Button>
    );
  }, [addMode, handleClick, texts, triggerColor, triggerMode, value]);

  return (
    <Dropdown
      visible={dropdownVisible}
      overlay={
        <ContextSelectorDropdown
          value={value}
          setDropdownVisible={setDropdownVisible}
          setSelected={handleChange}
          groups={groups}
          items={items}
          texts={texts}
          visible={dropdownVisible}
        />
      }
    >
      {triggerButton}
    </Dropdown>
  );
};
export default ContextSelector;
