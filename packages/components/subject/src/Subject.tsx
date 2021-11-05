import * as React from 'react';
import Dropdown from '@synerise/ds-dropdown';
import { ShowM } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import SubjectTrigger from './SubjectTrigger/SubjectTrigger';
import { SubjectProps } from './Subject.types';
import * as S from './Subject.style';
import SubjectList from './SubjectList/SubjectList';

const Subject: React.FC<SubjectProps> = ({
  selectedItem,
  iconPlaceholder,
  items,
  placeholder,
  onSelectItem,
  onShowPreview,
  type = 'parameter',
  getPopupContainerOverride,
  onActivate,
  texts,
}) => {
  const [dropdownVisible, setDropdownVisible] = React.useState(false);

  const color = React.useMemo(() => {
    return type && ['event', 'context'].indexOf(type) >= 0 ? 'cyan' : 'green';
  }, [type]);

  const onDropdownVisibilityChange = React.useCallback((value: boolean) => value && onActivate && onActivate(), [
    onActivate,
  ]);

  return (
    <S.Subject>
      <Dropdown
        visible={dropdownVisible}
        getPopupContainer={getPopupContainerOverride}
        onVisibleChange={onDropdownVisibilityChange}
        overlay={
          <SubjectList
            texts={texts}
            items={items}
            onSelectItem={onSelectItem}
            hideDropdown={(): void => setDropdownVisible(false)}
          />
        }
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
        <S.ShowPreviewButton onClick={onShowPreview} type="custom-color" mode="single-icon" color={color}>
          <Icon component={<ShowM />} />
        </S.ShowPreviewButton>
      )}
    </S.Subject>
  );
};
export default Subject;
