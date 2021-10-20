import * as React from 'react';
import Button from '@synerise/ds-button';
import Icon from '@synerise/ds-icon';
import { AngleDownS, Add3M } from '@synerise/ds-icon';
import Dropdown from '@synerise/ds-dropdown';
import Tooltip from '@synerise/ds-tooltip';
import ContextSelectorDropdown from './ContextSelectorDropdown/ContextSelectorDropdown';
import { ContextItem, ContextProps } from './ContextSelector.types';
import { ItemWrapper } from './ContextSelector.styles';

const ContextSelector: React.FC<ContextProps> = ({
  selectedItem,
  onSelectItem,
  onSetGroup,
  groups,
  items,
  texts,
  opened,
  addMode,
  loading,
  customTriggerComponent,
  trigger,
  menuItemHeight,
  dropdownWrapperStyles,
}) => {
  const [dropdownVisible, setDropdownVisible] = React.useState(false);
  const handleChange = React.useCallback(
    val => {
      onSelectItem(val);
    },
    [onSelectItem]
  );
  const handleOnSetGroup = React.useCallback(
    val => {
      onSetGroup && onSetGroup(val);
    },
    [onSetGroup]
  );

  React.useEffect(() => {
    if (opened) {
      setDropdownVisible(true);
    }
  }, [opened]);

  const triggerMode = React.useMemo(() => {
    return selectedItem ? 'two-icons' : 'label-icon';
  }, [selectedItem]);

  const triggerColor = React.useMemo(() => {
    return selectedItem ? 'green' : 'blue';
  }, [selectedItem]);

  const handleClick = React.useCallback(() => {
    setDropdownVisible(true);
  }, []);

  const triggerButton = React.useMemo(() => {
    const { buttonLabel } = texts;
    return addMode && !selectedItem ? (
      <Button type="primary" mode="icon-label" onClick={handleClick}>
        <Icon component={<Add3M />} />
        {buttonLabel}
      </Button>
    ) : (
      <Button type="custom-color" color={triggerColor} mode={triggerMode} onClick={handleClick}>
        {selectedItem ? <Icon component={selectedItem.icon} /> : null}
        <ItemWrapper>
          <Tooltip title={selectedItem ? (selectedItem as ContextItem).name : undefined}>
            {selectedItem ? (selectedItem as ContextItem).name : buttonLabel}
          </Tooltip>
        </ItemWrapper>
        <Icon component={<AngleDownS />} />
      </Button>
    );
  }, [addMode, handleClick, texts, triggerColor, triggerMode, selectedItem]);

  return (
    <Dropdown
      trigger={trigger}
      visible={dropdownVisible}
      overlay={
        <ContextSelectorDropdown
          value={selectedItem}
          setDropdownVisible={setDropdownVisible}
          setSelected={handleChange}
          onSetGroup={handleOnSetGroup}
          groups={groups}
          items={items}
          texts={texts}
          visible={dropdownVisible}
          loading={loading}
          menuItemHeight={menuItemHeight}
          dropdownWrapperStyles={dropdownWrapperStyles}
        />
      }
    >
      {customTriggerComponent ?? triggerButton}
    </Dropdown>
  );
};
export default ContextSelector;
