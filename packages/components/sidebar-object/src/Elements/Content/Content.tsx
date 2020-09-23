import * as React from 'react';
import Drawer from '@synerise/ds-drawer';
import SubtleForm from '@synerise/ds-subtle-form';
import { ContentProps } from './Content.types';
import { ContentWrapper, InlineEditWrapper, TagsWrapper } from './Content.style';

const Content: React.FC<ContentProps> = ({ description, tags, textDescription,texts }) => {
  const renderLabel = (text: string): object => {
    return <div style={{ maxWidth: '200px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{text}</div>;
  };
  const [value, setValue] = React.useState<string | undefined>(textDescription);

  return (
    <Drawer.DrawerBody>
      <ContentWrapper>{description}</ContentWrapper>
      <TagsWrapper>{tags}</TagsWrapper>
      <InlineEditWrapper>
        <SubtleForm.TextArea
          minRows={3}
          maxRows={6}
          value={value}
          onChange={setValue}
          placeholder={texts.placeholder}
          label={renderLabel(texts.labelName)}
          labelTooltip={texts.labelTooltip}
          suffixTooltip={texts.suffixTooltip}
        />
      </InlineEditWrapper>
    </Drawer.DrawerBody>
  );
};

export default Content;
