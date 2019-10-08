import styled from 'styled-components';
import Button from '@synerise/ds-button';
import Dropdown from '@synerise/ds-dropdown';

export const Container = styled.div`
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  flex-direction: row;
`;

export const SelectedTags = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`;

export const AddButton = styled(Button)`
  margin: 0 0 0 8px;
`;

export const AddTagDropdownButton = styled(Button)`
  margin: 0 0 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  && {
    text-align: left;
  }

  strong {
    margin: 0 0 0 3px;
  }
`;

export const ManageLink = styled.a`
  display: block;
  font-size: 13px;
  font-weight: 500;
  margin: 8px 0 0;
  height: 32px;
  line-height: 32px;
  padding: 0 16px;
  color: ${(props): string => props.theme.palette['grey-700']};
`;

export const Seperator = styled.hr`
  width: auto;
  margin: 0 4px;
  padding: 0;
  border: 0;
  height: 1px;
  background-image: linear-gradient(
    to right,
    ${(props): string => props.theme.palette['grey-300']} 33%,
    rgba(255, 255, 255, 0) 0%
  );
  background-repeat: repeat-x;
  background-size: 4px 1px;
  background-position: top;
`;

export const DropdownTagsContainer = styled.div<{ isCreatable: boolean }>`
  display: flex;
  flex-direction: column;
  padding: ${(props): string => (props.isCreatable ? '8px 0 0' : '0')};

  > * {
    width: fit-content;
  }
`;

export const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
`;

export const DropdownSearch = styled(Dropdown.SearchInput)`
  && {
    margin: 0;
  }
`;
