import styled from 'styled-components';
import { TagsStyles } from '@synerise/ds-tags';

const Container = styled.div`
  @media (min-width: 200px) {
    min-width: 200px;
  }
  .react-colorful__last-control {
    margin: 16px 46px 8px 16px;
    border-radius: 4px;
    height: 8px;
  }
  .ant-divider-horizontal {
    margin: 16px 0px;
  }
  ${TagsStyles.Container} {
    margin-bottom: -8px;
  }
`;

const Subcontainer = styled.div`
  padding: 16px;
  padding-top: 8px;
`;

export default {
  Container,
  Subcontainer,
};
