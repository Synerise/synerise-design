import * as React from 'react';
import { injectIntl } from 'react-intl';
import Sortable from 'react-sortablejs';

import { Tab } from './Tab/Tab';
// import { Icon } from '../';
import { CardTabsContainer, AddButton, ItemWrapper } from './CardTabs.styles';
import { Props, State } from './CardSelect.types';

class CardTabsBase extends React.Component<Props, State> {
  state: State = {
    dragging: false,
  };

  render() {
    const limitReached = this.props.maxTabCount && this.props.variants.length >= this.props.maxTabCount;
    const options = {
      disabled: !this.props.onSortTabs,
      draggable: '.card-tab-wrapper',
      handle: '.drag-handle',
      dataIdAttr: 'data-index',
      scroll: true,
      scrollSensitivity: 172,
      onStart: () => this.setState({ dragging: true }),
      onEnd: () => this.setState({ dragging: false }),
    };
    return (
      <CardTabsContainer className={this.props.className} style={this.props.style}>
        <Sortable onChange={this.props.onSortTabs} options={options}>
          {this.props.variants.map((variant, index) => (
            <ItemWrapper data-index={index} key={variant.tabId} className="card-tab-wrapper">
              {/* <Tab
                className={variant.className}
                active={index === this.props.currentTabIndex}
                variant={variant.tabLetter}
                title={variant.name}
                onClick={() => this.props.onChangeTab(index)}
                onDuplicateTab={this.props.onDuplicateTab}
                onRemoveTab={this.props.onRemoveTab}
                onChangeName={this.props.onChangeName}
                nameInputProps={this.props.nameInputProps}
                tabIndex={index}
                variants={this.props.variants}
                maxTabCount={this.props.maxTabCount}
                activeColor={this.props.activeColor}
                tabsColorMap={this.props.tabsColorMap}
                dragging={this.state.dragging}
                showDragHandle={!!this.props.onSortTabs && !this.props.hideDragHandle}
                intl={this.props.intl}
                messages={this.props.messages}
              /> */}
            </ItemWrapper>
          ))}
          {this.props.onAddTab && (
            <AddButton type="dashed" onClick={this.props.onAddTab} disabled={limitReached}>
              {/* <Icon name="add-1-m" /> */}
            </AddButton>
          )}
        </Sortable>
      </CardTabsContainer>
    );
  }
}

// @ts-ignore
export default injectIntl(CardTabsBase);
