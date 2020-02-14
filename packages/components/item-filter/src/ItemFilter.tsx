import * as React from 'react';
import Typography from '@synerise/ds-typography';
import Drawer from '@synerise/ds-drawer';
import Button from '@synerise/ds-button';
import Tabs from '@synerise/ds-tabs';
import Icon from '@synerise/ds-icon';
import { CloseM } from '@synerise/ds-icon/dist/icons';
import SearchInput from '@synerise/ds-dropdown/dist/elements/SearchInput/SearchInput';
import SearchM from '@synerise/ds-icon/dist/icons/SearchM';

export type ItemFilterProps = {
  visible: boolean;
  hide: () => void;
};

const TABS = [
  {
    label: 'All filters',
  },
  {
    label: 'My filters',
  },
];

const ItemFilter: React.FC<ItemFilterProps> = ({ visible, hide }) => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <Drawer visible={visible} placement="right" width={676} onClose={hide}>
      <Drawer.DrawerHeader>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 24 }}>
          <Typography.Title style={{ flex: 1, margin: 0 }} level={4}>
            Example drawer
          </Typography.Title>
          <Button type="ghost" mode="single-icon" onClick={hide}>
            <Icon component={<CloseM />} />
          </Button>
        </div>
        <Tabs activeTab={activeTab} tabs={TABS} handleTabClick={setActiveTab} />
      </Drawer.DrawerHeader>
      <Drawer.DrawerBody>
        <SearchInput
          onSearchChange={setSearchQuery}
          placeholder="Search"
          value={searchQuery}
          onClearInput={(): void => setSearchQuery('')}
          iconLeft={<Icon component={<SearchM />} color="#6a7580" />}
        />
        <Drawer.DrawerContent></Drawer.DrawerContent>
      </Drawer.DrawerBody>
    </Drawer>
  );
};
export default ItemFilter;
