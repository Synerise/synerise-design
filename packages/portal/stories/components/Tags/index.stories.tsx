import * as React from 'react';
import { select, boolean, text, number } from '@storybook/addon-knobs';
import sample from 'lodash/sample';
import { v4 as uuid } from 'uuid';

import Tags, { Tag, TagShape } from '@synerise/ds-tags';
import theme from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';

const customColorOptions = {
  blue: theme.palette['blue-600'],
  grey: theme.palette['grey-600'],
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
  default: () => {
    const shapes = {
      'Default Round': TagShape.DEFAULT_ROUND,
      'Default Square': TagShape.DEFAULT_SQUARE,
    };
    const shape = select('Shape', shapes, shapes['Default Round']);
    const removable = boolean('Ability to remove', true);
    const colors = select('Set custom color', customColorOptions, customColorOptions.blue);
    const disabled = boolean('Disable ', false);

    const thisTag = [{
      id: 0,
      name: 'Aston Martin',
      color: colors,
    }];

    return (
      <React.Fragment>
        <div style={{padding: 24}}>
          <Tags
            tagShape={shape}
            selected={thisTag}
            removable={removable}
            disabled={disabled}
          />
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
    const colors = select('Set custom color', customColorOptions, customColorOptions.blue);
    const hasPrefix = boolean('setPrefix',false)
    const hasSufix = boolean('setSufix',false)
    const disabled = boolean('Disable', false);


    const thisTag = [{
      id: 12,
      name: 'Testowany',
      color: colors,
      prefixel: hasPrefix && (number('preffixNumber',5)),
      suffixel: hasSufix && (number('suffixNumber',5)),
    }];

    return (
      <React.Fragment>
        <div style={{padding: 24}}>
          <Tags
            tagShape={shape}
            selected={thisTag}
            removable={removable}
            disabled={disabled}
          />
        </div>
      </React.Fragment>
    );
  },
  singleTag: () => {
    const shapes = {
      'Default Round': TagShape.SINGLE_CHARACTER_ROUND,
      'Default Square': TagShape.SINGLE_CHARACTER_SQUARE,
    };
    const shape = select('Shape', shapes, shapes['Default Round']);
    const colors = select('Set custom color', customColorOptions, customColorOptions.blue);
    const disabled = boolean('Disable', false);

    const thisTag = [{
      id: 0,
      name: 'A',
      color: colors,
    }];

    return (
      <React.Fragment>
        <div style={{padding: 24}}>
          <Tags
            tagShape={shape}
            selected={thisTag}
            disabled={disabled}
          />
        </div>
      </React.Fragment>
    );
  },
  smallTag: () => {
    const shapes = {
      'Default Round': TagShape.SMALL_ROUND,
      'Default Square': TagShape.SMALL_SQUARE,
    };
    const shape = select('Shape', shapes, shapes['Default Round']);
    const colors = select('Set custom color', customColorOptions, customColorOptions.blue);
    const disabled = boolean('Disable', false);

    const thisTag = [{
      id: 0,
      name: 'Polonez',
      color: colors,
    }];

    return (
      <React.Fragment>
        <div style={{padding: 24}}>
          <Tags
            tagShape={shape}
            selected={thisTag}
            disabled={disabled}
          />
        </div>
      </React.Fragment>
    );
  },
  singleTagWithIcon: () => {
    const IMAGE_URL = 'https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-reddit-square2-512.png';
    const shapes = {
      'Default Round': TagShape.DEFAULT_ROUND,
      'Default Square': TagShape.DEFAULT_SQUARE,
    };
    const shape = select('Shape', shapes, shapes['Default Round']);
    const removable = boolean('Ability to remove', true);
    const colors = select('Set custom color', customColorOptions, customColorOptions.blue);
    const disabled = boolean('Disable', false);

    const thisTag = [{
      id: 0,
      name: 'Lamborghini',
      color: colors,
      image: IMAGE_URL,
    }];

    return (
      <React.Fragment>
        <div style={{padding: 24}}>
          <Tags
            tagShape={shape}
            selected={thisTag}
            removable={removable}
            disabled={disabled}
          />
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

    const allTags = [{
      id: 0,
      name: 'Aston Martin',
      color: '#ffc300',
    },{
      id: 1,
      name: 'Ferrari',
      color: '#13c2bc',
    },{
      id: 2,
      name: 'Polonez',
      color: '#76dc25',
    }, {
      id: 3,
      name: 'Mazda',
      color: '#6d2dd3',
    }, {
      id: 4,
      name: 'Honda',
      color: '#ff4d67',
    }, {
      id: 5,
      name: 'Pagani',
      color: '#fd9f05',
    }, {
      id: 6,
      name: 'BMW',
      color: '#2b71cb',
    }, {
      id: 7,
      name: 'Porsche',
      color: '#61b71e',
    }, {
      id: 8,
      name: 'Lancia',
      color: '#e62425',
    }, {
      id: 9,
      name: 'Fiat',
      color: '#f551a9',
    }, {
      id: 10,
      name: 'Alfa Romeo',
      color: '#04bdff',
    }];

    const [tags, setTags] = React.useState<Array<any>>(allTags);
    const [selected, setSelected] = React.useState<Array<any>>(allTags.slice(0, 6));

    return (
      <React.Fragment>
        <div style={{padding: 24}}>
          <h4>Tag group</h4>
          <Tags
            data={tags}
            tagShape={shape}
            selected={selected}
            disabled={disabled}
            addable={addable}
            creatable={creatable}
            removable={removable}
            texts={{
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
                color: sample(randomColorPool),
              };

              console.log('Created new tag', name, tag);

              setTags([...tags, tag]);
              setSelected([...selected, tag]);
            }}
            onSelectedChange={(tags, actionTaken) => {
              console.log('Selected tags change', tags, 'with action', actionTaken);
              setSelected(tags);
            }}
            manageLink={withManageLink && 'https://en.wikipedia.org/wiki/San_Escobar'}
          />
        </div>
      </React.Fragment>
    );
  },
};

export default {
  name: 'Components|Tags',
  stories,
  Component: Tags,
};
