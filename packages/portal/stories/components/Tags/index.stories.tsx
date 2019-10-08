import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs';
import { DSProvider } from '@synerise/ds-core';

import Tags, { Tag, TagShape } from '@synerise/ds-Tags';

storiesOf('Components|Tags', module)
  .add('default', () => {
    const IMAGE_URL = 'https://cdn4.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-reddit-square2-512.png';

    const shapes = {
      'Default Round': TagShape.DEFAULT_ROUND,
      'Default Square': TagShape.DEFAULT_SQUARE,
      'Small Round': TagShape.SMALL_ROUND,
      'Small Square': TagShape.SMALL_SQUARE,
      'Status Neutral': TagShape.STATUS_NEUTRAL,
      'Status Success': TagShape.STATUS_SUCCESS,
      'Status Error': TagShape.STATUS_ERROR,
      'Status Warning': TagShape.STATUS_WARNING,
    };

    const shape = select('Shape', shapes, shapes['Default Round']);
    const removable = boolean('Ability to remove', true);
    const addable = boolean('Ability to add', true);
    const creatable = boolean('Ability to create', true);
    const withManageLink = boolean('With manage tags link', true);
    const disabled = boolean('Disable entire group', false);

    const allTags = [{
      id: 0,
      name: 'Aston Martin',
      color: '#ffc300',
    }, {
      id: 1,
      name: 'Ferrari',
      color: '#13c2bc',
    }, {
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
    }];

    const selectedTags = allTags.slice(0, 5);
    const [selected, setSelected] = React.useState<Array<any>>(selectedTags);

    return (
      <DSProvider code="en_GB">
        <div>
          <div style={{padding: 24}}>
            <h4>Tag group</h4>
            <Tags
              data={allTags}
              tagShape={shape}
              selected={selected}
              disabled={disabled}
              addable={addable}
              creatable={creatable}
              removable={removable}
              texts={{
                addButtonLabel: 'Add tag',
                manageLinkLabel: 'Manage tags',
                addTagButtonLabel: 'Add tag',
                searchPlaceholder: 'Search tag...',
                dropdownNoTags: 'No tags found',
              }}
              onAdd={tag => {
                console.log('Added tag', tag);
                setSelected([...selected, tag]);
              }}
              onSelectedChange={tags => {
                console.log('Selected tags change', tags);
                setSelected(tags);
              }}
              manageLink={withManageLink && 'https://en.wikipedia.org/wiki/San_Escobar'}
            />
          </div>

          <div style={{padding: 24}}>
            <h4>Tag shapes</h4>
            <div style={{display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap', height: 40}}>
              <Tag name="Default Square" shape={TagShape.DEFAULT_SQUARE} />
              <Tag name="Default Round" shape={TagShape.DEFAULT_ROUND} />

              <Tag name="Default Square w/ image" shape={TagShape.DEFAULT_SQUARE} image={IMAGE_URL} />
              <Tag name="Default Round w/ image" shape={TagShape.DEFAULT_ROUND} image={IMAGE_URL} />
              
              <Tag name="A" shape={TagShape.SINGLE_CHARACTER_SQUARE} />
              <Tag name="A" shape={TagShape.SINGLE_CHARACTER_ROUND} />

              <Tag name="Small Square" shape={TagShape.SMALL_SQUARE} />
              <Tag name="Small Round" shape={TagShape.SMALL_ROUND} />
              
              <Tag name="Status Neutral" shape={TagShape.STATUS_NEUTRAL} />
              <Tag name="Status Success" shape={TagShape.STATUS_SUCCESS} />
              <Tag name="Status Warning" shape={TagShape.STATUS_WARNING} />
              <Tag name="Status Error" shape={TagShape.STATUS_ERROR} />
            </div>
          </div>
        </div>
      </DSProvider>
    );
  })
;
