import * as React from 'react';
import { useOnClickOutside } from '@synerise/ds-utils';
import SubMenu from './SubMenu/SubMenu';
import MenuContext from './MenuContext/MenuContext';
import Item from './Item/Item';
import NavigableItems from './NavigableItems/NavigableItems';
import * as S from './AppMenu.styles';
import { AppMenuProps, AppMenuSubComponents } from './AppMenu.types';

const AppMenu: React.FC<AppMenuProps> & AppMenuSubComponents = ({
  className,
  children,
  footer,
  activeItem: activeId,
  top = 0,
}) => {
  const [isOpened, setOpened] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState(activeId);
  const ref = React.useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => {
    setOpened(false);
    setActiveItem(activeId);
  });

  return (
    <S.MenuWrapper
      className={`${className || ''} menu ${isOpened ? 'menu--opened' : ''} ds-app-menu`}
      ref={ref}
      top={top}
    >
      <S.ItemsWrapper>
        <MenuContext.Provider value={{ isOpened, setOpened, activeItem, setActiveItem }}>
          <NavigableItems onHideMenu={(): void => setOpened(false)}>{children}</NavigableItems>
          {footer && (
            <>
              <S.ItemsDivider />
              {footer}
            </>
          )}
        </MenuContext.Provider>
      </S.ItemsWrapper>
    </S.MenuWrapper>
  );
};

AppMenu.SubMenu = SubMenu;
AppMenu.Item = Item;

export default AppMenu;
