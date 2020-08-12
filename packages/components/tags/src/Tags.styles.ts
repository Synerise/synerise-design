import styled from 'styled-components';
import Button from '@synerise/ds-button';
import SearchBar from '@synerise/ds-search-bar/';

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

export const AddButton = styled(Button)<{ marginless?: boolean }>`
  margin: ${(props): string => (props.marginless ? '0' : '0 0 0 8px')};

  span {
    padding-left: 4px;
  }
`;

export const AddIconWrapper = styled.div`
  display: inline-block;
`;

export const CreateTagDropdownButton = styled(Button)<{ marginless: boolean }>`
  margin: ${(props): string => (props.marginless ? '0' : '0 0 8px')};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  margin: 0 8px 8px;
  position: absolute;
  right: -5px;

  && {
    font-weight: 400;
    text-align: left;

    ${AddIconWrapper} {
      transform: translate(-10px,0px);
    }
  }

  strong {
    font-weight: 500;
    margin: 0 0 0 3px;
  }
`;

export const ManageLink = styled.a<{ onlyChild: boolean }>`
  display: block;
  font-size: 13px;
  font-weight: 500;
  margin: ${(props): string => (props.onlyChild ? '0' : '8px 0 0')};
  height: 32px;
  line-height: 32px;
  padding: 0 20px;
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

export const DropdownContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 0;
  .scrollbar-container, .scrollbar-container > div {
  overflow-x: hidden;
  overflow-y: scroll;
  }
`;

export const DropdownTagsContainer = styled.div<{ isCreatable: boolean }>`
  display: flex;
  flex-direction: column;
  padding: ${(props): string => (props.isCreatable ? '8px 0 0' : '0')};
  max-height: 320px;
  overflow-y: auto;
  padding: 0 8px;

  > * {
    width: fit-content;
    max-width: fit-content;
    display: block;
    width: inherit;
    cursor: pointer;
    flex-shrink: 0;
  }
`;

export const DropdownSearch = styled(SearchBar)`
  && {
    margin: 0 !important;
  }
`;

export const DropdownNoTags = styled.span`
  padding: 4px;
`;

export const Overlay = styled.div`
background-color: ${(props): string => props.theme.palette.white};
`
