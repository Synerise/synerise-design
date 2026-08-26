import styled from 'styled-components';

import Button, { type StyledButton } from '@synerise/ds-button';
import DividerBase from '@synerise/ds-divider';
import Icon from '@synerise/ds-icon';

export const ContainerSpaceBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const HeaderLeft = styled.div`
  color: ${({ theme }) => theme.palette['grey-800']};
  margin-left: 12px;
  height: 34px;
  display: flex;
  align-items: center;
`;

export const ShowButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const ListWrapper = styled.div``;

export const Bold = styled.span`
  color: ${({ theme }) => theme.palette['grey-800']};
  font-weight: 500;
  margin-left: 2px;
`;

export const ChangeSelection: StyledButton = styled(Button)`
  width: 157px;
  display: flex;
  align-items: center;
  padding: 4px 9px;
  font-weight: 500;

  &&& {
    color: ${({ theme }) => theme.palette['blue-600']};
    .ds-icon {
      margin-right: 4px;

      svg {
        fill: ${({ theme }) => theme.palette['blue-600']};
      }
    }
  }
`;

export const SearchWrapper = styled.div`
  margin: 0 8px;
  min-width: 32px;
  flex: 1 1 auto;
`;

export const ShowButton: StyledButton = styled(Button)`
  margin-right: 8px;

  span {
    font-weight: 400;
    color: ${({ theme }) => theme.palette['grey-700']};
  }

  .bold-label {
    font-weight: 500;
  }
`;

export const ShowButtonLabel = styled.span`
  font-weight: 400;
`;

export const ClearButton: StyledButton = styled(Button)`
  margin-left: auto;

  &&& {
    .ds-icon {
      margin-top: 1px;
    }
  }
`;

export const ArrowIcon = styled(Icon)`
  svg {
    fill: ${({ theme }) => theme.palette['grey-600']};
  }
`;

export const NoResults = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 144px;
  color: ${({ theme }) => theme.palette['grey-600']};
`;

export const NoResultIconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  .ds-icon {
    svg {
      fill: ${({ theme }) => theme.palette['grey-600']};
    }
  }
`;

export const Divider = styled(DividerBase)<{ footer?: boolean }>`
  && {
    margin: ${(props) => (props.footer ? '8px 0 12px' : '12px 0 8px')};
  }
`;

export const WarningIcon = styled(Icon)`
  svg {
    fill: ${({ theme }) => theme.palette['yellow-500']};
  }
`;
