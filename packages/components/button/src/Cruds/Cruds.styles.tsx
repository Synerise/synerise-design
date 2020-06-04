import styled from 'styled-components';

export const CrudsContainer = styled.div`
   {
    display: flex;
    width: 100%;
    height: 24px;
    cursor: pointer;
  }

  .add,
  .duplicate,
  .edit,
  .move {
    svg {
      fill: ${(props): string => props.theme.palette['grey-600']};
    }
  }

  .add:hover,
  .duplicate:hover,
  .edit:hover,
  .move:hover {
    svg {
      fill: ${(props): string => props.theme.palette['blue-600']};
    }
  }

  .delete,
  .remove {
    svg {
      fill: ${(props): string => props.theme.palette['red-600']};
    }
  }
`;
export const IconWrapper = styled.div``;
