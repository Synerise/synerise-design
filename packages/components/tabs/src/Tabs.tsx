import * as React from 'react';
import Dropdown from '@synerise/ds-dropdown';
import Icon from '@synerise/ds-icon';
import OptionHorizontalM from '@synerise/ds-icon/dist/icons/OptionHorizontalM';
import { useResize } from '@synerise/ds-utils';
import Menu from '@synerise/ds-menu';
import * as S from './Tabs.styles';
import Tab from './Tab/Tab';
import { TabsProps, TabWithRef } from './Tabs.types';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const NOOP = (): void => {};
const MARGIN_BETWEEN_TABS = 24;
const DROPDOWN_TRIGGER_SIZE = 32;

const Tabs: React.FC<TabsProps> = ({
  activeTab,
  tabs,
  handleTabClick,
  configuration,
  underscore,
  block,
  visible = true,
}) => {
  const containerRef = React.useRef<HTMLDivElement>();
  const { width } = useResize(containerRef, visible);
  const [renderHelperTabs, setRenderHelperTabs] = React.useState(true);
  const [items, setItems] = React.useState<TabWithRef[]>([]);
  const [itemsWidths, setItemsWidths] = React.useState<number[]>([]);
  const [visibleTabs, setVisibleTabs] = React.useState<TabWithRef[]>([]);
  const [hiddenTabs, setHiddenTabs] = React.useState<TabWithRef[]>([]);

  React.useEffect(() => {
    const newTabs = tabs.map(tab => {
      return {
        ...tab,
        ref: React.createRef<HTMLButtonElement>(),
      };
    });
    setRenderHelperTabs(true);
    setItems(newTabs);
  }, [tabs]);

  React.useEffect((): void => {
    const itemsWithWidths: number[] = [];
    items.forEach((item, index) => {
      itemsWithWidths[index] = item.ref.current !== null ? item.ref.current.offsetWidth + MARGIN_BETWEEN_TABS : 0;
    });
    setItemsWidths(itemsWithWidths);
    setRenderHelperTabs(false);
  }, [items]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect((): void => {
    let tabsWidth = DROPDOWN_TRIGGER_SIZE + MARGIN_BETWEEN_TABS;
    const visibleItems: TabWithRef[] = [];
    const hiddenItems: TabWithRef[] = [];
    itemsWidths.forEach((itemWidth, index) => {
      if (containerRef && tabsWidth + itemWidth < width) {
        visibleItems.push(items[index]);
      } else {
        hiddenItems.push(items[index]);
      }
      tabsWidth += itemWidth;
    });
    setVisibleTabs(visibleItems);
    setHiddenTabs(hiddenItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsWidths, width]);

  const handleConfigurationAction = React.useCallback((): void => {
    configuration && configuration.action();
  }, [configuration]);

  const renderHiddenTabs = React.useMemo(() => {
    return (
      <S.TabsDropdownContainer data-testid="tabs-dropdown-container">
        {hiddenTabs.length > 0 && (
          <Menu>
            {hiddenTabs.map((item, index) => (
              <Menu.Item
                // eslint-disable-next-line react/no-array-index-key
                key={`${item.label}-dropdown-${index}`}
                onSelect={(): void => handleTabClick(visibleTabs.length + index)}
                disabled={item.disabled}
              >
                {item.label}
              </Menu.Item>
            ))}
          </Menu>
        )}
        {hiddenTabs.length > 0 && configuration && <S.TabsDropdownDivider />}
        {configuration && (
          <Menu>
            <Menu.Item
              key="configuration-btn"
              onSelect={handleConfigurationAction}
              disabled={!!configuration?.disabled}
            >
              {configuration.label}
            </Menu.Item>
          </Menu>
        )}
      </S.TabsDropdownContainer>
    );
  }, [hiddenTabs, configuration, handleConfigurationAction, handleTabClick, visibleTabs.length]);

  const renderDropdown = (): React.ReactElement => {
    return (
      <>
        {(hiddenTabs.length || configuration) && (
          <Dropdown
            trigger={['click']}
            data-testid="tabs-dropdown"
            overlay={renderHiddenTabs}
            disabled={!!configuration?.disabled}
            overlayStyle={{ boxShadow: '0 4px 12px 0 rgba(35, 41, 54, 0.07)' }}
          >
            <S.ShowHiddenTabsTrigger type="ghost" mode="single-icon" disabled={!!configuration?.disabled} tabIndex={0}>
              <Icon component={<OptionHorizontalM />} />
            </S.ShowHiddenTabsTrigger>
          </Dropdown>
        )}
      </>
    );
  };

  const renderVisibleTabs = React.useMemo(() => {
    return (
      <>
        {visibleTabs.map((tab, index) => {
          const key = `tabs-tab-${index}`;
          return (
            <Tab
              underscore={underscore}
              forwardedRef={tab.ref}
              key={key}
              index={index}
              label={tab.label}
              icon={tab.icon}
              onClick={handleTabClick}
              isActive={index === activeTab}
              disabled={tab.disabled}
              block={block}
              suffixel={tab.suffixel}
            />
          );
        })}
      </>
    );
  }, [visibleTabs, activeTab, handleTabClick, underscore, block]);

  const renderHelpers = React.useMemo(() => {
    return (
      <S.HiddenTabs className="ds-hidden-helper">
        {items.map((tab, index) => {
          const key = `tabs-tab-helper-${index}`;
          return (
            <Tab
              className="hidden"
              underscore={underscore}
              forwardedRef={tab.ref}
              key={key}
              index={index}
              onClick={NOOP}
              label={tab.label}
              icon={tab.icon}
              block={block}
            />
          );
        })}
      </S.HiddenTabs>
    );
  }, [items, underscore, block]);

  return (
    <>
      <S.TabsContainer
        className="ds-tabs"
        ref={containerRef as React.RefObject<HTMLDivElement>}
        data-testid="tabs-container"
        block={block}
      >
        {renderVisibleTabs}
        {renderDropdown()}
      </S.TabsContainer>
      {/* rendering hidden tabs to measure their width */}
      {!block && renderHelperTabs && renderHelpers}
    </>
  );
};

Tabs.defaultProps = {
  underscore: true,
};

export default Tabs;
