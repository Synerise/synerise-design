import styled from 'styled-components';

import InlineSelect from '@synerise/ds-inline-edit/dist/InlineSelect/InlineSelect';
import { type InlineSelectProps } from '@synerise/ds-inline-edit/dist/InlineSelect/InlineSelect.types';

export const MonthlyFilterWrapper = styled.div`
  padding-top: 24px;
`;
export const ContentWrapper = styled.div`
  margin: 0 -8px;
`;

export const DropdownLabel = styled.span`
  vertical-align: middle;
  font-weight: 500;
  b {
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
  margin-top: -2px;
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
      color: ${(props): string => props.theme.palette['red-600']};
    }
  }
`;

export const AddContainer = styled.div`
  margin-top: -1px;
`;

export const AddButton = styled.div`
  display: inline-block;
  font-weight: 500;
  padding-bottom: 20px;
  transition: all 0.15s ease-in-out;
  cursor: pointer;
  span {
    display: inline-block;
    vertical-align: middle;
    padding-left: 5px;
  }
`;
export const Select = styled(InlineSelect)<InlineSelectProps>`
  margin: 2px 4px 0 4px;
  padding-bottom: 0;

  &&&:focus:not(:active),
  &&&:focus-within {
    background: none;
  }
`;
export const PeriodMode = styled.span`
  color: ${(props): string => props.theme.palette['blue-600']};
`;
