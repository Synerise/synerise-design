import styled from 'styled-components';

export const CrudsContainer = styled.div`
   {
    display: flex;
    width: 100%;
    height: 24px;
    cursor: pointer;
  }

  .add {
    svg {
      fill: ${(props): string => props.theme.palette['grey-600']};
    }
  }

  .add:hover {
    svg {
      fill: ${(props): string => props.theme.palette['blue-500']};
    }
  }

  .duplicate {
    svg {
      fill: ${(props): string => props.theme.palette['grey-600']};
    }
  }
  .duplicate:hover {
    svg {
      fill: ${(props): string => props.theme.palette['blue-500']};
    }
  }
  .edit {
    svg {
      fill: ${(props): string => props.theme.palette['grey-600']};
    }
  }

  .edit:hover {
    svg {
      fill: ${(props): string => props.theme.palette['blue-500']};
    }
  }
  .move {
    svg {
      fill: ${(props): string => props.theme.palette['grey-600']};
    }
  }

  .move:hover {
    svg {
      fill: ${(props): string => props.theme.palette['blue-500']};
    }
  }

  .delete {
    svg {
      fill: ${(props): string => props.theme.palette['red-600']};
    }
  }

  .remove {
    svg {
      fill: ${(props): string => props.theme.palette['red-600']};
    }
  }
`;
export const IconWrapper = styled.div``;
