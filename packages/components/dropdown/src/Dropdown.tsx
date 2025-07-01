import AntdDropdown, {
  type DropDownProps as AntDropDownProps,
  type DropdownButtonProps,
} from 'antd/lib/dropdown';
import React, {
  type ComponentType,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import '@synerise/ds-core/dist/js/style';
import SearchBar from '@synerise/ds-search-bar/';
import { getPopupContainer } from '@synerise/ds-utils';

import { OverlayWrapper, Wrapper } from './Dropdown.styles';
import BackAction from './elements/BackAction/BackAction';
import BottomAction from './elements/BottomAction/BottomAction';
import TextTrigger from './elements/TextTrigger/TextTrigger';
import './style/index.less';

export type DropdownProps = AntDropDownProps & {
  destroyPopupOnHide?: boolean;
  hideOnItemClick?: string | boolean;
};

type DropdownButtonType = ComponentType<DropdownButtonProps>;

const topPlacements = ['topLeft', 'topRight', 'topCenter'];
type SubComponents = {
  Wrapper: typeof Wrapper;
  SearchInput: typeof SearchBar;
  BottomAction: typeof BottomAction;
  BackAction: typeof BackAction;
  Button: DropdownButtonType;
  TextTrigger: typeof TextTrigger;
};

const Dropdown: ComponentType<DropdownProps> & SubComponents = ({
  hideOnItemClick,
  placement,
  dropdownRender,
  visible,
  open,
  onVisibleChange,
  onOpenChange,
  overlay,
  ...rest
}: DropdownProps) => {
  const openMerged = open !== undefined ? open : visible;
  const onOpenChangeMerged =
    onOpenChange !== undefined ? onOpenChange : onVisibleChange;

  const [isOpen, setIsOpen] = useState(openMerged || false);
  const overlayWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    openMerged !== undefined && setIsOpen(openMerged);
  }, [openMerged]);

  const handleOpenChange = (newIsOpen: boolean) => {
    onOpenChangeMerged && onOpenChangeMerged(newIsOpen);
    setIsOpen(newIsOpen);
  };
  const offsetVertical =
    topPlacements.find((topPlacement) => topPlacement === placement) !==
    undefined
      ? -8
      : 8;

  const renderContent = useCallback(
    (originNode: ReactNode) => {
      if (overlay) {
        return typeof overlay === 'function' ? overlay() : overlay;
      }
      return dropdownRender && dropdownRender(originNode);
    },
    [dropdownRender, overlay],
  );

  const renderOverlay = useCallback(
    (originNode: ReactNode) => (
      <OverlayWrapper ref={overlayWrapperRef}>
        {renderContent(originNode)}
      </OverlayWrapper>
    ),
    [renderContent],
  );

  useEffect(() => {
    const handleOverlayClick = (event: MouseEvent) => {
      if (
        overlayWrapperRef.current &&
        hideOnItemClick &&
        event.target instanceof HTMLElement
      ) {
        const itemSelector =
          typeof hideOnItemClick === 'string'
            ? hideOnItemClick
            : '[role="menuitem"]';
        const listItem = event.target.closest(itemSelector);
        if (overlayWrapperRef.current.contains(listItem)) {
          setIsOpen(false);
        }
      }
    };
    const overlayNode = overlayWrapperRef.current;
    overlayNode && overlayNode.addEventListener('click', handleOverlayClick);
    return () => {
      overlayNode &&
        overlayNode.removeEventListener('click', handleOverlayClick);
    };
  });

  return (
    <AntdDropdown
      getPopupContainer={getPopupContainer}
      align={{ offset: [0, offsetVertical] }}
      trigger={['click']}
      open={isOpen}
      onOpenChange={handleOpenChange}
      dropdownRender={renderOverlay}
      placement={placement}
      {...rest}
    />
  );
};

Dropdown.Wrapper = Wrapper;
Dropdown.SearchInput = SearchBar;
Dropdown.BottomAction = BottomAction;
Dropdown.BackAction = BackAction;
Dropdown.Button = AntdDropdown.Button;
Dropdown.TextTrigger = TextTrigger;

export default Dropdown;
