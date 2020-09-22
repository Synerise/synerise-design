import styled from 'styled-components';
import InlineSelect from '@synerise/ds-inline-edit/dist/InlineSelect/InlineSelect';
import { InlineSelectProps } from '@synerise/ds-inline-edit/dist/InlineSelect/InlineSelect.types';

export const Wrapper = styled.div`
`;

export const DropdownLabel = styled.span`
  vertical-align: middle;
  font-weight: 500;
  color: ${props => props.theme.variable('@gray-color-lighter-2')};

  b {
    color: ${props => props.theme.variable('@gray-color')};
    font-weight: 500;
    margin-right: 1em;
    display: inline-block;
  }
`;

export const EditBtn = styled.div`
  position: absolute;
  right: 37px;
  top: 50%;
  font-weight: 500;
  transform: translateY(-50%);
  visibility: hidden;
  opacity: 0;
  transition: 0.1s ease-in-out;
  .icon {
    padding-right: 5px;
    vertical-align: middle;
  }
  span {
    vertical-align: middle;
  }
`;

export const DropdownHeader = styled.div`
  position: relative;
  font-size: 13px;
  width: 100%;
  display: flex;
  align-items: center;
  .ant-btn {
    visibility: hidden;
  }
  &:hover .ant-btn {
    visibility: visible;
  }
  &:not(.dropdown-header-visible):hover {
    ${EditBtn} {
      visibility: visible;
      opacity: 1;
    }
  }
`;

export const DropdownDeleteBtn = styled.div`
  && {
    &:hover .icon {
      color: ${props => props.theme.variable('@red-color')};
    }
  }
`;

export const AddContainer = styled.div`
  padding-top: 10px;
  margin-top: -1px;
`;

export const AddButton = styled.div`
  display: inline-block;
  font-weight: 500;
  padding-bottom: 20px;
  transition: 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.variable('@primary-color')};
  }
  span {
    display: inline-block;
    vertical-align: middle;
    padding-left: 5px;
  }
`;
export const Select = styled(InlineSelect)<InlineSelectProps>`
   margin-left: 6px;
`