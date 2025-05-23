import React, { useEffect, useRef, useState } from 'react';
import Dropdown from '@synerise/ds-dropdown';
import { useOnClickOutside } from '@synerise/ds-utils';

import Button from '@synerise/ds-button';
import Icon, { AddM, Close3S } from '@synerise/ds-icon';
import ButtonGroup from '@synerise/ds-button-group';
import Tooltip from '@synerise/ds-tooltip';
import * as S from './IconPicker.styles';
import Overlay from './components/Overlay/Overlay';
import { IconPickerProps, SourceType, ValueTypeForSource } from './IconPicker.types';
import { useIconSourceLoader } from './hooks/useIconSourceLoader';
import { matchesSearchQuery } from './utils/matchesSearchQuery';

const IconPicker = <IconSource extends SourceType>({
  button,
  data,
  onSelect,
  trigger,
  placeholder,
  noResultMsg,
  onClear,
  selectedIcon,
  clearTooltip,
}: IconPickerProps<IconSource>) => {
  const items = useIconSourceLoader<IconSource>(data);

  const [filteredItems, setFilteredItems] = useState(items);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setOpen] = useState(false);
  const [focus, setFocus] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchQuery) {
      const groups = items
        .map(group => {
          const matching = group.items.filter(icon => icon.keywords && matchesSearchQuery(icon.keywords, searchQuery));
          return {
            ...group,
            items: matching,
          };
        })
        .filter(group => group.items.length);
      setFilteredItems(groups);
      return;
    }
    setFilteredItems(items);
  }, [searchQuery, items]);

  useOnClickOutside(ref, () => {
    setOpen(false);
    setSearchQuery('');
  });

  const onClearInput = () => {
    setSearchQuery('');
  };

  const toggleOpen = (newState: boolean) => {
    setOpen(newState);
    setFocus(newState);
  };

  const handleSelect = (value: ValueTypeForSource<IconSource>) => {
    toggleOpen(false);
    onSelect(value);
  };

  return (
    <Dropdown
      visible={isOpen}
      onVisibleChange={toggleOpen}
      trigger={trigger}
      placement="bottomRight"
      overlay={
        <S.Overlay ref={ref}>
          <Overlay
            value={searchQuery}
            onSearchChange={setSearchQuery}
            onClearInput={onClearInput}
            placeholder={placeholder}
            data={filteredItems}
            onSelect={handleSelect}
            focus={focus}
            noResultMsg={noResultMsg}
          />
        </S.Overlay>
      }
    >
      {button ||
        (!selectedIcon ? (
          <Button type="secondary" mode="icon-label">
            <Icon component={<AddM />} />
            Choose icon
          </Button>
        ) : (
          <ButtonGroup>
            <Button
              onClick={() => {
                setOpen(!isOpen);
              }}
              mode="single-icon"
              type="secondary"
            >
              <Icon component={selectedIcon} />
            </Button>
            <Button mode="single-icon" type="secondary" onClick={onClear}>
              <Tooltip title={clearTooltip}>
                <S.ClearIcon component={<Close3S />} />
              </Tooltip>
            </Button>
          </ButtonGroup>
        ))}
    </Dropdown>
  );
};

export default IconPicker;
