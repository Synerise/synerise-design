import styled from 'styled-components';
import Divider from '@synerise/ds-divider';

export const ButtonDivider = styled(Divider)`
  border-color: ${props => props.theme.palette['grey-300']};
  height: auto;
  margin: 0px;
  top: 0;
`;
