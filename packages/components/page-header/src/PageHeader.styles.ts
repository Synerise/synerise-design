import styled from 'styled-components';

export const MainContainer = styled.div<{ isolated?: boolean }>`
  background-color: #fff;
  position: relative;
  border-bottom: 1px solid ${(props): string => props.theme.palette['grey-200']};
  box-shadow: ${(props) => props.theme.variables['box-shadow-1']};

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 1px;
    ${(props): string =>
      props.isolated
        ? `background-color: ${props.theme.palette['grey-100']}`
        : ''};
    z-index: 0;
  }
`;

export const PageHeaderContainer = styled.div`
  width: 100%;
  min-height: 80px;
  padding: 24px;
  display: flex;
  align-items: center;
  align-content: center;
`;

export const PageHeaderDescription = styled.div`
  margin: 0 24px;
  font-size: 13px;
  line-height: 18px;
  color: ${(props): string => props.theme.palette['grey-500']};
`;

export const PageHeaderTabsWrapper = styled.div`
  padding: 0 24px;

  &&& .ds-tabs {
    padding: 0;
  }
`;

export const PageHeaderBar = styled.div`
  padding: 12px 24px;
  border-top: 1px solid ${(props): string => props.theme.palette['grey-100']};
  position: relative;
  top: -1px;
`;

export const PageHeaderMore = styled.div`
  padding: 0 24px;
`;

export const PageHeaderClose = styled.div`
  & div {
    margin-left: 52px;
    display: flex;
    align-items: center;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      width: 1px;
      height: 40px;
      left: -25px;
      background-color: ${(props): string => props.theme.palette['grey-300']};
    }
  }
`;

// reexport styles for backwards compatibility
export {
  WrapperPageHeaderClamp as PageHeaderClamp,
  PageHeaderTitle,
  PageHeaderTooltipWraper,
} from './PageHeaderClamp/PageHeaderClamp.styles';
export { WrapperPageHeaderInlineEdit as PageHeaderInlineEdit } from './PageHeaderInlineEdit/PageHeaderInlineEdit.styles';
export { WrapperPageHeaderBack as PageHeaderBack } from './PageHeaderBack/PageHeaderBack.styles';
export { WrapperPageHeaderRightSide as PageHeaderRightSide } from './PageHeaderRightSide/PageHeaderRightSide.styles';
