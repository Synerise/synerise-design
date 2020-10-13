import * as React from 'react';
import Dropdown from '@synerise/ds-dropdown';
import Button from '@synerise/ds-button';
import Icon from '@synerise/ds-icon';
import { AngleDownS } from '@synerise/ds-icon/dist/icons';
import * as S from '../Header/Header.style';
import DropdownOverlay from '../Header/Dropdown/DropdownOverlay';
import Content from '../Content/Content';
import ObjectSummary from '../ObjectSummary/ObjectSummary';
import { OverviewObjectProps } from './Overview.types';

const Overview: React.FC<OverviewObjectProps> = ({
  inputObject,
  contentTags,
  folders,
  parentFolder,
  texts,
  textDescription,
  onFolderSelect,
  autoSize,
  onDescriptionChange
}) => {
  const [dropdownVisible, setDropdownVisible] = React.useState(false);
  const [value, setValue] = React.useState('');
  const onClearInput = (): void => {
    setValue('');
  };
  return (
    <S.OverviewWrapper>
      <S.HeaderWrapper dashed={!!onFolderSelect}>
        {onFolderSelect && (
          <>
            {texts?.folder}:{' '}
            <Dropdown
              overlayStyle={{ boxShadow: '0 4px 17px -3px rgba(191,191,191,1)' }}
              visible={dropdownVisible}
              overlay={
                <DropdownOverlay
                  texts={texts}
                  parentFolder={parentFolder}
                  data={folders}
                  onDropdownOutsideClick={(): void => setDropdownVisible(false)}
                  onClearInput={onClearInput}
                  searchValue={value}
                  onSearchChange={setValue}
                  onFolderSelect={onFolderSelect}
                />
              }
            >
              <Button onClick={(): void => setDropdownVisible(!dropdownVisible)} mode="label-icon" type="ghost">
                {parentFolder.name}
                <Icon component={<AngleDownS />} />
              </Button>
            </Dropdown>
          </>
        )}
      </S.HeaderWrapper>
        <Content
          texts={texts}
          autoSize={autoSize}
          onDescriptionChange={onDescriptionChange}
          textDescription={textDescription}
          description={<ObjectSummary inputObject={inputObject} />}
          tags={contentTags}
        />
    </S.OverviewWrapper>
  );
};
export default Overview;
