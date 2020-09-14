import * as React from 'react';
import InlineEdit from '@synerise/ds-inline-edit';
import Drawer from '@synerise/ds-drawer';
import { action } from '@storybook/addon-actions';
import { ContentProps } from './Content.types';
import { ContentWrapper, InlineEditWrapper, TagsWrapper } from './Content.style';

const Content: React.FC<ContentProps> = ({ description, tags, texts }) => {
  return (
    <Drawer.DrawerBody>
      <ContentWrapper>{description}</ContentWrapper>
      <TagsWrapper>{tags}</TagsWrapper>
      <InlineEditWrapper>
        <InlineEdit
          input={{
            name: texts.name,
            value: texts.value,
            maxLength: 120,
            placeholder: texts.inlineEditPlaceholder,
            onChange: action('on Change'),
          }}
          size="small"
        />
      </InlineEditWrapper>
    </Drawer.DrawerBody>
  );
};

export default Content;
