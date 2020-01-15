import * as React from 'react';
import { action } from '@storybook/addon-actions';

import List from '@synerise/ds-list';

import Icon from '@synerise/ds-icon';
import FileM from '@synerise/ds-icon/dist/icons/FileM';
import SearchM from '@synerise/ds-icon/dist/icons/SearchM';
import ArrowRightCircleM from '@synerise/ds-icon/dist/icons/ArrowRightCircleM';

import Dropdown from '@synerise/ds-dropdown';

interface Props {
  value: string;
  onSearchChange: (value: string) => void;
  data: any;
  onClickAction: () => void;
  onClearInput?: () => void;
}

const OverlayExample1: React.FC<Props> = ({ value, onSearchChange, onClearInput, data, onClickAction }) => {
  return (
    <Dropdown.Wrapper>
      <Dropdown.SearchInput
        onSearchChange={onSearchChange}
        onClearInput={onClearInput}
        placeholder="Search"
        value={value}
        iconLeft={<Icon component={<SearchM />} color="#6a7580" />}
      />
      <Dropdown.BackAction label="Attributes" onClick={() => alert('BackAction clicked')} />
      <List
        dataSource={data}
        renderItem={item => (
          <List.Item onSelect={action('onSelect')} icon={<Icon component={<FileM />} />}>
            {(item as any).text}
          </List.Item>
        )}
      />
      <Dropdown.BottomAction onClickAction={onClickAction} icon={<ArrowRightCircleM />}>
        Add folder
      </Dropdown.BottomAction>
    </Dropdown.Wrapper>
  );
};

export default OverlayExample1;
