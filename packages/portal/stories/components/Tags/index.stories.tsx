import * as React from 'react';
import { select, boolean, number } from '@storybook/addon-knobs';
import { v4 as uuid } from 'uuid';

import Tags, { TagShape } from '@synerise/ds-tags';
import { theme } from '@synerise/ds-core';
import Icon, { Add3M} from '@synerise/ds-icon';
import Badge from '@synerise/ds-badge';
import { getColorText } from '@synerise/ds-tags/dist/Tag/Tag.styles';

const customColorOptions = {
  blue: theme.palette['blue-600'],
  grey: theme.palette['grey-200'],
  red: theme.palette['red-600'],
  green: theme.palette['green-600'],
  yellow: theme.palette['yellow-600'],
  pink: theme.palette['pink-600'],
  mars: theme.palette['mars-600'],
  orange: theme.palette['orange-600'],
  fern: theme.palette['fern-600'],
  cyan: theme.palette['cyan-600'],
  purple: theme.palette['purple-600'],
  violet: theme.palette['violet-600'],
};

const stories = {
  defaultTag: () => {
    const shapes = {
      'Default Round': TagShape.DEFAULT_ROUND,
      'Default Square': TagShape.DEFAULT_SQUARE,
    };
    const shape = select('Shape', shapes, shapes['Default Round']);
    const removable = boolean('Ability to remove', true);
    const colors = select('Set custom color', customColorOptions, customColorOptions.grey);
    const disabled = boolean('Disable ', false);

    const thisTag = [
      {
        id: 0,
        name: 'Tag name',
        color: colors,
      },
    ];

    return (
      <React.Fragment>
        <div style={{ padding: 24 }}>
          <Tags tagShape={shape} selected={thisTag} removable={removable} disabled={disabled} />
        </div>
      </React.Fragment>
    );
  },
  tagWithPreffixAndSuffix: () => {
    const shapes = {
      'Default Round': TagShape.DEFAULT_ROUND,
      'Default Square': TagShape.DEFAULT_SQUARE,
    };
    const shape = select('Shape', shapes, shapes['Default Round']);
    const removable = boolean('Ability to remove', true);
    const colors = select('Set custom color', customColorOptions, customColorOptions.grey);
    const hasPrefix = boolean('setPrefix', false);
    const hasSufix = boolean('setSufix', false);
    const disabled = boolean('Disable', false);

    const thisTag = [
      {
        id: 12,
        name: 'Tag name',
        color: colors,
        prefixel: hasPrefix && (
          <Badge
            count={number('count', 1)}
            overflowCount={number('overflowCount', 99)}
            outlined={''}
            style={{
              ...{ boxShadow: `0 0 0 1px ${getColorText(theme,colors)}`},
              backgroundColor: 'transparent',
              color: getColorText(theme,colors),
              alignItems: 'center',
              margin: '0px',
            }}
          />
        ),
        suffixel: hasSufix && (
          <Badge
            count={number('count', 1)}
            overflowCount={number('overflowCount', 99)}
            outlined={''}
            style={{
              ...{ boxShadow: `0 0 0 1px ${getColorText(theme,colors)}`},
              margin: '0px',
              backgroundColor: 'transparent',
              color: getColorText(theme,colors),
              alignItems: 'center',
            }}
          />
        ),
      },
    ];

    return (
      <React.Fragment>
        <div style={{ padding: 24 }}>
          <Tags tagShape={shape} selected={thisTag} removable={removable} disabled={disabled} />
        </div>
      </React.Fragment>
    );
  },
  tagSingle: () => {
    const shapes = {
      'Default Round': TagShape.SINGLE_CHARACTER_ROUND,
      'Default Square': TagShape.SINGLE_CHARACTER_SQUARE,
    };
    const shape = select('Shape', shapes, shapes['Default Round']);
    const colors = select('Set custom color', customColorOptions, customColorOptions.grey);
    const disabled = boolean('Disable', false);

    const thisTag = [
      {
        id: 0,
        name: 'A',
        color: colors,
      },
    ];

    return (
      <React.Fragment>
        <div style={{ padding: 24 }}>
          <Tags tagShape={shape} selected={thisTag} disabled={disabled} />
        </div>
      </React.Fragment>
    );
  },
  tagWithIcon: () => {
    const IMAGE_URL =
      'https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-reddit-square2-512.png';
    const shapes = {
      'Default Round': TagShape.DEFAULT_ROUND,
      'Default Square': TagShape.DEFAULT_SQUARE,
    };
    const shape = select('Shape', shapes, shapes['Default Round']);
    const removable = boolean('Ability to remove', true);
    const colors = select('Set custom color', customColorOptions, customColorOptions.grey);
    const disabled = boolean('Disable', false);

    const thisTag = [
      {
        id: 0,
        name: 'Tag name 4',
        color: colors,
        prefixel: <Icon className="icon1" component={<Add3M />} size={20} color={getColorText(theme,colors)} />,
      },
    ];

    return (
      <React.Fragment>
        <div style={{ padding: 24 }}>
          <Tags tagShape={shape} selected={thisTag} removable={removable} disabled={disabled} />
        </div>
      </React.Fragment>
    );
  },
  tagGroup: () => {
    const shapes = {
      'Default Round': TagShape.DEFAULT_ROUND,
      'Default Square': TagShape.DEFAULT_SQUARE,
    };

    const shape = select('Shape', shapes, shapes['Default Round']);
    const removable = boolean('Ability to remove', true);
    const addable = boolean('Ability to add', true);
    const creatable = boolean('Ability to create', true);
    const withManageLink = boolean('With manage tags link', true);
    const disabled = boolean('Disable entire group', false);

    const randomColorPool = [
      '#699788',
      '#6676e4',
      '#c3f424',
      '#f45a0d',
      '#caaa5b',
      '#c7fdf0',
      '#df3caa',
      '#917809',
      '#ea8a6f',
      '#04ed74',
      '#1c43a2',
      '#0db790',
    ];

    const allTags = [
      {
        id: 0,
        name: 'Tag Name 1',
        color: theme.palette['grey-200'],
      },
      {
        id: 1,
        name: 'Tag Name 2',
        color: theme.palette['grey-200'],
      },
      {
        id: 2,
        name: 'Tag Name 3',
        color: theme.palette['grey-200'],
      },
      {
        id: 3,
        name: 'Tag Name 4',
        color: theme.palette['grey-200'],
      },
      {
        id: 4,
        name: 'Tag Name 5',
        color: theme.palette['grey-200'],
      },
      {
        id: 5,
        name: 'Tag Name 6',
        color: theme.palette['grey-200'],
      },
      {
        id: 6,
        name: 'Tag Name 7',
        color: theme.palette['grey-200'],
      },
      {
        id: 7,
        name: 'Tag Name 8',
        color: theme.palette['grey-200'],
      },
      {
        id: 8,
        name: 'Tag Name 9',
        color: theme.palette['grey-200'],
      },
      {
        id: 9,
        name: 'Tag Name 10',
        color: theme.palette['grey-200'],
      },
      {
        id: 10,
        name: 'Tag Name 11',
        color: theme.palette['grey-200'],
      },
    ];

    const [tags, setTags] = React.useState<Array<any>>(allTags);
    const [selected, setSelected] = React.useState<Array<any>>(allTags.slice(0, 6));

    return (
      <React.Fragment>
        <div style={{ padding: 24 }}>
          <h4>Tag group</h4>
          <Tags
            data={tags}
            tagShape={shape}
            selected={selected}
            disabled={disabled}
            addable={addable}
            creatable={creatable}
            removable={removable}
            overlayStyle={{width: '283px'}}
            maxHeight={200}
            texts={{
              clearTooltip: 'Clear',
              deleteTooltip: 'Delete',
              addButtonLabel: 'Add tag',
              manageLinkLabel: 'Manage tags',
              createTagButtonLabel: 'Add tag',
              searchPlaceholder: 'Search tag...',
              dropdownNoTags: 'No tags found',
            }}
            onCreate={name => {
              const tag = {
                id: uuid(),
                name,
                color: theme.palette['grey-200'],
              };

              console.log('Created new tag', name, tag);

              setTags([...tags, tag]);
              setSelected([...selected, tag]);
            }}
            onSelectedChange={(tags, actionTaken) => {
              console.log('Selected tags change', tags, 'with action', actionTaken);
              setSelected(tags);
            }}
            manageLink={withManageLink}
          />
        </div>
      </React.Fragment>
    );
  },
};

export default {
name: 'Components/Tags',
  stories,
  Component: Tags,
};
