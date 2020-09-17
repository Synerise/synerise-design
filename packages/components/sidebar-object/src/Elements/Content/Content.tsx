import * as React from 'react';
import InlineEdit from '@synerise/ds-inline-edit';
import Drawer from '@synerise/ds-drawer';
import { ContentProps } from './Content.types';
import { ContentWrapper, InlineEditWrapper, TagsWrapper } from './Content.style';

const Content: React.FC<ContentProps> = ({ description, tags, texts }) => {
  const [value, setValue] = React.useState<string>('');
  return (
    <Drawer.DrawerBody>
      <ContentWrapper>{description}</ContentWrapper>
      <TagsWrapper>{tags}</TagsWrapper>
      <InlineEditWrapper>
        <InlineEdit
          input={{
            name: texts.name,
            value,
            maxLength: 120,
            placeholder: texts.namePlaceholder,
            onChange: (event): void => setValue(event.target.value),
          }}
          size="small"
        />
      </InlineEditWrapper>
    </Drawer.DrawerBody>
  );
};

export default Content;
