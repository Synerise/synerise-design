import * as React from 'react';
import Drawer from '@synerise/ds-drawer';
import Button from '@synerise/ds-button';
import Tabs from '@synerise/ds-tabs';
import { action } from '@storybook/addon-actions';
import Typography from 'antd/lib/typography';
import { SearchM } from '@synerise/ds-icon/dist/icons';
import Icon from '@synerise/ds-icon';
import Result from '@synerise/ds-result';
import { select } from '@storybook/addon-knobs';
import ArrowLeftM from '@synerise/ds-icon/dist/icons/ArrowLeftM';
import CloseM from '@synerise/ds-icon/dist/icons/CloseM';
import SearchBar from '@synerise/ds-search-bar';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { FormattedMessage } from 'react-intl';

const TABS = [
  {
    label: 'Design',
  },
  {
    label: 'Data',
  },
  {
    label: 'Validation',
  },
  {
    label: 'Layout',
  }
]
const texts = {
  noResults: <FormattedMessage id="DS.ITEM-FILTER.NO-RESULTS" />,
}
const headerTypes = {
  singleTitle: 'singleTitle',
  singleTitleWithBackIcon: 'singleTitleWithBackIcon',
};

const closeActionTypes = {
  twoButtons: "twoButtons",
  singleCloseIcon: "singleCloseIcon",
}

const renderDrawerContent  = (query) =>{
  const content = ( query && query.length>0) ? <Result type="no-results" noSearchResults description={texts.noResults} /> : <div>Put some content here</div>;
  return content;
}

const renderBackIcon = (headerType,onBackClickHandler) =>{
  if(headerType === headerTypes.singleTitleWithBackIcon){
    return (<Drawer.DrawerHeaderBack>
      <Button type="ghost" mode="single-icon" onClick={onBackClickHandler} data-testid="ds-item-filter-close-button">
        <Icon component={<ArrowLeftM />} />
      </Button>
    </Drawer.DrawerHeaderBack>)
  }
  else return null;
}

