import React from 'react';
import ManageableList from '@synerise/ds-manageable-list';
import { withState } from '@dump247/storybook-state';
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import ContentItem from '@synerise/ds-manageable-list/dist/Item/ContentItem/ContentItem';
import {
  withLabel,
  withTagAndLabel,
  withContent,
  withOptions,
  withIcon,
  withExpanderAndOptions,
} from './contentItems.data';
import Tag from '@synerise/ds-tags/dist/Tag/Tag';
import { TagShape } from '@synerise/ds-tags/dist/Tag/Tag.types';
import { theme } from '@synerise/ds-core';
import styled from 'styled-components';
import Radio from '@synerise/ds-radio';
import { ItemProps } from '@synerise/ds-manageable-list/dist/Item/Item.types';
import { Input } from '@synerise/ds-input';
import { DropdownMenu, DropdownMenuItem } from '@synerise/ds-manageable-list/dist/Item/FilterItem/FilterItem.styles';
import Icon, { ShowM } from '@synerise/ds-icon';
import Button from '@synerise/ds-button';

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

  & > .ant-list {
    height: 48px;
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
const radioText = {
  text1: 'Randomization',
  text2: 'AI Engine',
};
const suffixType = {
  cruds: 'cruds',
  expander: 'expander',
  dropdown: 'dropdown',
  radio: 'radio',
};
const attachCrudKnobs = (item, knobValue) => {
  return {
    ...item,
    canUpdate: knobValue,
    canDuplicate: knobValue,
    canDelete: knobValue,
    hideHeaderSuffixOnHover: boolean('Hide suffix on hover', true),
    additionalSuffix: boolean('Show additional suffix element', false) && (
      <Button type="ghost" mode="single-icon" onClick={action('additional button action')}>
        <Icon component={<ShowM />} />
      </Button>
    ),
  };
};
const attachContentKnobs = (item, knobValue): ItemProps => {
  return {
    ...item,
    content: knobValue ? (
      <Input label={'Label'} placeholder={'Placeholder'} style={{ width: '472px' }} resetMargin />
    ) : null,
  };
};
const attachRadioKnobs = (item, knobValue): ItemProps => {
  return {
    ...item,
    headerSuffix: knobValue ? (
      <Radio.Group style={{ display: 'flex' }} onChange={action('onChange')} defaultValue="A">
        <Radio style={{ marginTop: '30px' }} disabled={boolean('disabled', false)} value="A">
          {radioText.text1}
        </Radio>
        <Radio style={{ marginTop: '30px' }} disabled={boolean('disabled', false)} value="B">
          {radioText.text2}
        </Radio>
      </Radio.Group>
    ) : null,
  };
};
const attachDropdownKnobs = (item, knobValue): ItemProps => {
  return {
    ...item,
    dropdown: knobValue ? (
      <DropdownMenu dataSource={[{ text: 'Option 1' }, { text: 'Option 2' }, { text: 'Option 3' }]} />
    ) : null,
  };
};

const getTexts = () => ({
  itemActionDuplicateTooltip: 'Duplicate',
  itemActionRenameTooltip: 'Rename',
  itemActionDeleteTooltip: 'Delete',
});

const withExpander = defaultItem => {
  const [item, setItem] = React.useState(defaultItem);
  return (
    <ContentItem
      item={defaultItem}
      greyBackground={boolean('Set grey background', false)}
      onRemove={action('onItemRemove')}
      onUpdate={item => {
        editItem(item, setItem);
      }}
      onDuplicate={action('onItemSelect')}
      texts={getTexts()}
      onExpand={(id, isExpanded) => {
        setItem({ item: { ...item, expanded: isExpanded } });
      }}
    />
  );
};
const withOption = defaultItem => {
  const [item, setItem] = React.useState(defaultItem);
  return (
    <ContentItem
      item={defaultItem}
      greyBackground={boolean('Set grey background', false)}
      onRemove={action('onItemRemove')}
      onUpdate={item => {
        editItem(item, setItem);
      }}
      onDuplicate={action('onItemSelect')}
      texts={getTexts()}
    />
  );
};
const withRadios = defaultItem => {
  return <ContentItem item={defaultItem} greyBackground={boolean('Set grey background', false)} />;
};
const withCruds = defaultItem => {
  const [item, setItem] = React.useState(defaultItem);
  return (
    <ContentItem
      item={defaultItem}
      greyBackground={boolean('Set grey background', false)}
      onRemove={action('onItemRemove')}
      onUpdate={item => {
        editItem(item, setItem);
      }}
      onDuplicate={action('onItemSelect')}
      texts={getTexts()}
    />
  );
};
const grabberWithExpander = defaultItem => {
  const [item, setItem] = React.useState(defaultItem);
  return (
    <ListWithGrabber
      onItemSelect={NOOP}
      visibleItemsLimit={1}
      onChangeOrder={NOOP}
      type="content"
      items={[defaultItem]}
      loading={false}
      changeOrderDisabled={boolean('Disable change order', false)}
      greyBackground={boolean('Set grey background', false)}
      texts={getTexts()}
      onExpand={(id, isExpanded) => {
        setItem({ item: { ...item, expanded: isExpanded } });
      }}
    />
  );
};
const grabberWithOption = defaultItem => {
  return (
    <ListWithGrabber
      onItemSelect={NOOP}
      visibleItemsLimit={1}
      onChangeOrder={NOOP}
      type="content"
      items={[defaultItem]}
      loading={false}
      changeOrderDisabled={boolean('Disable change order', false)}
      greyBackground={boolean('Set grey background', false)}
      texts={getTexts()}
    />
  );
};
const grabberWithRadios = defaultItem => {
  return (
    <ListWithGrabber
      onItemSelect={NOOP}
      visibleItemsLimit={1}
      onChangeOrder={NOOP}
      type="content"
      items={[defaultItem]}
      loading={false}
      changeOrderDisabled={boolean('Disable change order', false)}
      greyBackground={boolean('Set grey background', false)}
      texts={getTexts()}
    />
  );
};
const grabberWithCruds = defaultItem => {
  return (
    <ListWithGrabber
      onItemSelect={NOOP}
      visibleItemsLimit={1}
      onChangeOrder={NOOP}
      type="content"
      items={[defaultItem]}
      loading={false}
      changeOrderDisabled={boolean('Disable change order', false)}
      greyBackground={boolean('Set grey background', false)}
      texts={getTexts()}
    />
  );
};
const stories = {
  withExpander: withState({
    item: withContent,
  })(({ store }) => {
    const crud = boolean('Set CRUD', false);
    return (
      <ContentItem
        item={attachCrudKnobs(store.state.item, crud)}
        contentWithoutPadding={boolean('Remove padding of content', false)}
        greyBackground={boolean('Set grey background', false)}
        onRemove={action('onItemRemove')}
        onUpdate={item => {
          editItem(item, store);
        }}
        onDuplicate={action('onItemSelect')}
        texts={getTexts()}
        onExpand={(id, isExpanded) => {
          store.set({ item: { ...store.state.item, expanded: isExpanded } });
        }}
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
        onExpand={(id, isExpanded) => {
          store.set({ item: { ...store.state.item, expanded: isExpanded } });
        }}
      />
    );
  }),
  withLabel: () => {
    const selectSuffix = select('Select Suffix', suffixType, suffixType.cruds);
    const suffix = boolean('Set suffix', false);
    switch (selectSuffix) {
      case suffixType.cruds:
        return withCruds(attachCrudKnobs(withLabel, suffix));
      case suffixType.expander:
        return withExpander(attachContentKnobs(withLabel, suffix));
      case suffixType.dropdown:
        return withOption(attachDropdownKnobs(withLabel, suffix));
      case suffixType.radio:
        return withRadios(attachRadioKnobs(withLabel, suffix));
      default:
        return null;
    }
    return null;
  },
  withIconAndLabel: () => {
    const selectSuffix = select('Select Suffix', suffixType, suffixType.cruds);
    const suffix = boolean('Set suffix', false);
    switch (selectSuffix) {
      case suffixType.cruds:
        return withCruds(attachCrudKnobs(withIcon, suffix));
      case suffixType.expander:
        return withExpander(attachContentKnobs(withIcon, suffix));
      case suffixType.dropdown:
        return withOption(attachDropdownKnobs(withIcon, suffix));
      case suffixType.radio:
        return withRadios(attachRadioKnobs(withIcon, suffix));
      default:
        return null;
    }
    return null;
  },
  withTagAndLabel: () => {
    const selectSuffix = select('Select Suffix', suffixType, suffixType.cruds);
    const tagShape = select('Set tag shape', tagShapes, tagShapes.round);
    const suffix = boolean('Set suffix', false);
    switch (selectSuffix) {
      case suffixType.cruds:
        return withCruds(attachCrudKnobs({ tag: getTag(tagShape), ...withTagAndLabel }, suffix));
      case suffixType.expander:
        return withExpander(attachContentKnobs({ tag: getTag(tagShape), ...withTagAndLabel }, suffix));
      case suffixType.dropdown:
        return withOption(attachDropdownKnobs({ tag: getTag(tagShape), ...withTagAndLabel }, suffix));
      case suffixType.radio:
        return withRadios(attachRadioKnobs({ tag: getTag(tagShape), ...withTagAndLabel }, suffix));
      default:
        return null;
    }
    return null;
  },
  withGrabber: () => {
    const selectSuffix = select('Select Suffix', suffixType, suffixType.cruds);
    const suffix = boolean('Set suffix', false);
    if (selectSuffix === suffixType.cruds) {
      return grabberWithCruds(attachCrudKnobs(withLabel, suffix));
    }
    if (selectSuffix === suffixType.expander) {
      return grabberWithExpander(attachContentKnobs(withLabel, suffix));
    }
    if (selectSuffix === suffixType.dropdown) {
      return grabberWithOption(attachDropdownKnobs(withLabel, suffix));
    }
    if (selectSuffix === suffixType.radio) {
      return grabberWithRadios(attachRadioKnobs(withLabel, suffix));
    }
    return null;
  },
};

export default {
  name: 'Components/Manageable list/Content items',
  decorator,
  stories,
  Component: ContentItem,
};
