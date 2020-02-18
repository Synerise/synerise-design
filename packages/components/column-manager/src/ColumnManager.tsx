import * as React from 'react';
import Drawer from '@synerise/ds-drawer';
import Button from '@synerise/ds-button';
import Typography from 'antd/lib/typography';
import { CloseM, FolderM, SearchM } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import SearchInput from '@synerise/ds-dropdown/dist/elements/SearchInput/SearchInput';
import { withTheme } from 'styled-components';
import ColumnManagerActions from './ColumnManagerActions/ColumnManagerActions';

export type ColumnManagerProps = {
  showList: () => void;
  hide: () => void;
  visible: boolean;
  theme: {
    [k: string]: string;
  };
};

const ColumnManager: React.FC<ColumnManagerProps> = ({ showList, hide, visible, theme }): React.ReactNode => {
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  return (
    <Drawer visible={visible} width={338}>
      <Drawer.DrawerHeader>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 24 }}>
          <Typography.Title style={{ flex: 1, margin: 0 }} level={4}>
            Manage columns
          </Typography.Title>
          <Button type="ghost" mode="single-icon" onClick={showList}>
            <Icon component={<FolderM />} />
          </Button>
          <Button style={{ marginLeft: '8px' }} mode="single-icon" type="ghost" onClick={hide}>
            <Icon component={<CloseM />} />
          </Button>
        </div>
      </Drawer.DrawerHeader>
      <SearchInput
        onSearchChange={setSearchQuery}
        placeholder="Search"
        value={searchQuery}
        onClearInput={(): void => setSearchQuery('')}
        iconLeft={<Icon component={<SearchM />} color={theme.palette['grey-800']} />}
      />
      <Drawer.DrawerBody>
        <Drawer.DrawerContent></Drawer.DrawerContent>
        <ColumnManagerActions />
      </Drawer.DrawerBody>
    </Drawer>
  );
};
export default withTheme(ColumnManager);
