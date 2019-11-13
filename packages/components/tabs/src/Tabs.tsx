import * as React from 'react';
import Dropdown from '@synerise/ds-dropdown';
import List from '@synerise/ds-list';
import Icon from '@synerise/ds-icon';
import FileM from '@synerise/ds-icon/dist/icons/FileM';
import Button from '@synerise/ds-button';
import OptionHorizontalM from '@synerise/ds-icon/dist/icons/OptionHorizontalM';
import * as S from './Tabs.styles';
import Tab from './Tab/Tab';

export type TabsProps = {
  activeTab: number;
  tabs: TabItem[];
  handleTabClick: (index: number) => void;
  configuration?: Configuration;
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

const Tabs: React.FC<TabsProps> = ({ activeTab, tabs, handleTabClick, configuration }) => {
  const items: React.RefObject<HTMLButtonElement>[] = [];
  let container: HTMLDivElement | null;
  const [itemsWidths, setItemsWidths] = React.useState<number[]>([]);
  const [visibleTabs, setVisibleTabs] = React.useState<TabItem[]>(tabs);
  const [hiddenTabs, setHiddenTabs] = React.useState<TabItem[]>([]);

  const handleResize = (): void => {
    let width = 56;
    const visibleItems: TabItem[] = [];
    const hiddenItems: TabItem[] = [];
    itemsWidths.forEach((itemWidth, index) => {
      if (container && width + itemWidth < container.offsetWidth) {
        visibleItems.push(tabs[index]);
      } else {
        hiddenItems.push(tabs[index]);
      }
      width += itemWidth;
    });
    setVisibleTabs(visibleItems);
    setHiddenTabs(hiddenItems);
  };

  React.useLayoutEffect((): void => {
    const itemsWithWidths: number[] = [];
    items.forEach((item, index) => {
      itemsWithWidths[index] = item.current !== null ? item.current.offsetWidth + 24 : 0;
    });
    setItemsWidths(itemsWithWidths);
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  []);

  React.useLayoutEffect((): void => {
    if (itemsWidths.length) {
      window.addEventListener('resize', handleResize);
    }
    handleResize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsWidths]);

  const handleConfigurationAction = (): void => {
    if (configuration) {
      configuration.action();
    }
  };

  const renderHiddenTabs = (): React.ReactNode => (
    <S.TabsDropdownContainer data-testid="tabs-dropdown-container">
      {hiddenTabs.length > 0 && (
        <List
          dataSource={[hiddenTabs]}
          renderItem={(item: TabItem, index: number): React.ReactNode => (
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

  const renderDropdown = (): React.ReactNode => {
    return (hiddenTabs.length || configuration) && (
      <Dropdown data-testid="tabs-dropdown" overlay={renderHiddenTabs()}>
        <Button type="ghost" mode="single-icon">
          <Icon component={<OptionHorizontalM />} />
        </Button>
      </Dropdown>
    )
  };

  const renderVisibleTabs = (): React.ReactNode => {
    return visibleTabs.map((tab, index) => {
      const ref = React.createRef<HTMLButtonElement>();
      items[index] = ref;
      const key = `tabs-tab-${index}`;
      return (
        <Tab
          forwardedRef={ref}
          key={key}
          index={index}
          label={tab.label}
          icon={tab.icon}
          onClick={handleTabClick}
          isActive={index === activeTab}
          disabled={tab.disabled}
        />
      );
    });
  };

  return (
    <S.TabsContainer
      ref={(c): void => {
        if (!container) {
          container = c;
        }
      }}
      data-testid="tabs-container"
    >
      { renderVisibleTabs() }
      { renderDropdown() }
    </S.TabsContainer>
  );
};
export default Tabs;
