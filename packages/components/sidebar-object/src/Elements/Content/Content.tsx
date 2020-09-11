import * as React from 'react';
import InlineEdit from '@synerise/ds-inline-edit';
import Drawer from '@synerise/ds-drawer';
import { ContentProps } from './Content.types';
import { ContentWrapper, InlineEditWrapper, TagsWrapper } from './Content.style';


const Content: React.FC<ContentProps> = ({description,tags}) => {
  return<Drawer.DrawerBody>
    <ContentWrapper>
    {description}
    </ContentWrapper>
    <TagsWrapper>
      {tags}
    </TagsWrapper>
    <InlineEditWrapper>
      <InlineEdit
        input={{
          name: 'DescriptionInput',
          value: 'Description',
          maxLength: 120,
          placeholder: 'This is placeholder',
        }}
        size='small'
      />
    </InlineEditWrapper>
  </Drawer.DrawerBody>
};

export default Content;