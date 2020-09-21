import styled from 'styled-components';
import Button from '@synerise/ds-button';
import SearchBar from '@synerise/ds-search-bar/';
import Scrollbar from '@synerise/ds-scrollbar';
import { ScrollbarProps } from '@synerise/ds-scrollbar/dist/Scrollbar.types';

export const Container = styled.div`
  margin-bottom: 24px;
  display: flex;
  align-items: flex-start;
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
    padding: 0 4px;
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
  margin: 8px;
  position: absolute;

  && {
    font-weight: 400;
    text-align: left;
    width: calc(100% - 6px);
    justify-content: flex-start;
    ${AddIconWrapper} {
      transform: translate(-4px, 0px);
    }
  }

  strong {
    font-weight: 500;
    margin: 0 0 0 3px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const ManageLinkButton = styled(Button)<{ onlyChild: boolean }>`
  margin: ${(props): string => (props.onlyChild  ? '8px' : '8px ')};
`;

export const Seperator = styled.hr`
  width: auto;
  margin: 0 10px 0 20px;
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

export const DropdownContainer = styled(Scrollbar)<ScrollbarProps>`
  display: flex;
  flex-direction: column;
  padding: 8px 0;
`;

export const DropdownTagsContainer = styled.div<{ isCreatable: boolean }>`
  display: flex;
  flex-direction: column;
  padding: ${(props): string => (props.isCreatable ? '8px 0 0' : '0')};
  max-height: 320px;
  overflow-y: auto;
  padding: 12px 8px;

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

export const DropdownNoTags = styled.div`
  padding: 8px 20px;
`;

export const Overlay = styled.div`
  background-color: ${(props): string => props.theme.palette.white};
`;
