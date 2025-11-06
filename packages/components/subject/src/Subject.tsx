import React, { useEffect } from 'react';

import Dropdown from '@synerise/ds-dropdown';
import Icon, { ShowM } from '@synerise/ds-icon';

import * as S from './Subject.style';
import { type SubjectProps } from './Subject.types';
import SubjectList from './SubjectList/SubjectList';
import SubjectTrigger from './SubjectTrigger/SubjectTrigger';

const Subject = ({
  selectedItem,
  iconPlaceholder,
  items,
  placeholder,
  onSelectItem,
  onShowPreview,
  type = 'parameter',
  getPopupContainerOverride,
  onActivate,
  onDeactivate,
  texts,
  opened,
}: SubjectProps) => {
  const [dropdownVisible, setDropdownVisible] = React.useState(false);

  const color = React.useMemo(() => {
    return type && ['event', 'context'].indexOf(type) >= 0 ? 'cyan' : 'green';
  }, [type]);

  const onDropdownVisibilityChange = React.useCallback(
    (value: boolean) => {
      value && onActivate && onActivate('');
      setDropdownVisible(value);
    },
    [onActivate],
  );

  useEffect(() => {
    setDropdownVisible(Boolean(opened));
  }, [opened]);

  return (
    <S.Subject>
      <Dropdown
        open={dropdownVisible}
        getPopupContainer={getPopupContainerOverride}
        onOpenChange={onDropdownVisibilityChange}
        onDismiss={onDeactivate}
        size="medium"
        asChild
        overlay={
          <SubjectList
            texts={texts}
            items={items}
            onSelectItem={onSelectItem}
            hideDropdown={(): void => setDropdownVisible(false)}
          />
        }
        popoverProps={{
          testId: 'subject',
        }}
      >
        <SubjectTrigger
          onClick={(): void => setDropdownVisible(true)}
          color={color}
          iconPlaceholder={iconPlaceholder}
          placeholder={placeholder}
          selectedItem={selectedItem}
        />
      </Dropdown>
      {onShowPreview && (
        <S.ShowPreviewButton
          onClick={onShowPreview}
          type="custom-color"
          mode="single-icon"
          color={color}
        >
          <Icon component={<ShowM />} />
        </S.ShowPreviewButton>
      )}
    </S.Subject>
  );
};
export default Subject;
