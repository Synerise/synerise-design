import React, { useState } from 'react';
import { action } from 'storybook/actions';
import { fn } from 'storybook/test';
import { v4 as uuid } from 'uuid';

import { theme } from '@synerise/ds-core';
import Overview from '@synerise/ds-sidebar-object/dist/Elements/Overview/Overview';
import Tags, { TagShape } from '@synerise/ds-tags';

import {
  DATA,
  OVERVIEW_INPUT_OBJECT,
  OVERVIEW_TEXTS,
} from '../SidebarObject.data';

export const useSidebarObjectOverview = (allTags) => {
  const [tags, setTags] = useState<Array<any>>(allTags);
  const [selected, setSelected] = useState<Array<any>>(allTags.slice(0, 2));
  const [description, setDescription] = useState('');

  const contentTags = (
    <Tags
      data={tags}
      tagShape={TagShape.DEFAULT_ROUND}
      selected={selected}
      addable
      creatable
      removable
      overlayStyle={{ width: '283px' }}
      maxHeight={200}
      texts={{
        clearTooltip: 'Clear',
        addButtonLabel: 'Add tag',
        manageLinkLabel: 'Manage tags',
        createTagButtonLabel: 'Add tag',
        searchPlaceholder: 'Search tag...',
        dropdownNoTags: 'No tags found',
      }}
      onCreate={(name) => {
        const tag = {
          id: uuid(),
          name,
          color: theme.palette['grey-200'],
        };
        setTags([...tags, tag]);
        setSelected([...selected, tag]);
      }}
      onSelectedChange={(tags, actionTaken) => {
        setSelected(tags);
      }}
      manageLink="Manage tags"
    />
  );
  const headerTabs = [
    {
      label: 'Overview',
      content: (
        <Overview
          contentTags={contentTags}
          folders={DATA}
          parentFolder={DATA[0]}
          onDescriptionChange={setDescription}
          textDescription={description}
          onFolderSelect={action('onFolderSelect')}
          descriptionProps={{
            autoSize: { minRows: 3, maxRows: 10 },
          }}
          texts={OVERVIEW_TEXTS}
          inputObject={OVERVIEW_INPUT_OBJECT}
          onAddFolderClick={action('onAddFolderClick')}
        />
      ),
    },
    {
      label: 'Changelog',
    },
    {
      label: 'Versions',
    },
  ];

  return { headerTabs };
};
