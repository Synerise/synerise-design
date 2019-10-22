import * as React from 'react';
import * as S from './Tabs.styles';
import Tab from './Tab/Tab';
import Dropdown from '@synerise/ds-dropdown';
import List from '@synerise/ds-list';
import Icon from '@synerise/ds-icon';
import FileM from '@synerise/ds-icon/dist/icons/FileM';
import Button from '@synerise/ds-button';
import OptionHorizontalM from '@synerise/ds-icon/dist/icons/OptionHorizontalM';
import { RefObject } from 'react';

export type TabsProps = {
  activeTab: number;
  tabs: TabItem[];
  setActiveTab: (index: number) => void;
  configuration: Cofiguration;
};

type Cofiguration = {
  action: () => void;
  label: string;
}

type TabItem = {
  label?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

const Tabs: React.FC<TabsProps> = ({
  activeTab,
  tabs,
  setActiveTab,
  configuration,
}) => {
  let items: RefObject<HTMLButtonElement>[] = [];
  let container: HTMLDivElement;
  const [itemsWidths, setItemsWidths] = React.useState<number[]>([]);
  const [visibleTabs, setVisibleTabs] = React.useState<TabItem[]>(tabs);
  const [hiddenTabs, setHiddenTabs] = React.useState<TabItem[]>([]);

  React.useEffect(() => {
    const itemsWithWidths: number[] = [];
    items.forEach((item, index) => {
      itemsWithWidths[index] = item.current !== null ? item.current.offsetWidth + 24 : 0;
    });
    setItemsWidths(itemsWithWidths);
  }
  ,[]);

  React.useEffect(() => {
    if(itemsWidths.length){
      window.addEventListener('resize', handleResize);
      handleResize();
    }
  }, [itemsWidths]);

  const handleResize = () => {
    let width = 56;
    const visibleTabs: TabItem[] = [];
    const hiddenTabs: TabItem[] = [];
    itemsWidths.forEach((itemWidth, index) => {
      if(container && (width + itemWidth) < container.offsetWidth) {
        visibleTabs.push(tabs[index]);
      } else {
        hiddenTabs.push(tabs[index]);
      }
      width += itemWidth;
    });
    setVisibleTabs(visibleTabs);
    setHiddenTabs(hiddenTabs);
  };

  const renderHiddenTabs = () => (
    <S.TabsDropdownContainer>
      {hiddenTabs.length > 0 && (
        <List
          dataSource={[hiddenTabs]}
          renderItem={(item, index) => (
            <List.Item onSelect={() => setActiveTab(visibleTabs.length + index)} disabled={item.disabled} icon={<Icon component={<FileM />} />}>
              {(item as any).label}
            </List.Item>
          )}
        />
      )}
      { hiddenTabs.length > 0 && configuration && (
        <S.TabsDropdownDivider />
      )}
      {configuration && (
        <Button type={'ghost'} onClick={configuration.action}>
          { configuration.label }
        </Button>
      )}
    </S.TabsDropdownContainer>
  );

  return itemsWidths && (
     <S.TabsContainer ref={c => { if(!container) { container = c! }}}>
        {visibleTabs.map((tab, index) => {
          const ref = React.createRef<HTMLButtonElement>();
          items[index] = ref;
          return (
            <Tab
              forwardedRef={ref}
              key={index}
              index={index}
              label={tab.label}
              icon={tab.icon}
              onClick={setActiveTab}
              isActive={index === activeTab}
              disabled={tab.disabled}
            />
          )
        })}
       {(hiddenTabs.length || configuration) && (<Dropdown overlay={ renderHiddenTabs() }>
          <Button type={'ghost'} mode={'single-icon'}>
            <Icon component={<OptionHorizontalM />} />
          </Button>
       </Dropdown>)}
     </S.TabsContainer>
   );
};
export default Tabs;
