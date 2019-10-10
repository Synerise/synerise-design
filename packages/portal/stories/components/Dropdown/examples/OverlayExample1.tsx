import * as React from 'react';
import { action } from "@storybook/addon-actions";

import { DSProvider } from '@synerise/ds-core';
import List from "@synerise/ds-list";
import Dropdown from "@synerise/ds-dropdown";

interface Props {
  onSearchChange: (value: string) => void;
  data: any;
  onClickAction: () => void;
}

const OverlayExample1: React.FC<Props> = ({ onSearchChange, data, onClickAction }) => {
  return (
    <DSProvider code="en_GB">
      <Dropdown.Wrapper>
        <Dropdown.SearchInput onSearchChange={onSearchChange} placeholder="Search" />
        <List
          dataSource={data}
          renderItem={item => (
            <List.Item
              onSelect={action('onSelect')}
              icon={<div>a</div>}
            >
              {(item as any).text}
            </List.Item>
          )}
        />
        <Dropdown.BottomAction onClickAction={onClickAction}>Add folder</Dropdown.BottomAction>
      </Dropdown.Wrapper>
    </DSProvider>
  );
};

export default OverlayExample1;
