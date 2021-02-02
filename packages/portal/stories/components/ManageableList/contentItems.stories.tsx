import * as React from 'react';
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
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import styled from 'styled-components';
import Radio from '@synerise/ds-radio';
import { ItemProps } from '@synerise/ds-manageable-list/dist/Item/Item.types';
import { Input } from '@synerise/ds-input';
import { DropdownMenu, DropdownMenuItem } from '@synerise/ds-manageable-list/dist/Item/FilterItem/FilterItem.styles';

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
const radio = (
  <Radio.Group style={{display: 'flex'}} onChange={action('onChange')} defaultValue="A">
    <Radio style={{marginTop: '30px'}} disabled={boolean('disabled', false)} value="A">
      {radioText.text1}
    </Radio>
    <Radio style={{marginTop: '30px'}} disabled={boolean('disabled', false)} value="B">
      {radioText.text2}
    </Radio>
  </Radio.Group>
);
const suffixType = {
  cruds: 'cruds',
  expander: 'expander',
  dropdown: 'dropdown',
  radio: 'radio',
};
const attachCrudKnobs = (item, knobValue) => {
  return { ...item, canUpdate: knobValue, canDuplicate: knobValue, canDelete: knobValue };
};
const attachContentKnobs = (item, knobValue): ItemProps => {
  return { ...item, content: knobValue ? <Input label={'Label'} placeholder={'Placeholder'} style={{ width: '472px' }} resetMargin /> : null };
};
const attachRadioKnobs = (item, knobValue): ItemProps => {
  return { ...item, headerSuffix: knobValue ? <Radio.Group style={{display: 'flex'}} onChange={action('onChange')} defaultValue="A">
      <Radio style={{marginTop: '30px'}} disabled={boolean('disabled', false)} value="A">
        {radioText.text1}
      </Radio>
      <Radio style={{marginTop: '30px'}} disabled={boolean('disabled', false)} value="B">
        {radioText.text2}
      </Radio>
    </Radio.Group> : null };
};
const attachDropdownKnobs = (item, knobValue): ItemProps => {
  return { ...item, dropdown: knobValue ? <DropdownMenu>
      <DropdownMenuItem> Option 1</DropdownMenuItem>
      <DropdownMenuItem> Option 2 </DropdownMenuItem>
      <DropdownMenuItem> Option 3 </DropdownMenuItem>
    </DropdownMenu> : null  };
};

const getTexts = () => ({
  itemActionDuplicateTooltip: 'Duplicate',
  itemActionRenameTooltip: 'Rename',
  itemActionDeleteTooltip: 'Delete',
});

