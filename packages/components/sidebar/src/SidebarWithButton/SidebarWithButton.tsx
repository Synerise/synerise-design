import React, { useRef, useState } from 'react';

import Button from '@synerise/ds-button';
import Dropdown from '@synerise/ds-dropdown';
import Icon, { AngleDownS } from '@synerise/ds-icon';
import Menu from '@synerise/ds-menu';
import { useOnClickOutside } from '@synerise/ds-utils';

import * as S from './SidebarWithButton.styles';
import { type SidebarWithButtonProps } from './SidebarWithButton.types';

const SidebarWithButton = ({
  dataSource,
  buttonLabel,
  title,
}: SidebarWithButtonProps) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
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
        open={dropdownVisible}
        placement="bottomLeft"
        size={220}
        popoverProps={{
          testId: 'sidebar-menu',
        }}
        asChild
        overlay={
          <Dropdown.Wrapper ref={ref}>
            <Menu
              dataSource={dataSource}
              asDropdownMenu
              style={{ width: '100%' }}
            />
          </Dropdown.Wrapper>
        }
      >
        <Button
          onClick={() => setDropdownVisible(!dropdownVisible)}
          type="ghost-primary"
          mode="label-icon"
        >
          {buttonLabel}
          <Icon component={<AngleDownS />} />
        </Button>
      </Dropdown>
    </S.SidebarWithButtonWrapper>
  );
};
export default SidebarWithButton;