const renderActionButtons = (closeActionType, actionClickHandler) =>{
      if(closeActionType === closeActionTypes.singleCloseIcon){
      return (
        <React.Fragment>
          <Button type="ghost" mode="single-icon" onClick={actionClickHandler} data-testid="ds-item-filter-close-button">
            <Icon component={<CloseM />} />
          </Button>
        </React.Fragment>
      )}
      else return (
        <React.Fragment>
          <Button type={'ghost'} onClick={actionClickHandler}>Cancel</Button>
          <Button style={{marginLeft: '8px'}} type={'primary'} onClick={actionClickHandler}>Save</Button>
        </React.Fragment>
      )

}
const stories = {
  default: () => {
    const [drawerVisible, setDrawerVisible] = React.useState(false);
    let headerType = select('Set header type', headerTypes, headerTypes.singleTitle);
    let closeActionType = select('Set close action type', closeActionTypes, closeActionTypes.twoButtons);
    return (
      <div>
        <Button onClick={() => setDrawerVisible(!drawerVisible)} type='primary'>Show drawer</Button>
        <Drawer
          visible={drawerVisible}
          placement='right'
          width={676}
          onClose={() => setDrawerVisible(false)}
        >
          <Drawer.DrawerHeader>
          <Drawer.DrawerHeaderBar>
                {renderBackIcon(headerType,()=>setDrawerVisible(false))}
              <Typography.Title style={{flex: 1, margin: 0,}} level={4}>Title</Typography.Title>
              {renderActionButtons(closeActionType,()=>setDrawerVisible(false))}
        </Drawer.DrawerHeaderBar>
          </Drawer.DrawerHeader>
          <Drawer.DrawerBody>
            <Drawer.DrawerContent>
              {renderDrawerContent()}
            </Drawer.DrawerContent>
          </Drawer.DrawerBody>
        </Drawer>
      </div>
    )
  },
  withSearchBar: () => {
    const [drawerVisible, setDrawerVisible] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState('');
    let headerType = select('Set header type', headerTypes, headerTypes.singleTitle);
    let closeActionType = select('Set close action type', closeActionTypes, closeActionTypes.twoButtons);
    return (
      <div>
        <Button onClick={() => setDrawerVisible(!drawerVisible)} type='primary'>Show drawer</Button>
        <Drawer
          visible={drawerVisible}
          placement='right'
          width={676}
          onClose={() => setDrawerVisible(false)}
        >
          <Drawer.DrawerHeaderWithoutPadding>
            <Drawer.DrawerHeader>
              <Drawer.DrawerHeaderBar>
                {renderBackIcon(headerType,()=>setDrawerVisible(false))}
                <Typography.Title style={{flex: 1, margin: 0,}} level={4}>Title</Typography.Title>
                {renderActionButtons(closeActionType,()=>setDrawerVisible(false))}
               </Drawer.DrawerHeaderBar>
            </Drawer.DrawerHeader>
            <SearchBar
              disabled={false}
              borderRadius={false}
              autofocus={false}
              iconLeft={<Icon component={<SearchM />} color={theme.palette['grey-600']} />}
              value={searchQuery}
              onSearchChange={targetValue => setSearchQuery(targetValue)}
              placeholder={"Search"}
              onClearInput={()=>setSearchQuery('')}
              clearTooltip={'Clear'}
            />
          </Drawer.DrawerHeaderWithoutPadding>
          <Drawer.DrawerBody>
            <Drawer.DrawerContent>
              {renderDrawerContent(searchQuery)}
            </Drawer.DrawerContent>
          </Drawer.DrawerBody>
        </Drawer>
      </div>
    )
  },
  withTabs: () => {
    const [drawerVisible, setDrawerVisible] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState(0);
    let headerType = select('Set header type', headerTypes, headerTypes.singleTitle);
    let closeActionType = select('Set close action type', closeActionTypes, closeActionTypes.twoButtons);
    return (
      <div>
        <Button onClick={() => setDrawerVisible(!drawerVisible)} type='primary'>Show drawer</Button>
        <Drawer
          visible={drawerVisible}
          placement='right'
          width={676}
          onClose={() => setDrawerVisible(false)}
        >
          <Drawer.DrawerHeaderWithoutPadding>
            <Drawer.DrawerHeader>
              <Drawer.DrawerHeaderBar>
                {renderBackIcon(headerType,()=>setDrawerVisible(false))}
                <Typography.Title style={{flex: 1, margin: 0,}} level={4}>Title</Typography.Title>
                {renderActionButtons(closeActionType,()=>setDrawerVisible(false))}
              </Drawer.DrawerHeaderBar>
              <Tabs activeTab={activeTab} tabs={TABS} handleTabClick={setActiveTab} configuration={{label: 'Configure', action: action('onConfigurationClick')}} />
            </Drawer.DrawerHeader>
          </Drawer.DrawerHeaderWithoutPadding>
          <Drawer.DrawerBody>
            <Drawer.DrawerContent>
              {renderDrawerContent()}
            </Drawer.DrawerContent>
          </Drawer.DrawerBody>
        </Drawer>
      </div>
    )
  },
  withSearchAndTabs: () => {
    const [drawerVisible, setDrawerVisible] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState(0);
    const [searchQuery, setSearchQuery] = React.useState('');
    let headerType = select('Set header type', headerTypes, headerTypes.singleTitle);
    let closeActionType = select('Set close action type', closeActionTypes, closeActionTypes.twoButtons);
    return (
      <div>
        <Button onClick={() => setDrawerVisible(!drawerVisible)} type='primary'>Show drawer</Button>
        <Drawer
          visible={drawerVisible}
          placement='right'
          width={676}
          onClose={() => setDrawerVisible(false)}
        >
          <Drawer.DrawerHeaderWithoutPadding>
            <Drawer.DrawerHeader>
              <Drawer.DrawerHeaderBar>
                {renderBackIcon(headerType,()=>setDrawerVisible(false))}
                <Typography.Title style={{flex: 1, margin: 0,}} level={4}>Title</Typography.Title>
                {renderActionButtons(closeActionType,()=>setDrawerVisible(false))}
              </Drawer.DrawerHeaderBar>
              <Tabs activeTab={activeTab} tabs={TABS} handleTabClick={setActiveTab} configuration={{label: 'Configure', action: action('onConfigurationClick')}} />
            </Drawer.DrawerHeader>
            <SearchBar
              disabled={false}
              borderRadius={false}
              autofocus={false}
              iconLeft={<Icon component={<SearchM />} color={theme.palette['grey-600']} />}
              value={searchQuery}
              onSearchChange={targetValue => setSearchQuery(targetValue)}
              placeholder={"Search"}
              onClearInput={()=>setSearchQuery('')}
              clearTooltip={'Clear'}
            />
          </Drawer.DrawerHeaderWithoutPadding>
          <Drawer.DrawerBody>
            <Drawer.DrawerContent>
              {renderDrawerContent(searchQuery)}
            </Drawer.DrawerContent>
          </Drawer.DrawerBody>
        </Drawer>
      </div>
    )
  },
};

export default {
  name: 'Components|Drawer',
  config: {},
  stories,
  Component: Drawer,
}
