import * as React from 'react';
import * as S from './Tabs.styles';
import Tab, {TabProps} from './Tab/Tab';

export type TabsProps = {
   activeTab: number;
   tabs: TabProps[];
   setActiveTab: (index: number) => void;
};

const Tabs: React.FC<TabsProps> = ({
  activeTab,
  tabs,
  setActiveTab,
}) => {
   return (
     <S.TabsContainer>
        {tabs.map((tab, index) => (
           <Tab
             key={index}
             index={index}
             label={tab.label}
             icon={tab.icon}
             onClick={setActiveTab}
             isActive={index === activeTab}
           />
        ))}
     </S.TabsContainer>
   );
};
export default Tabs;
