import * as React from 'react';
import Drawer from '@synerise/ds-drawer';
import SubtleForm from '@synerise/ds-subtle-form';
import { ContentProps } from './Content.types';
import { ContentWrapper, InlineEditWrapper, TagsWrapper } from './Content.style';

const Content: React.FC<ContentProps> = ({ onFolderSelect,texts,description, tags, textDescription,onDescriptionChange }) => {


  return (
    <Drawer.DrawerBody>
      <ContentWrapper withFolder={!!onFolderSelect}>{description}</ContentWrapper>
      <TagsWrapper>{tags}</TagsWrapper>
      <InlineEditWrapper>
        <SubtleForm.TextArea
          minRows={3}
          value={textDescription}
          onChange={onDescriptionChange}
          placeholder={texts.placeholder}
          suffixTooltip={texts.suffixTooltip}
        />
      </InlineEditWrapper>
    </Drawer.DrawerBody>
  );
};

export default Content;
