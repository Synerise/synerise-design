import * as React from 'react';
import Button from '@synerise/ds-button/dist/Button';
import Icon from '@synerise/ds-icon';
import AngleDownS from '@synerise/ds-icon/dist/icons/AngleDownS';
import Dropdown from '@synerise/ds-dropdown';
import { useOnClickOutside } from '@synerise/ds-utils';
import Menu from '@synerise/ds-menu';
import { SidebarWithButtonProps } from './SidebarWithButton.types';
import * as S from './SidebarWithButton.styles';

const SidebarWithButton: React.FC<SidebarWithButtonProps> = ({ dataSource, buttonLabel, title }) => {
  const [dropdownVisible, setDropdownVisible] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    setDropdownVisible(false);
  });
  return (
    <S.SidebarWithButtonWrapper className="ds-SidebarWithButton">
      <S.TextWrapper>
        <span>{title}</span>
      </S.TextWrapper>
      <Dropdown
        overlayStyle={{ borderRadius: '3px' }}
        visible={dropdownVisible}
        placement="bottomLeft"
        overlay={
          <Dropdown.Wrapper style={{ width: '220px' }} ref={ref}>
            <Menu dataSource={dataSource} asDropdownMenu style={{ width: '100%' }} />
          </Dropdown.Wrapper>
        }
      >
        <Button onClick={(): void => setDropdownVisible(!dropdownVisible)} type="ghost-primary" mode="label-icon">
          {buttonLabel}
          <Icon component={<AngleDownS />} />
        </Button>
      </Dropdown>
    </S.SidebarWithButtonWrapper>
  );
};
export default SidebarWithButton;
