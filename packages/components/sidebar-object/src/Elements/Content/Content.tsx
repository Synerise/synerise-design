import * as React from 'react';
import Drawer from '@synerise/ds-drawer';
import SubtleForm from '@synerise/ds-subtle-form';
import { ContentProps } from './Content.types';
import { ContentWrapper, InlineEditWrapper, TagsWrapper } from './Content.style';

const Content: React.FC<ContentProps> = ({ description, tags, textDescription,texts,autoSize }) => {
  const [value, setValue] = React.useState<string | undefined>(textDescription);

  return (
    <Drawer.DrawerBody>
      <ContentWrapper>{description}</ContentWrapper>
      <TagsWrapper>{tags}</TagsWrapper>
      <InlineEditWrapper>
        <SubtleForm.TextArea
          autoSize={autoSize}
          minRows={3}
          value={value}
          onChange={setValue}
          placeholder={texts.placeholder}
          suffixTooltip={texts.suffixTooltip}
        />
      </InlineEditWrapper>
    </Drawer.DrawerBody>
  );
};

export default Content;
