import * as React from 'react';
import Dropdown from '@synerise/ds-dropdown';
import List from '@synerise/ds-list';
import Icon from '@synerise/ds-icon';
import FileM from '@synerise/ds-icon/dist/icons/FileM';
import Button from '@synerise/ds-button';
import OptionHorizontalM from '@synerise/ds-icon/dist/icons/OptionHorizontalM';
import * as S from './Tabs.styles';
import Tab from './Tab/Tab';
import useResize from './utils/useResize';

export type TabsProps = {
  activeTab: number;
  tabs: TabItem[];
  handleTabClick: (index: number) => void;
  configuration?: Configuration;
  underscore?: boolean;
};

type Configuration = {
  action: () => void;
  label: string;
};

export type TabItem = {
  label?: string | React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
};

type TabWithRef = TabItem & {
  ref: React.RefObject<HTMLButtonElement>;
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const NOOP = (): void => {};

const Tabs: React.FC<TabsProps> = ({ activeTab, tabs, handleTabClick, configuration, underscore }) => {
  const containerRef = React.useRef<HTMLDivElement>();
  const { width } = useResize(containerRef);
  const [renderHelperTabs, setRenderHelperTabs] = React.useState(false);
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
      itemsWithWidths[index] = item.ref.current !== null ? item.ref.current.offsetWidth + 24 : 0;
    });
    setItemsWidths(itemsWithWidths);
    setRenderHelperTabs(false);
  }, [items]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect((): void => {
    let tabsWidth = 56;
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
  }, [itemsWidths, width]);

  const handleConfigurationAction = React.useCallback((): void => {
    configuration && configuration.action();
  }, [configuration]);

  const renderHiddenTabs = React.useMemo(() => {
    return (
      <S.TabsDropdownContainer data-testid="tabs-dropdown-container">
        {hiddenTabs.length > 0 && (
          <List
            dataSource={[hiddenTabs]}
            renderItem={(item: TabWithRef, index: number): React.ReactNode => (
              <List.Item
                onSelect={(): void => handleTabClick(visibleTabs.length + index)}
                disabled={item.disabled}
                icon={<Icon component={<FileM />} />}
              >
                {item.label}
              </List.Item>
            )}
          />
        )}
        {hiddenTabs.length > 0 && configuration && <S.TabsDropdownDivider />}
        {configuration && (
          <Button type="ghost" onClick={handleConfigurationAction}>
            {configuration.label}
          </Button>
        )}
      </S.TabsDropdownContainer>
    );
  }, [hiddenTabs, configuration]);

  const renderDropdown = (): React.ReactElement => {
    return (
      <>
        {(hiddenTabs.length || configuration) && (
          <Dropdown trigger={['click']} data-testid="tabs-dropdown" overlay={renderHiddenTabs}>
            <S.TabsShowHiddenTabsButton type="ghost" mode="single-icon">
              <Icon component={<OptionHorizontalM />} />
            </S.TabsShowHiddenTabsButton>
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
            />
          );
        })}
      </>
    );
  }, [visibleTabs, activeTab]);

  const renderHelpers = React.useMemo(() => {
    return (
      <S.HiddenTabs className="ds-hidden-helper">
        {items.map((tab, index) => {
          const key = `tabs-tab-${tab.label}`;
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
            />
          );
        })}
      </S.HiddenTabs>
    );
  }, [items]);

  return (
    <>
      <S.TabsContainer
        className="ds-tabs"
        /* eslint-disable-next-line @typescript-eslint/ban-ts-ignore */
        // @ts-ignore
        ref={containerRef}
        data-testid="tabs-container"
      >
        {renderVisibleTabs}
        {renderDropdown()}
      </S.TabsContainer>
      {/* rendering hidden tabs to measure their width */}
      {renderHelperTabs && renderHelpers}
    </>
  );
};

Tabs.defaultProps = {
  underscore: true,
};

export default Tabs;
