import * as React from 'react';
import ManageableList from '@synerise/ds-manageable-list';
import { withState } from '@dump247/storybook-state';
import { action } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';
import ContentItem from '@synerise/ds-manageable-list/dist/Item/ContentItem/ContentItem';
import {
  withLabel,
  withTagAndLabel,
  withContent,
  withOptions,
  withIcon,
  withExpanderAndOptions,
} from './contentItems.data';
import Tag, { TagShape } from '@synerise/ds-tags/dist/Tag/Tag';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import styled from 'styled-components';

const decorator = storyFn => (
  <div style={{ width: '520px' }}>
    <div style={{ background: '#fff', width: '520px' }}>{storyFn()}</div>
  </div>
);
export const ListWithGrabber = styled(props => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <ManageableList {...props} />
))`
  padding: 0;
  .sortable-list > div {
    margin: 0;
  }
  margin-bottom: 16px;
  
  & > .ant-list{
    height:48px;
  }
`;

const NOOP = () => {};
const editItem = (item, store): void => {
  const updatedItem = store.state.item;
  updatedItem.name = item.name;
  store.set({ item: updatedItem });
};
const tagShapes = {
  round: TagShape.SINGLE_CHARACTER_ROUND,
  square: TagShape.SINGLE_CHARACTER_SQUARE,
};
const getTag = shape => (
  <Tag name={'A'} shape={shape} color={theme.palette['grey-200']} textColor={theme.palette['grey-500']} />
);
const attachCrudKnobs = (item, knobValue) => {
  return { ...item, canUpdate: knobValue, canDuplicate: knobValue, canDelete: knobValue };
};

const getTexts = () => ({
  itemActionDuplicateTooltip: 'Duplicate',
  itemActionRenameTooltip: 'Rename',
  itemActionDeleteTooltip: 'Delete',
});

const stories = {
  withLabel: withState({
    item: withLabel,
  })(({ store }) => {
    const crud = boolean('Set CRUD', false);
    return (
      <ContentItem
        item={attachCrudKnobs(store.state.item, crud)}
        greyBackground={boolean('Set grey background', false)}
        onRemove={action('onItemRemove')}
        onUpdate={item => {
          editItem(item, store);
        }}
        onDuplicate={action('onItemSelect')}
        texts={getTexts()}
      />
    );
  }),
  withIconAndLabel: withState({
    item: withIcon,
  })(({ store }) => {
    const crud = boolean('Set CRUD', false);
    return (
      <ContentItem
        item={attachCrudKnobs(store.state.item, crud)}
        greyBackground={boolean('Set grey background', false)}
        onRemove={action('onItemRemove')}
        onUpdate={item => {
          editItem(item, store);
        }}
        onDuplicate={action('onItemSelect')}
        texts={getTexts()}
      />
    );
  }),
  withTagAndLabel: withState({
    item: withTagAndLabel,
  })(({ store }) => {
    const crud = boolean('Set CRUD', false);
    const tagShape = select('Set tag shape', tagShapes, tagShapes.round);
    return (
      <ContentItem
        item={attachCrudKnobs(
          {
            tag: getTag(tagShape),
            ...store.state.item,
          },
          crud
        )}
        greyBackground={boolean('Set grey background', false)}
        onRemove={action('onItemRemove')}
        onUpdate={item => {
          editItem(item, store);
        }}
        onDuplicate={action('onItemSelect')}
        texts={getTexts()}
      />
    );
  }),
  withExpander: withState({
    item: withContent,
  })(({ store }) => {
    const crud = boolean('Set CRUD', false);
    return (
      <ContentItem
        item={attachCrudKnobs(store.state.item, crud)}
        greyBackground={boolean('Set grey background', false)}
        onRemove={action('onItemRemove')}
        onUpdate={item => {
          editItem(item, store);
        }}
        onDuplicate={action('onItemSelect')}
        texts={getTexts()}
        onExpand={(id, isExpanded)=>{store.set({item: {...store.state.item, expanded: isExpanded}})}}

      />
    );
  }),
  withOptions: withState({
    item: withOptions,
  })(({ store }) => {
    const crud = boolean('Set CRUD', false);
    return (
      <ContentItem
        item={attachCrudKnobs(store.state.item, crud)}
        greyBackground={boolean('Set grey background', false)}
        onRemove={action('onItemRemove')}
        onUpdate={item => {
          editItem(item, store);
        }}
        onDuplicate={action('onItemSelect')}
        texts={getTexts()}
      />
    );
  }),
  withExpanderAndOptions: withState({
    item: withExpanderAndOptions,
  })(({ store }) => {
    const crud = boolean('Set CRUD', false);
    return (
      <ContentItem
        item={attachCrudKnobs(store.state.item, crud)}
        greyBackground={boolean('Set grey background', false)}
        onRemove={action('onItemRemove')}
        onUpdate={item => {
          editItem(item, store);
        }}
        onDuplicate={action('onItemSelect')}
        texts={getTexts()}
        onExpand={(id, isExpanded)=>{store.set({item: {...store.state.item, expanded: isExpanded}})}}

      />
    );
  }),
  withGrabber: withState({
    item: withLabel,
  })(({ store }) => {
    const crud = boolean('Set CRUD', false);

    return (
      <ListWithGrabber
        onItemSelect={NOOP}
        maxToShowItems={1}
        onChangeOrder={NOOP}
        type="content"
        items={[attachCrudKnobs(store.state.item, crud)]}
        loading={false}
        changeOrderDisabled={boolean('Disable change order', false)}
        greyBackground={boolean('Set grey background', false)}
        texts={getTexts()}
      />
    );
  }),
};

export default {
  name: 'manageable list/Content items',
  decorator,
  stories,
  Component: ContentItem,
};