const withExpander = withState({
  item: withLabel,
})(({ store }) => {
  return (
    <ContentItem
      item={attachContentKnobs(store.state.item,true)}
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
});
const withOption = withState({
    item: withLabel,
  })(({ store }) => {
    return (
      <ContentItem
        item={attachDropdownKnobs(store.state.item,true)}
        greyBackground={boolean('Set grey background', false)}
        onRemove={action('onItemRemove')}
        onUpdate={item => {
          editItem(item, store);
        }}
        onDuplicate={action('onItemSelect')}
        texts={getTexts()}
      />
    );
  });
const withRadios = withState({
  item: withLabel,
})(({ store }) => {
  return (
    <ContentItem
      item={store.state.item}
      greyBackground={boolean('Set grey background', false)}
      headerSuffix={radio}
    />
  );
});
const withCruds = withState({
  item: withLabel,
})(({ store }) => {
  return (
    <ContentItem
      item={attachCrudKnobs(store.state.item, true)}
      greyBackground={boolean('Set grey background', false)}
      onRemove={action('onItemRemove')}
      onUpdate={item => {
        editItem(item, store);
      }}
      onDuplicate={action('onItemSelect')}
      texts={getTexts()}
    />
  );
});
const withExpander1 = withState({
  item: withIcon,
})(({ store }) => {
  return (
    <ContentItem
      item={attachContentKnobs(store.state.item,true)}
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
});
const withOption1 = withState({
  item: withIcon,
})(({ store }) => {
  return (
    <ContentItem
      item={attachDropdownKnobs(store.state.item,true)}
      greyBackground={boolean('Set grey background', false)}
      onRemove={action('onItemRemove')}
      onUpdate={item => {
        editItem(item, store);
      }}
      onDuplicate={action('onItemSelect')}
      texts={getTexts()}
    />
  );
});
const withRadios1 = withState({
  item: withIcon,
})(({ store }) => {
  return (
    <ContentItem
      item={store.state.item}
      greyBackground={boolean('Set grey background', false)}
      headerSuffix={radio}
    />
  );
});
const withCruds1 = withState({
  item: withIcon,
})(({ store }) => {
  return (
    <ContentItem
      item={attachCrudKnobs(store.state.item, true)}
      greyBackground={boolean('Set grey background', false)}
      onRemove={action('onItemRemove')}
      onUpdate={item => {
        editItem(item, store);
      }}
      onDuplicate={action('onItemSelect')}
      texts={getTexts()}
    />
  );
});
const withExpander2 = withState({
  item: withTagAndLabel,
})(({ store }) => {
  const tagShape = select('Set tag shape', tagShapes, tagShapes.round);
  return (
    <ContentItem
      item={attachContentKnobs({tag: getTag(tagShape),...store.state.item},true)}
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
});
const withOption2 = withState({
  item: withTagAndLabel,
})(({ store }) => {
  const tagShape = select('Set tag shape', tagShapes, tagShapes.round);
  return (
    <ContentItem
      item={attachDropdownKnobs({tag: getTag(tagShape),...store.state.item},true)}
      greyBackground={boolean('Set grey background', false)}
      onRemove={action('onItemRemove')}
      onUpdate={item => {
        editItem(item, store);
      }}
      onDuplicate={action('onItemSelect')}
      texts={getTexts()}
    />
  );
});
const withRadios2 = withState({
  item: withTagAndLabel,
})(({ store }) => {
  const tagShape = select('Set tag shape', tagShapes, tagShapes.round);
  return (
    <ContentItem
      item={{tag: getTag(tagShape),...store.state.item}}
      greyBackground={boolean('Set grey background', false)}
      headerSuffix={radio}
    />
  );
});
const withCruds2 = withState({
  item: withTagAndLabel,
})(({ store }) => {
  const tagShape = select('Set tag shape', tagShapes, tagShapes.round);
  return (
    <ContentItem
      item={attachCrudKnobs({tag: getTag(tagShape),...store.state.item}, true)}
      greyBackground={boolean('Set grey background', false)}
      onRemove={action('onItemRemove')}
      onUpdate={item => {
        editItem(item, store);
      }}
      onDuplicate={action('onItemSelect')}
      texts={getTexts()}
    />
  );
});
const withExpander3 = withState({
  item: withLabel,
})(({ store }) => {
  return (
    <ListWithGrabber
      onItemSelect={NOOP}
      maxToShowItems={1}
      onChangeOrder={NOOP}
      type="content"
      items={[attachContentKnobs(store.state.item,true)]}
      loading={false}
      changeOrderDisabled={boolean('Disable change order', false)}
      greyBackground={boolean('Set grey background', false)}
      texts={getTexts()}
      onExpand={(id, isExpanded) => {
        store.set({ item: { ...store.state.item, expanded: isExpanded } });
      }}
    />
  );
});
const withOption3 = withState({
  item: withLabel,
})(({ store }) => {
  return (
    <ListWithGrabber
      onItemSelect={NOOP}
      maxToShowItems={1}
      onChangeOrder={NOOP}
      type="content"
      items={[attachDropdownKnobs(store.state.item,true)]}
      loading={false}
      changeOrderDisabled={boolean('Disable change order', false)}
      greyBackground={boolean('Set grey background', false)}
      texts={getTexts()}
    />
  );
});
const withRadios3 = withState({
  item: withLabel,
})(({ store }) => {
  return (
    <ListWithGrabber
      onItemSelect={NOOP}
      maxToShowItems={1}
      onChangeOrder={NOOP}
      type="content"
      items={[attachRadioKnobs(store.state.item,true)]}
      loading={false}
      changeOrderDisabled={boolean('Disable change order', false)}
      greyBackground={boolean('Set grey background', false)}
      texts={getTexts()}
    />
  );
});
const withCruds3 = withState({
  item: withLabel,
})(({ store }) => {
  return (
    <ListWithGrabber
      onItemSelect={NOOP}
      maxToShowItems={1}
      onChangeOrder={NOOP}
      type="content"
      items={[attachCrudKnobs(store.state.item, true)]}
      loading={false}
      changeOrderDisabled={boolean('Disable change order', false)}
      greyBackground={boolean('Set grey background', false)}
      texts={getTexts()}
    />
  );
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
  withLabelOptions: () => {
    const selectSuffix = select('Select Suffix', suffixType, suffixType.cruds);
    switch (selectSuffix) {
      case suffixType.cruds:
        return withCruds()
      case suffixType.expander:
        return withExpander()
      case suffixType.dropdown:
        return withOption()
      case suffixType.radio:
        return withRadios()
      default:
        return null
    } return null
  },
  withLabelAndIconOptions: () => {
    const selectSuffix = select('Select Suffix', suffixType, suffixType.cruds);
    switch (selectSuffix) {
      case suffixType.cruds:
        return withCruds1()
      case suffixType.expander:
        return withExpander1()
      case suffixType.dropdown:
        return withOption1()
      case suffixType.radio:
        return withRadios1()
      default:
        return null
    } return null
  },
  withLabelAndTagOptions: () => {
    const selectSuffix = select('Select Suffix', suffixType, suffixType.cruds);
    switch (selectSuffix) {
      case suffixType.cruds:
        return withCruds2()
      case suffixType.expander:
        return withExpander2()
      case suffixType.dropdown:
        return withOption2()
      case suffixType.radio:
        return withRadios2()
      default:
        return null
    } return null
  },
  withGrabberOptions: () => {
    const selectSuffix = select('Select Suffix', suffixType, suffixType.cruds);
    switch (selectSuffix) {
      case suffixType.cruds:
        return withCruds3()
      case suffixType.expander:
        return withExpander3()
      case suffixType.dropdown:
        return withOption3()
      case suffixType.radio:
        return withRadios3()
      default:
        return null
    } return null
  },
};


export default {
  name: 'manageable list/Content items',
  decorator,
  stories,
  Component: ContentItem,
};
