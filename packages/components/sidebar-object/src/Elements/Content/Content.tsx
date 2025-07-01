import React from 'react';

import Drawer from '@synerise/ds-drawer';
import SubtleForm from '@synerise/ds-subtle-form';

import {
  ContentWrapper,
  InlineEditWrapper,
  TagsWrapper,
} from './Content.style';
import { type ContentProps } from './Content.types';

const Content = ({
  onFolderSelect,
  texts,
  mainContent,
  descriptionProps = {},
  tags,
  textDescription,
  onDescriptionChange,
}: ContentProps) => {
  return (
    <Drawer.DrawerBody>
      <ContentWrapper withFolder={!!onFolderSelect}>
        {mainContent}
      </ContentWrapper>
      <TagsWrapper>{tags}</TagsWrapper>
      {!!onDescriptionChange && (
        <InlineEditWrapper>
          <SubtleForm.TextArea
            minRows={3}
            // TODO: fix handler type
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={onDescriptionChange as any}
            value={textDescription}
            placeholder={texts.placeholder}
            suffixTooltip={texts.suffixTooltip}
            {...descriptionProps}
          />
        </InlineEditWrapper>
      )}
    </Drawer.DrawerBody>
  );
};

export default Content;
